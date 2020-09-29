# Step 3 : Upgrade our components

## Improve the Environment

In the client implementation of the previous step, we can display the previous decision of the human and agent by adding `previous_p1_action` and `previous_p2_action` to the observation.  Modify the .proto file as follows:

`data.proto`

```yaml
  ...
  message Observation {
    int32 p1_score = 1;
    int32 p2_score = 2;
    HumanAction previous_p1_action = 3;
    AgentAction previous_p2_action = 4;
  }
  ...
 ```

When the .proto files are modified, we always need to generate the config again:

`cogment generate --python_dir=.`

Modify the env file as follows in order to have these values updated.

`env.py`

```python
     ...
     def update(self, actions):
         print("environment updating")
 
         self.observation.previous_p1_action.CopyFrom(actions.human[0])
         self.observation.previous_p2_action.CopyFrom(actions.agent[0])

         p1_decision = actions.human[0].decision
     ...
```

## Send feedback

Rewarding the agent is an important part of training a model. In this example, after each observation, the environment will send feedbacks to our single agent.

The orchestator calculates the average of all the feedback in order to create a single reward.

`env.py`

```python
    ...
    def update(self, actions):
        ...
        print(f"human played {choice[p1_decision]} - agent played {choice[p2_decision]}")

        p1_feedback = 0
        p2_feedback = 0
        if p1_decision == p2_decision:
            pass
        elif ((p1_decision == ROCK and p2_decision == SCISSOR) or
              (p1_decision == PAPER and p2_decision == ROCK) or
              (p1_decision == SCISSOR and p2_decision == PAPER)):
            self.observation.p1_score += 1
            p1_feedback = 1
            p2_feedback -= p1_feedback
        else:
            self.observation.p2_score += 1
            p1_feedback = -1
            p2_feedback -= p1_feedback

        print(f"human score {self.observation.p1_score} - agent score {self.observation.p2_score}")

        self.trial.actors.human[0].add_feedback(value=p1_feedback, confidence=1)
        self.trial.actors.agent[0].add_feedback(value=p2_feedback, confidence=1)

        obs_table = cog_settings.ObservationsTable(self.trial)
        for o in obs_table.all_observations():
            o.snapshot = self.observation

        return obs_table
    ...
```

Restart the environment by running `docker-compose restart env`

## Improve the Agent

This section will outline how to include a supervised learning model for RPS which predicts actions for the player. Download the model to the root of the project (the “rps” folder) from [gitlab][1].

New python dependencies are required, so we’ll update the `rps/agents/Dockerfile`:

`rps/agents/Dockerfile`

```yaml
 FROM python:3.7

 ENV PYTHONPATH /app

 # Uncomment following and set specific version if required for only this service
 #ENV COGMENT_VERSION 0.3.0a5
 #RUN pip install cogment==$COGMENT_VERSION
 # Comment following if above is used
 ADD requirements.txt .
 RUN pip install -r requirements.txt
 RUN pip install keras==2.2.4 \
  tensorflow==1.14.0\
  numpy==1.17.2

 WORKDIR /app

 ADD agents/agent ./agents/agent
 ADD cog_settings.py .
 ADD *_pb2.py .

 CMD ["python", "agents/agent/main.py"]
```

Rebuild the image -

`docker-compose build agent`

Update the agent -

`rps/agents/agent.py`

```python
 import cog_settings
 import numpy as np

 from data_pb2 import AgentAction, ROCK, PAPER, SCISSOR
 import random
 import tensorflow as tf

 from collections import deque
 from keras.models import load_model
 from data_pb2 import AgentAction, NONE, ROCK, PAPER, SCISSOR
 from cogment import Agent, GrpcServer

 global graph, model
 graph = tf.get_default_graph()

 model = load_model('model_supervised.h5')


 def GetPrediction(moves):
     if len(moves) < 18:
         moves = moves + ([0] * (18-len(moves)))

     moves_np = np.array([moves])

     with graph.as_default():
         prediction = model.predict(moves_np).argmax()

     return prediction

 def GetAgentMove(moves):
     prediction = GetPrediction(moves)
     to_play = {
         ROCK: PAPER,
         PAPER: SCISSOR,
         SCISSOR: ROCK,
     }

     return to_play[prediction]

 class Agent(Agent):
     VERSIONS = {"agent": "1.0.0"}
     actor_class = cog_settings.actor_classes.agent

     def __init__(self, trial, actor, config):
         super().__init__(trial, actor, config)
         self.moves_history = deque(maxlen=18)

     def decide(self, observation):

         # p2 is the ai and p1 is the human
         if observation.previous_p1_action is not NONE:
             self.moves_history.append(observation.previous_p2_action.decision)
             self.moves_history.append(observation.previous_p1_action.decision)

         action = AgentAction()
         action.decision = GetAgentMove(list(self.moves_history))

         print(f"Agent decide {action.decision}")
         return action

     def reward(self, reward):
         print("Player reward")

     def on_message(self, sender, msg):
         if msg:
             print(f'Agent {self.id_in_class} received message - {msg} from sender {sender}')

     def end(self):
         print("Player end")



 if __name__ == '__main__':
     server = GrpcServer(Agent, cog_settings)
     server.serve()
```

[1]: https://gitlab.com/cogment/rps/raw/master/model_supervised.h5
