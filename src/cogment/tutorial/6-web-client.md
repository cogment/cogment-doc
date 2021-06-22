# Step 6: Add a web client for the human player

> This part of the tutorial follows [step 5](./5-human-player.md), make sure you've gone through it before starting this one. Alternatively the completed step 5 can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps){target=\_blank}.

In this step of the tutorial, we will go over a web client implementation, to enable Humans to play RPS, while being able to take advantage of various web technologies.

## Prerequisites

To develop a web client, we will need a working installation of Node.js. You can download and install this from:

<https://nodejs.org/en/download/>{target=\_blank}

## The web client

In the previous steps, we triggered the trials by running `cogment run client`. This launched a trial using code in `client/main.py`. In this step we will trigger a trial using a React app.

Before we start with the Cogment side of things, we'll need to get a few prerequisite files setup.

## Creating a React app

First, we will initialize a React app. This can be done very simply by running:

```console
$ npx create-react-app web-client
```

Once this is done, we will be able to open a React app in our browser by running the following commands:

```console
$ cd web-client
$ npm start
```

## Adding Material UI

We will be using Material UI for this web client. This will provide us with a nice and clean way to add styles to our application, as well as some components which we will use to reduce code size.

Install Material UI by running the following commands from inside of the web-client folder:

```console
$ npm i @material-ui/core
$ npm i @material-ui/icons
```

## Setting up Docker

In addition to the docker-compose services we already have, we'll need two more for this web client. One to run it, and another for a proxy service called `grpcwebproxy`.

> NOTE: `grpcwebproxy` [(link)](https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy){target=\_blank} is a helpful program that allows grpc endpoints to be utilized by web applications. Web applications cannot natively use the grpc protocol that all Cogment elements use to communicate with one another. Using this proxy to translate the web socket connections it accepts into grpc requests solves this issue.

For these services, let's add the following to the end of our docker-compose.yaml:

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

We will also need two additional dockerfiles to go along these entries. The first one will be `grpcwebproxy.dockerfile`, with the following content:

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

The second one will be `js_service.dockerfile`, with the following content:

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

> NOTE: Since the port for `grpcwebproxy` is exposed outside of the docker network, the docker-compose entry and corresponding dockerfile are not actually needed for the web-client; it can just as easily be run outside of docker. However, doing it like this makes the command to startup the application much simpler.

Finally, we have to add `web-client` and `grpcwebproxy` to the start, build, and stop commands in our `cogment.yaml`.

```yaml
build: docker-compose build orchestrator environment random_agent web-client grpcwebproxy
start: docker-compose up orchestrator environment random_agent web-client grpcwebproxy
stop: docker-compose stop orchestrator environment random_agent web-client grpcwebproxy
```

## Adding Cogment to our web client

The easiest way to add Cogment to any web client is to start with a React app, then follow the three steps below:

1.  Install the Javascript SDK using:

    ```console
    $ npm i @cogment/cogment-js-sdk
    ```

    while inside of the web-client folder

2.  Copy the hooks folder from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps){target=\_blank}, found at [6-web-client/web-client/src/](https://github.com/cogment/cogment-tutorial-rps/tree/main/6-web-client/web-client/src), into your src directory.

3.  Navigate one folder up to your project directory (where you have your cogment.yaml) then run the following command to generate Javascript files from your defined protobufs:
    ```console
    $ cogment generate --js_dir=./web-client
    ```

> NOTE: Had we chosen `Y` at the beginning of this tutorial when asked by the CLI if we wanted a web client, the React hooks used in this section would normally have been generated with the command `cogment init`."

Now that all that's done, we can finally start coding our web client!

# CODE

> NOTE: For each of the following files, we will provide the styles in a code block. Feel free to skip these, or make your own; they are not important to the function of this application.

## index.js / index.css

When we created our React app, these two files were generated automatically. Replace their content with the following:

> NOTE: These can also be downloaded from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps){target=\_blank}.

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

This is simply to provide styles to our Material UI components. We haven't started with the actual Cogment part yet, which is exactly what we'll be doing next.

