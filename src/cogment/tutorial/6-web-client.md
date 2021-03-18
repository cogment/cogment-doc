# Step 6: Add a web client for the human player

> This part of the tutorial follows [step 5](./5-human-player.md), make sure you've gone through it before starting this one. Alternatively the completed step 5 can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps).

In this step of the tutorial, we will go over a web client implementation, to enable Humans to play RPS, while being able to take advantage of various web technologies.

## Prerequisites

To develop a web client, you will need a working installation of Node.js, you can get download and install this from

https://nodejs.org/en/download/

## The web client

In the previous steps, we triggered the trials by running `cogment run client`. This launched a trial using code in `client/main.py`. In this step we will trigger a trial using a react app.

Before we start with the cogment side of things, we'll need to get a few prerequisite files setup

## Creating a React app

To start, we will initialize a react app, this can be done very simply by running

```console
$ npx create-react-app web-client
```

After this is complete you should be able to run the following commands

```console
$ cd web-client
$ npm start
```

And have a react app open in your browser.

## Adding Material UI

We will be using Material UI for this web client, this will provide us with a nice and clean way to add styles to our application, as well as some components which we will use to reduce code size

In order to do this, install it using the following commands while inside of the web-client folder

```console
$ npm i @mateiral-ui/core
$ npm i @material-ui/icons
```

## Setting up Docker

We'll need two additional docker-compose services along-side those which you already have in order to add this web client. One will be for running the web-client. and one will be for a proxy service called `grpcwebproxy`

> NOTE: `grpcwebproxy` [link](https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy) is a helpful program that allows grpc endpoints to be utilized by web applications. Web applications natively can not use the grpc protocol, which is an issue as that is how all the elements of cogment communicate with eachother. This is solved by using a proxy which accepts web socket connections, and translates those into grpc requests.

For these services, add the following to the end of your docker-compose.yaml

```yaml
web-client:
  build:
    context: web-client
    dockerfile: ../js_service.dockerfile
  environment:
    - NODE_ENV=development
    - CHOKIDAR_USEPOLLING=true
    - REACT_APP_APP_VERSION=dev
  restart: on-failure
  ports:
    - "3000:3000"
  depends_on:
    - grpcwebproxy

grpcwebproxy:
  build:
    context: ./grpcwebproxy
    dockerfile: ../grpcwebproxy.dockerfile
  restart: on-failure
  ports:
    - "8080:8080"
  depends_on:
    - orchestrator
```

We will also need two additional dockerfiles to go along with these entries, first will be `grpcwebproxy.dockerfile` with the following contents:

```dockerfile
FROM golang:1.15.2 as dev

WORKDIR /go

ARG GO111MODULE=auto
ENV GO111MODULE=${GO111MODULE}
ENV GOPATH=/go

ENV COGMENT_URL=orchestrator:9000

RUN go get github.com/improbable-eng/grpc-web/go/grpcwebproxy

EXPOSE 8080

CMD ["grpcwebproxy", "--backend_addr=orchestrator:9000", "--run_tls_server=false", "--allow_all_origins", "--use_websockets"]
```

Second will be `js_service.dockerfile` with the following contents:

```dockerfile
# pull official base image
FROM node:14 as dev

# set working directory
WORKDIR /app
EXPOSE 3000

# copy generated app
COPY . ./

# start app
CMD ["npm", "start"]
```

> NOTE: The docker-compose entry and coresponding dockerfile are not actually needed for the web-client, as it can just as easily be run outside of docker, since the port for `grpcwebproxy` is exposed outside of the docker network. However, doing it like this makes the command to startup the application much simpler

Finally, we have to add `web-client` and `grpcwebproxy` to the start, build, and stop commands in your `cogment.yaml`.

```yaml
build: docker-compose build orchestrator environment random_agent web-client grpcwebproxy
start: docker-compose up orchestrator environment random_agent web-client grpcwebproxy
stop: docker-compose stop orchestrator environment random_agent web-client grpcwebproxy
```

## Adding Cogment to your web client

The easiest way to add cogment to any web client is to start with a react app, then do the following three steps

1.  Install the Javascript SDK using

    ```console
    $ npm i @cogment/cogment-js-sdk
    ```

    while inside of the web-client folder

2.  Copy in the hooks folder from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps) in the path [6-web-client/web-client/src/hooks](./6-web-client/web-client/src/hooks) into your src directory.

3.  Up one folder, in your project directory (where you have your cogment.yaml), run the following command to generate Javascript files from your defined protobufs
    ```console
    $ cogment generate --js_dir=./web-client
    ```

> NOTE: The react hooks used in this section of the tutorial would normally be generated with `cogment init` if we had chosen `Y` when asked if we wanted a web client

