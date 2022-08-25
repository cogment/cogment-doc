# Step 6: Add a web client for the human player

:::note

This part of the tutorial follows [step 5](./5-human-player.md), make sure you've gone through it before starting this one. Alternatively the completed step 5 can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps).

:::

In this step of the tutorial, we will go over a web client implementation, to enable Humans to play RPS, while being able to take advantage of various web technologies.

## Prerequisites

To develop a web client, we will need a working installation of Node.js, version 14 or later. You can download and install this from: <https://nodejs.org/en/download/>

## The web client

In the previous steps, we triggered the trials by running `./run.sh client_start`. This launched a trial using code in `client/main.py`. In this step we will trigger a trial using a React web app.

Before we start with the Cogment side of things, we'll need to get a few prerequisite files setup.

## Creating a React app

First, we will initialize a React app. This can be done very simply by running from the root `rps` directory:

```console
npx create-react-app web_client
```

Once this is done, we will be able to open a React app in our browser by running the following commands:

```console
cd web_client
npm start
```

## Adding Material UI

We will be using Material UI for this web client. This will provide us with a nice and clean way to add styles to our application, as well as some components which we will use to reduce code size.

Install Material UI by running the following commands from inside of the web_client folder:

```console
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

:::note

Due to the nature of create-react-app when installed using the ```npx``` command, the resulting installation will always utilize the latest version of React. This may cause dependecy issues when installing Material UI. As such, whenever such issues are encountered, please refer to the [Material UI documentation](https://mui.com/material-ui/getting-started/installation/) to confirm the correct required version of React.

:::

## Update the run script

In this tutorial we will add a new service that builds and serves the web clients. We will also need to configure the orchestrator to expose its services to the web client using grpcweb.

:::tip

Cogment internally relies on [`grpcwebproxy`](https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy) to allow its grpc endpoints to be utilized by web applications. Web applications cannot natively use the grpc protocol that all Cogment modules use to communicate with one another. Using this proxy to translate the web socket connections it accepts into grpc requests solves this issue.

:::

We will need to update the `run.sh` script and the `.env` file to do that.

:::note

The `run.sh` script that we use for this tutorial is a helpful way to build services and run them, you can take inspiration from it in your own projects.

:::

To prepare for the additional service, let's add the following environment variables to the `.env` file:

```console
ORCHESTRATOR_HTTP_PORT=9003 # This is the port that orchestrator will listen on for grpcweb connections.
WEB_CLIENT_PORT=8000 # This is the port that the web client will listen on.
```

In the `./run.sh` script we will add two new commands to build and start the web client:

```bash
function web_client_build() {
  _load_dot_env # Load the environment variables from the dotenv file
  cp "${ROOT_DIR}/data.proto" "${ROOT_DIR}/cogment.yaml" "${ROOT_DIR}/web_client" # Copy the spec and protobuf files
  cd "${ROOT_DIR}/web_client"
  npm install # Install dependencies
  npx cogment-js-sdk-generate cogment.yaml # Run the code generation phase
}

function web_client_start() {
  _load_dot_env
  export PORT="${WEB_CLIENT_PORT}" # Define the PORT the web client will use
  export REACT_APP_ORCHESTRATOR_HTTP_ENDPOINT="http://${ORCHESTRATOR_HOST}:${ORCHESTRATOR_HTTP_PORT}" # Define the endpoint it will connect to
  cd "${ROOT_DIR}/web_client"
  npm start
}
```

We will also need to pass additional parameters to cogment when starting the orchestrator to enable the grpcweb server and to specifiy the trial parameters. The latter is needed because contrary to clients using the python sdk, web clients can't specify the trial parameters directly.

```bash
function orchestrator_start() {
  _load_dot_env
  cogment services orchestrator \
    --actor_port="${ORCHESTRATOR_PORT}" \
    --lifecycle_port="${ORCHESTRATOR_PORT}" \
    --actor_web_port="${ORCHESTRATOR_HTTP_PORT}" \
    --params="./params.yaml"
}
```

Finally in this file, we will add the web client build to the `build` command.

```bash
function build() {
  _run_sequence client_build environment_build random_agent_build web_client_build
}
```

## The parameters file

The parameters file is a `.yaml` file that specifies the default trial parameters to Cogment. In this tutorial, we will use the following parameters:

```yaml
trial_params:
    environment:
        endpoint: grpc://localhost:9001

    actors:
        - name: player_1
          actor_class: player
          endpoint: cogment://client
        - name: player_2
          actor_class: player
          implementation: heuristic_agent
          endpoint: grpc://localhost:9002