## App.js

We'll start with a few imports. Some of these files don't exist yet, so we'll be creating them:

```jsx
//First is some React imports
import React, { useEffect } from "react";

//Then some imports for icons and Material UI functionality we'll be using
import {
  Box,
  Button,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";

//And here's the important part: we're importing the two things that will allow us to use Cogment.

//First, the 'useActions' hook which will give us our observations as a human agent, as well as allow us to send actions.
import { useActions } from "./hooks/useActions";

//Second, our 'cogSettings'. This is a file that was generated when we ran
//`cogment generate --js_dir=./webclient`
//This file tells our web client relevant information about our trials, environments, and actor classes.
import { cogSettings } from "./CogSettings";

//These are messages which were defined in data.proto. These imports will need to change whenever their corresponding messages in data.proto are changed and `cogment generate` is run.
import { PlayerAction } from "./data_pb";
```

Then we add a function that will convert the play, encoded as the same "move" enum that we defined in our data.proto, to a string we can use in our application:

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

Finally, the React component.

At the start of this component is the most important part of our application: the useAction hook.

This hook returns an array with 3 elements:

- event: this contains all the information about any observation, reward, or message we've received this tick. We will use this to see what plays we and the computer made.

- startTrial: this is a function which takes no arguments, and is a very simple way to start a new trial with our player actor.

- sendAction: this is a function which takes an argument of type 'Action'. This class can be imported from data_pb.js, but we'll see that later in this tutorial.

This hook takes in 3 arguments:

- cogSettings: this is what's imported from CogSettings.js. It provides all the relevant information about data.proto to this hook so that it can function.

- actorName: the name of the human actor which this web client will be representing. This is defined in cogment.yaml.

- actorClass: the class of the human actor which this web client will be representing. This is defined in cogment.yaml.

```jsx
export const App = () => {
  const [event, startTrial, sendAction] = useActions(
    cogSettings,
    "player_1",
    "player"
  );

  //Function to construct the Action which the player will send when they click either rock, paper, or scissors
  const choose = (move) => {
    const action = new PlayerAction();
    action.setMove(move);
    sendAction(action);
  };

  //This will start a trial as soon as we're connected to the orchestrator
  useEffect(() => {
    if (startTrial) startTrial();
  }, [startTrial]);

  //Get any observation from the current event, events have observations, messages, and rewards, and all three can be unpacked from the event object
  //We will also unpack a helpful variable called 'last', this will allow us to know when the trial has ended
  const { observation, last } = event;

  const [gameState, setGameState] = useState({
    gameStage: "start",
    roundIndex: 0,
    lastMoveComputer: 0,
    lastMoveHuman: 0,
  });
  const [firstObservation, setFirstObservation] = useState(true);

  useEffect(() => {
    //Parse game state out of the observation
    //Some events don't contain an observation, so we need to store the observation contents in a state
    if (!observation) return;

    //The first observation is not useful, as it just contains the default game state, before players have made moves
    if (firstObservation) {
      setFirstObservation(false);
      return;
    }

    //Get all relevant information from the observation
    const roundIndex = gameState.roundIndex + 1;
    const gameStage = "playing";
    const lastMoveComputer = observation.them.lastMove;
    const lastMoveHuman = observation.me.lastMove;
    const lastWonComputer = observation.them.wonLast;
    const lastWonHuman = observation.me.wonLast;

    setGameState({
      gameStage,
      roundIndex,
      lastMoveComputer,
      lastMoveHuman,
      lastWonComputer,
      lastWonHuman,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observation]);

  //The layout of the page
  return (
    <Box>
      {/*
        Tell the player everything we know about the trial state, such as, plays, who won, etc...
      */}
      <Typography>Game stage: {gameState.gameStage}</Typography>
      <Typography>
        Human's move:{" "}
        {gameState.gameStage !== "start" &&
          getMoveText(gameState.lastMoveHuman)}
      </Typography>
      <Typography>
        Computer's move:{" "}
        {gameState.gameStage !== "start" &&
          getMoveText(gameState.lastMoveComputer)}
      </Typography>
      <Typography>
        Did Human win last round?{" "}
        {observation && gameState.lastWonHuman ? "Yes" : "No"}
      </Typography>
      <Typography>
        Did Computer win last round?{" "}
        {observation && gameState.lastWonComputer ? "Yes" : "No"}
      </Typography>
      <Button onClick={() => choose(0)}>Rock</Button>
      <Button onClick={() => choose(1)}>Paper</Button>
      <Button onClick={() => choose(2)}>Scissors</Button>
    </Box>
  );
};
```