Now that all that's done, we can finally start coding our web client!

# CODE

> NOTE: For each of the following files, we will provide the styles in a code block, feel free to skip these, or make your own, they are not important to the function of this application

## index.js / index.css

When you created your react app, these two files were generated automatically. Replace their contents with the following

> NOTE: These can also be downloaded from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps)

index.css:

```css
body {
  margin: 0;
  background-color: #c5cce8;
}
```

index.js

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#c5cce8",
      main: "#6B80C4",
    },
    secondary: {
      main: "#ffb400",
    },
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

This is simply to provide styles to our Material UI components, we haven't started with the actual cogment part yet, which is exactly what we'll be doing next

## App.js

We'll start with a few imports, some of these files don't exist yet, but we'll be making them

```jsx
//First is some react imports
import React, { useEffect } from "react";

//Then some imports for icons and Material UI functionality we'll be using
import {
  Box,
  Button,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";

//And here's the important part, we're importing the two things that will allow us to use cogment, first is the 'useActions' hook, this will give us the observations of our human agent, as well as allow us to make actions.
import { useActions } from "./hooks/useActions";

//Second is our 'cogSettings'. This is a file that was generated when you ran
//`cogment generate --js_dir=./webclient`
//This file tells our web client relevant information about our trials, environments, and actor classes
import { cogSettings } from "./CogSettings";

//These are messages which were defined in data.proto, these imports will need to change whenever their corresponding messages in data.proto are changed, and cogment generate is run.
import { Action, Move } from "./data_pb";
```

Then we add a function that will convert the move, encoded as an enum (the same enum that we defined in our `data.proto`) to a string we can use in our application

```jsx
function getMoveText(move) {
  switch (move) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
    default:
      throw new Error("Not a rock, paper, or scissors");
  }
}
```

Finally, the react component

At the start of this component is the most important part of our application.

Here, we use the 'useActions' hook, this hook returns an array with 3 elements

- event: this contains all the information about any observation, reward, or message we've recieved this tick, we will use this to see what moves we and the computer played

- startTrial: this is a function which takes no arguments, and is a very simple way to start a new trial with our player actor

- sendAction: this is a funciton which takes an argument of type 'Action', this class can be imported from data_pb.js, but we'll see that later in this tutorial.

This hook takes in 3 arguments, the first being

- cogSettings: this is what's imported from CogSettings.js, it provides all the relevant information about data.proto to this hook so that it can function

- actorName: the name of the human actor which this web client will be representing, this is defined in cogment.yaml

- actorClass: the class of the human actor which this web client will be representing, this is defined in cogment.yaml

```jsx
export const App = () => {
  const [event, startTrial, sendAction] = useActions(
    cogSettings,
    "player_1",
    "player"
  );

  //Function to construct the Action which the player will send when they click either rock, paper, or scissors
  const choose = (move) => {
    const moveEnum = Move[move];
    const action = new Action();
    action.setMove(moveEnum);
    sendAction(action);
  };

  //This will start a trial as soon as we're connected to the orchestrator
  useEffect(() => {
    if (startTrial) startTrial();
  }, [startTrial]);

  //Get any observation from the current event, events have observations, messages, and rewards, and all three can be unpacked from the event object
  const { observation } = event;

  //Parse game state out of the observation
  //Generally in cogment applications, all information that's not strictly neccesary must be infered by all agents, for this case, we must infer whether the game has either just started, is going, or if a round has ended
  let gameState;
  if (!observation || observation.roundIndex === 0) gameState = "start";
  if (observation && observation.roundIndex !== 0) gameState = "playing";
  if (
    observation &&
    observation.roundIndex === 0 &&
    observation.gameIndex !== 0
  )
    gameState = "end";

  //Get both scores
  const humanScore = observation ? observation.me.currentGameScore : 0;
  const computerScore = observation ? observation.them.currentGameScore : 0;

  //The layout of the page
  return (
    <Box>
      {/*
        Tell the player everything we know about the trial state, such as scores, moves, etc...
      */}
      <Typography>Game state: {gameState}</Typography>
      <Typography>Human score: {humanScore}</Typography>
      <Typography>Computer score: {computerScore}</Typography>
      <Typography>
        Human's move:{" "}
        {gameState !== "start" && getMoveText(observation.me.lastRoundMove)}
      </Typography>
      <Typography>
        Computer's move:{" "}
        {gameState !== "start" && getMoveText(observation.them.lastRoundMove)}
      </Typography>
      <Typography>
        Did Human win last round?{" "}
        {observation && observation.me.lastRoundWin ? "Yes" : "No"}
      </Typography>
      <Typography>
        Did Computer win last round?{" "}
        {observation && observation.them.lastRoundWin ? "Yes" : "No"}
      </Typography>
      <Button onClick={() => choose(0)}>Rock</Button>
      <Button onClick={() => choose(1)}>Paper</Button>
      <Button onClick={() => choose(2)}>Scissors</Button>
    </Box>
  );
};
```