```

Create a `params.yaml` file in the root directory with the previous content.

## Adding Cogment to our web client

The easiest way to add Cogment to any web client is to start with a React app, then follow the three steps below:

1.  Install the Javascript SDK and typescript using:

    ```console
    npm install @cogment/cogment-js-sdk
    npm install --save-dev typescript
    ```

    while inside of the `web_client` folder

2.  Copy the hooks folder from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps), found at [6-web-client/web_client/src/](https://github.com/cogment/cogment-tutorial-rps/tree/main/6-web-client/web_client/src), into your src directory.

3.  Navigate nack to the `rps` folder then run the following command to generate Javascript files from your trial specs:

    ```console
    ./run.sh web_client_build
    ```

Now that all that's done, we can finally start coding our web client!

# CODE

> NOTE: For each of the following files, we will provide the styles in a code block. Feel free to skip these, or make your own; they are not important to the function of this application.

## index.js / index.css

When we created our React app, these two files were generated automatically. Replace their content with the following:

> NOTE: These can also be downloaded from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps).

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
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from "@mui/material/styles";

let theme = createTheme({
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
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
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

//And here's the important part: we're importing the two things that will allow us to use Cogment.

//First, the 'useActions' hook which will give us our observations as a human agent, as well as allow us to send actions.
import { useActions } from "./hooks/useActions";

//Second, our 'cogSettings'. This is a file that was generated when we ran
//`npx cogment-js-sdk-generate cogment.yaml`
//This file tells our web client relevant information about our trials, environments, and actor classes.
import { cogSettings } from "./CogSettings";

//These are messages which were defined in data.proto. These imports will need to change whenever their corresponding messages in data.proto are changed and `npx cogment-js-sdk-generate cogment.yaml` is run.
import { rps as PB } from "./data_pb";
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

-   event: this contains all the information about any observation, reward, or message we've received this tick. We will use this to see what plays we and the computer made.

-   startTrial: this is a function which takes no arguments, and is a very simple way to start a new trial with our player actor.

-   sendAction: this is a function which takes an argument of type 'Action'. This class can be imported from data_pb.js, but we'll see that later in this tutorial.

This hook takes in 3 arguments:

-   cogSettings: this is what's imported from CogSettings.js. It provides all the relevant information about data.proto to this hook so that it can function.

-   actorName: the name of the human actor which this web client will be representing. It should be aligned with what's defined in `params.yaml`.

-   actorClass: the class of the human actor which this web client will be representing. It should be aligned with what's defined in `params.yaml`.

```jsx
export const App = () => {
    const [event, startTrial, sendAction] = useActions(
        cogSettings,
        "player_1",
        "player"
    );

    //Function to construct the Action which the player will send when they click either rock, paper, or scissors
    const choose = (move) => {
        const action = new PB.PlayerAction({
            move,
        });
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
import { Context } from "@cogment/cogment-js-sdk";
import { useEffect, useState } from "react";

export const useActions = (cogSettings, actorName, actorClass) => {
    const [event, setEvent] = useState({
        observation: null,
        actions: null,
        messages: null,
        rewards: null,
        type: null,
        last: false,
    });

    const [startTrial, setStartTrial] = useState(null);
    const [sendAction, setSendAction] = useState(null);

    //Set up the connection and register the actor only once, regardless of re-rendering
    useEffect(() => {
        const context = new Context(cogSettings, actorName);

        context.registerActor(
            async (actorSession) => {
                actorSession.start();

                //Double arrow function here beause react will turn a single one into a lazy loaded function
                setSendAction(() => (action) => {
                    actorSession.doAction(action);
                });

                for await (const event of actorSession.eventLoop()) {
                    const eventUseActions = event;

                    eventUseActions.last = event.type === 3;

                    setEvent(eventUseActions);
                }
            },
            actorName,
            actorClass
        );

        const endpoint = process.env.REACT_APP_ORCHESTRATOR_HTTP_ENDPOINT;
        const controller = context.getController(endpoint);

        //Need to output a function so that the user can start the trial when all actors are connected
        //Again, double arrow function cause react will turn a single one into a lazy loaded function
        setStartTrial(() => async () => {
            const trialId = await controller.startTrial();
            await context.joinTrial(trialId, endpoint, actorName);
        });
    }, [cogSettings, actorName, actorClass]);

    return [event, startTrial, sendAction];
};
```

We also need to create `web_client/.eslintignore` and add the following to it to ignore checks on the generate files:

```
src/*_pb*
src/cog_settings*
```

You can now see our app fully functional running the following commands in the `rps` folder:

```console
./run.sh build
./run.sh services_start
```

In another terminal, start the web client:

```console
 ./run.sh web_client_start
```

And opening up <localhost:8000> in our browser.

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
                gameState !== "start" &&
                getMoveText(observation.them.lastRoundMove)
            }
        />
    </Container>
</Box>
```