## hooks/useActions.js

This hook does multiple things. It starts a trial, joins a trial, sends actions, and receives information from the orchestrator. The following is its annotated code:

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

  //Set up the connection and register the actor only once

  //In this hook, the connected agent is immediatly registered to any existing trial sitting at port 8080 (more accurately any grpcwebproxy pointing to a trial). Most of the time, this is the desired behaviour, but it could be changed in different circumstances by replacing this with something like setState(joinTrial), similar to setStartTrial further down this code
  useEffect(() => {
    //First we create our service, which will be our primary point of contact to the orchestrator
    const service = cogment.createService({
      cogSettings,
      //grpcURL is an optional argument that in fact defaults to the following value. Here we're just showing that it can be set explicitly
      grpcURL:
        window.location.protocol + "//" + window.location.hostname + ":8080",
    });

    //Set up the actor object. An actorName and an actorClass is enough to define a unique actor to be added to a trial
    const actor = { name: actorName, actorClass: actorClass };

    //Use the service to register an actor. registerActor takes two arguments, the second of which is a callback function which is given the actorSession of the registered actor as its only argument. With the provided actorSession, we can send actions, and receive events.
    service.registerActor(actor, async (actorSession) => {
      //Start the session
      actorSession.start();

      //Double arrow function here because React will turn a single one into a lazy loaded function
      setSendAction(() => (action) => {
        actorSession.sendAction(action);
      });

      /*actorSession.eventLoop is an async generator function, meaning we can use the syntax
        for await(const foo of generator()){
          do stuff
        }
        to run some code every time there's new data provided by the function.

        This is massively useful for network streams.
      */
      for await (const event of actorSession.eventLoop()) {
        //Convert observations to a regular JS object.
        let observationOBJ = event.observation && event.observation.toObject();
        event.observation = observationOBJ;

        //If the type of the event is 3 (Ending), store that in event.last so we can use it later
        event.last = event.type === 3;

        //Set the event state to the received event, causing a hook update
        setEvent(event);
      }
    });

    //Creating the trial controller must happen after actors are registered
    const trialController = service.createTrialController();

    //Need to output a function so that the user can start the trial when all actors are connected
    //Again, double arrow function cause React will turn a single one into a lazy loaded function
    setStartTrial(() => async () => {
      //Start and join the trial. When we start a trial, we receive an object containing the trialID that can then be used to join it.
      //We will almost always want to do both these actions in sequence, since trials do not proceed without the connected agent if cogment.yaml specifies that a connected agent exists
      const { trialId } = await trialController.startTrial(actor.actorClass);
      await trialController.joinTrial(trialId, actor);
    });
  }, [cogSettings, actorName, actorClass]);

  return [event, startTrial, sendAction];
};
```

Please note that the `useActions` hook is generated by `cogment init`. We've still gone through it in this tutorial, because that is where most of the Cogment related code is contained, and it must be understood if we want to use Cogment without React.JS.

We also need to add the following to `web-client/.eslintignore`:

```
src/*_pb*
src/cog_settings*
```

Normally this file will be created by `cogment init`, but if you have been following the tutorial step-by-step, you need to create it manually.

You can now see our app fully functional by going to the folder where our cogment.yaml sits, and running the commands:

```console
$ cogment run build
$ cogment run start
```

And opening up localhost:3000 in our browser.

And with that we're done!

## Making it look good

If we want a fancier interface, there is a completed UI in the tutorials repository that we can copy into our project. Then, along with some style code that can be found in the repository version of App.js, just replace the return statement from App.js with the following:

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