## hooks/useActions.js

This hook does multiple things, it starts a trial, joins a trial, sends actions, and recieves information from the orchestrator. The following is its annotated code.

```jsx
import { useEffect, useState } from "react";
import * as cogment from "@cogment/cogment-js-sdk";

export const useActions = (cogSettings, actorName, actorClass) => {
  //Events are composed of a possible observation, message, and reward
  const [event, setEvent] = useState({
    observation: null,
    message: null,
    reward: null,
  });

  //startTrial and sendAction will be set after the connected agent joins the trial
  const [startTrial, setStartTrial] = useState(null);
  const [sendAction, setSendAction] = useState(null);

  //Set up the connection and register the actor only once, regardless of re-rendering

  //In this hook, the connected agent is immediatly registered to any existing trial sitting at port 8080 (more accurately any grpcwebproxy pointing to a trial). This is most of the time, the desired behaviour, but this could be changed in different circumstances by replacing this with something like setState(joinTrial), similar to setStartTrial further down this code
  useEffect(() => {
    //First we create our service, which will be our primary point of contact to the orchestrator
    const service = cogment.createService({
      cogSettings,
      //grpcURL is an optional argument, and it in fact defaults to the following value, here we're just showing that it can be set explicitly
      grpcURL:
        window.location.protocol + "//" + window.location.hostname + ":8080",
    });

    //Set up the actor object, an actorName and an actorClass is enough to define a unique actor to add to a trial
    const actor = { name: actorName, actorClass: actorClass };

    //Use the service to register an actor. registerActor takes two arguments, the second of which is a callback function which is provided the actorSession of the registered actor, with which we can send actions, and recieve events
    service.registerActor(actor, async (actorSession) => {
      //Start the session
      actorSession.start();

      //Double arrow function here beause react will turn a single one into a lazy loaded function
      setSendAction(() => (action) => {
        actorSession.sendAction(action);
      });

      /*actorSession.eventLoop is a async generator function, meaning you can use the syntax 
        for await(const foo of generator()){
          do stuff
        }
        to run some code every time there's new data provided by the function.

        This is massively useful for network streams.
      */
      for await (const {
        observation,
        message,
        reward,
      } of actorSession.eventLoop()) {
        //Parse the observation into a regular JS object
        //TODO: this will eventually be part of the API

        //Eventually observations will be regular Javascript objects (same with messages, and rewards). But for now you must convert it to an object.
        let observationOBJ = observation && observation.toObject();

        //Set the event state to the recieved event, causing a hook update
        setEvent({ observation: observationOBJ, message, reward });
      }
    });

    //Creating the trial controller must happen after actors are registered
    const trialController = service.createTrialController();

    //Need to output a function so that the user can start the trial when all actors are connected
    //Again, double arrow function cause react will turn a single one into a lazy loaded function
    setStartTrial(() => async () => {
      //Start and join the trial, when you start a trial, you will recieve an object containing the trialId, that can then be used to join a trial. Almost always, you will want to do both these actions in sequence, as trials do not proceed without the connected agent, if it has been specified in the cogment.yaml that a connected agent exists.
      const { trialId } = await trialController.startTrial(actor.actorClass);
      await trialController.joinTrial(trialId, actor);
    });
  }, [cogSettings, actorName, actorClass]);

  return [event, startTrial, sendAction];
};
```

Please note that `useActions` hook is generated by `cogment init`, we've still gone through it in this tutorial, because that is where most of the Cogment related code is contained, and must be understood if we want to use Cogment without React.JS.

You can now see your app fully functional by going to the folder where your cogment.yaml sits, and running the commands

```console
$ cogment run build
$ cogment run start
```

And opening up localhost:3000 in your browser

And with that we're done!

## Making it look good

If you want a fancier interface there is a completed UI in the tutorials repository that you can copy into your project, then just replace the return statement from App.js with the following, along with some style code that can be found in the repository version of App.js

```jsx
<Box>
  <Header observation={observation} gameState={gameState} />
  <Container className={classes.container}>
    <Player
      score={humanScore}
      color={theme.palette.primary.main}
      IconClass={PersonIcon}
      choose={choose}
      isHuman
    />

    <Player
      score={computerScore}
      color={theme.palette.secondary.main}
      IconClass={ComputerIcon}
      selected={
        gameState !== "start" && getMoveText(observation.them.lastRoundMove)
      }
    />
  </Container>
</Box>
```
