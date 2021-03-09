# Step 6: Add a web client for the human player

> This part of the tutorial follows [step 5](./5-human-player.md), make sure you've gone through it before starting this one. Alternatively the completed step 5 can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps).

In this step of the tutorial, we will go over a web client implementation, to enable Humans to play RPS, while being able to take advantage of various web technologies.

## Prerequisites

To develop a web client, you will need a working installation of Node.js, you can get download and install this from

https://nodejs.org/en/download/

## The web client

In the previous steps, we triggered the trials by running `cogment run client`. This launched a trial using code in `client/main.py`. In this step we will trigger a trial using a react app. 

Before we start with the cogment side of things, we'll need to get a few prerequisite files setup

## Creating a react app

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

## Copying in assets

For this rps implementation, we will need a few assets, these can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps) in the path [6-web-client/web-client/public/images](./6-web-client/web-client/public/images)

Copy that image folder into the public folder that was generated when you ran create-react-app.

## Setting up Docker

We'll need two additional docker-compose services along-side those which you already have in order to add this web client. One will be for running the web-client. and one will be for a proxy service called `grpcwebproxy`

> NOTE: `grpcwebproxy` is a helpful program that allows grpc endpoints to be utilized by web applications. Web applications natively can not use the grpc protocol, which is an issue as that is how all the elements of cogment communicate with eachother. This is solved by using a proxy which accepts web socket connections, and translates those into grpc requests.

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
import ComputerIcon from "@material-ui/icons/Computer";
import PersonIcon from "@material-ui/icons/Person";
import { Container, makeStyles, useTheme } from "@material-ui/core";

//And here's the important part, we're importing the two things that will allow us to use cogment, first is the 'useActions' hook, this will give us the observations of our human agent, as well as allow us to make actions.
import { useActions } from "./hooks/useActions";

//Second is our 'cogSettings'. This is a file that was generated when you ran
//`cogment generate --js_dir=./webclient`
//This file tells our web client relevant information about our trials, environments, and actor classes
import { cogSettings } from "./CogSettings";

//Finally here are two components which we will make later in the tutorial
import { Player } from "./components/Player";
import { Header } from "./components/Header";
```

Next are the styles we'll use for this component, again, feel free to change these as you see fit

```jsx
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    width: "100vw",
    height: "100vh",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  choiceButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },

  choiceContainer: {
    margin: theme.spacing(1),
  },

  choiceImg: {
    paddingRight: "1vw",
    width: "12vw",
    height: "12vw",
  },
}));
```

And a simple helper function

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

When our web client recieves an observation from the trial, the moves will be encoded in an enum, the same enum that we defined in our `data.proto`. Here we translate that into strings we can use in our application

Finally, the react component

```jsx
export const App = () => {
  //Bring in classes and themes to use in Material UI
  const classes = useStyles();
  const theme = useTheme();

  /*
    The most important part of our application.

    Here, we use the 'useActions' hook, this hook returns an array with 3 elements

    event: this contains all the information about any observation, reward, or message we've recieved this tick, we will use this to see what moves we and the computer played

    startTrial: this is a function which takes no arguments, and is a very simple way to start a new trial with our player actor

    sendAction: this is a funciton which takes an argument of type 'Action', this class can be imported from data_pb.js, but we'll see that later in this tutorial.

    This hook takes in 3 arguments, the first being

    cogSettings: this is what's imported from CogSettings.js, it provides all the relevant information about data.proto to this hook so that it can function

    actorName: the name of the human actor which this web client will be representing, this is defined in cogment.yaml

    actorClass: the class of the human actor which this web client will be representing, this is defined in cogment.yaml
  */
  const [event, startTrial, sendAction] = useActions(
    cogSettings,
    "player_1",
    "player"
  );

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

  //Get the button the AI has selected, we will highlight this in yellow to let the human know that the AI has selected this option
  const AISelected =
    gameState !== "start" && getMoveText(observation.them.lastRoundMove);

  //The layout of the page
  return (
    <>
      <Header observation={observation} gameState={gameState} />
      <Container className={classes.container}>
        <Player
          score={observation ? observation.me.currentGameScore : 0}
          color={theme.palette.primary.main}
          IconClass={PersonIcon}
          onAction={sendAction}
          isHuman
        />

        <Player
          score={observation ? observation.them.currentGameScore : 0}
          color={theme.palette.secondary.main}
          IconClass={ComputerIcon}
          selected={AISelected}
        />
      </Container>
    </>
  );
};
```

Awesome, we're almost done!, now to implement the two components referenced in this component. Header, and Player.

First the header, this will tell the player the current game state, and let them know what they should do next

## components/Header.js

First, the imports

```jsx
import React from "react";

//Just some imports from Material UI for the styling, as well as some icons that we'll be using
import { makeStyles, Typography } from "@material-ui/core";
import ComputerIcon from "@material-ui/icons/Computer";
import PersonIcon from "@material-ui/icons/Person";
```

Next, the style

```jsx
const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  inlineImg: {
    height: "1em",
    width: "1em",
    margin: "0 0.25em",
    fontSize: "inherit",
  },

  headerText: {
    display: "flex",
    alignItems: "center",
  },

  spacer: {
    width: "1em",
  },
}));
```

And finally the component

```jsx
export const Header = ({ observation, gameState }) => {
  //Get styles
  const classes = useStyles();

  //Define icons we will be using, for simple access later in the component
  const rock = (
    <img
      alt="rock"
      className={classes.inlineImg}
      src={"images/hand-rock.svg"}
    />
  );
  const paper = (
    <img
      alt="paper"
      className={classes.inlineImg}
      src={"images/hand-paper.svg"}
    />
  );
  const scissors = (
    <img
      alt="scissors"
      className={classes.inlineImg}
      src={"images/hand-scissors.svg"}
    />
  );
  const human = <PersonIcon className={classes.inlineImg} />;
  const computer = <ComputerIcon className={classes.inlineImg} />;

  //Simple function to go from enum to an image, this is the similar to the function in App.js that did something similar
  function getMoveImg(move) {
    switch (move) {
      case 0:
        return rock;
      case 1:
        return paper;
      case 2:
        return scissors;
      default:
        throw new Error("Not a rock, paper, or scissors");
    }
  }

  return (
    <div className={classes.banner}>
      {/*
        Show different information based on game state
        For the first option, if the game state is just starting, tell the human to chose rock, paper, or scissors
      */}
      {gameState === "start" && (
        <Typography variant="h1" align="center" className={classes.headerText}>
          Pick{rock},{paper}, or{scissors}
        </Typography>
      )}

      {/*
        If the game state is in the middle of playing, let the human know what the result of the last round was
      */}
      {gameState === "playing" && (
        <Typography variant="h1" align="center" className={classes.headerText}>
          {/*
            Show what each player chose as their action
          */}
          {human}
          {getMoveImg(observation.me.lastRoundMove)}
          <div className={classes.spacer} />
          {computer}
          {getMoveImg(observation.them.lastRoundMove)}
          <div className={classes.spacer} />

          {/*
            Show the result of each player choosing the aformentioned actions, either the human wins the round, computer wins the round, or it's a tie
          */}
          {observation.me.lastRoundWin === observation.them.lastRoundWin &&
            "Tie!"}

          {observation.me.lastRoundWin && !observation.them.lastRoundWin && (
            <>{human}Won!</>
          )}

          {!observation.me.lastRoundWin && observation.them.lastRoundWin && (
            <>{computer}Won!</>
          )}
        </Typography>
      )}

      {/*
        If the game state is that the round has ended, show who won the round, by seeing who's score was bigger
      */}
      {gameState === "end" && (
        <Typography variant="h1" align="center" className={classes.headerText}>
          {observation.me.currentGameScore >
            observation.them.currentGameScore && human}
          {observation.me.currentGameScore <
            observation.them.currentGameScore && computer}
          WINS!
          <div className={classes.spacer} />
          Choose to play again
        </Typography>
      )}
    </div>
  );
};
```

Now that we've made the component that will tell the human what the current game state is, let's make the component that will allow the human to interact with the trial, this component will make use of the sendAction function we got from the useActions hook

## components/Player.js

First, the imports

```jsx
import React from "react";

//Material UI imports, for style
import Grid from "@material-ui/core/Grid";
import { makeStyles, Typography } from "@material-ui/core";

//This is a message which was defined in data.proto, this import will need to change whenever its corresponding message in data.proto is changed, and cogment generate is run.
import { Action } from "../data_pb";

//One last component which we haven't defined yet, don't worry, it's not too big
import { RPSButton } from "./RPSButton";
```

Next, the style

```jsx
const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  inlineImg: {
    height: "1em",
    width: "1em",
    margin: "0 0.25em",
    fontSize: "inherit",
  },

  headerText: {
    display: "flex",
    alignItems: "center",
  },

  spacer: {
    width: "1em",
  },
}));
```

And finally, the component

```jsx
//This component will recieve some props, which will tell it about the trial state, and whether it's the human, or computer player
export const Player = ({
  IconClass /*Either a human, or computer icon*/,
  score = 0 /*The score of the agent this component represents*/,
  isHuman /*Is the component a human?*/,
  onAction /*The onAction function we got from the useActions hook*/,
  selected /*Which option is selected (Only relevant if this is representing the computer)*/,
}) => {
  const classes = useStyles({ isHuman });

  //This is a function that constructs the Action which the player will send when they click either rock, paper, or scissors
  function choose(move) {
    const action = new Action();
    action.setMove(move);
    onAction(action);
  }

  return (
    <Grid className={classes.choiceContainer} container>
      {/*
        Show for this player, whether they are the human, or the computer, and what their score is
      */}
      <Grid className={classes.choiceButtonContainer} item xs={3}>
        <IconClass className={classes.icon} />
        <Typography variant="h1">{score}</Typography>
      </Grid>

      {/*
        The Rock, Paper, and Scissors buttons
      */}
      <Grid className={classes.choiceButtonContainer} item xs={3}>
        <RPSButton
          selected={selected === "rock"}
          move="rock"
          isHuman={isHuman}
          onChoose={choose}
        />
      </Grid>

      <Grid className={classes.choiceButtonContainer} item xs={3}>
        <RPSButton
          selected={selected === "paper"}
          move="paper"
          isHuman={isHuman}
          onChoose={choose}
        />
      </Grid>

      <Grid className={classes.choiceButtonContainer} item xs={3}>
        <RPSButton
          selected={selected === "scissors"}
          move="scissors"
          isHuman={isHuman}
          onChoose={choose}
        />
      </Grid>
    </Grid>
  );
};
```

Alright, finally, let's make the actual buttons that will let the human chose an option of Rock, Paper, or Scissors (These buttons also serve to show visually which option the computer has just chosen)

## components/RPSButton.js

First, the imports

```jsx
import React from "react";

//Material UI imports, for style
import { IconButton, makeStyles, useTheme } from "@material-ui/core";

//This is a message which was defined in data.proto, this import will need to change whenever its corresponding message in data.proto is changed, and cogment generate is run.
import { Move } from "../data_pb";
```

Next, the style

```jsx
const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  inlineImg: {
    height: "1em",
    width: "1em",
    margin: "0 0.25em",
    fontSize: "inherit",
  },

  headerText: {
    display: "flex",
    alignItems: "center",
  },

  spacer: {
    width: "1em",
  },
}));
```

And finally, the component

```jsx
export const RPSButton = ({ selected, isHuman, move, onChoose }) => {
  const theme = useTheme();

  //Make the button either Blue, or Yellow, depending on if this button is being used by the human, or computer
  const color = isHuman
    ? theme.palette.primary.main
    : theme.palette.secondary.main;
  const classes = useStyles({ color, isHuman });

  //Make the button either behave like a clickable button, or a non-clickable button, depending on if this button is being used by the human, or computer
  const className =
    isHuman || selected ? classes.choiceButton : classes.choiceButtonGray;

  return (
    <IconButton
      className={className}
      /* 
        Move[move.toUpperCase()] is a neat hack based on the fact that in Javascript, object.THING is the same as object["THING"], so we can access the enum value for a certain move by indexing it at the text for that move

        Move.ROCK is the same as Move["Rock"]
      */
      onClick={() => onChoose(Move[move.toUpperCase()])}
    >
      <img
        alt={(isHuman ? "Human " : "Computer ") + move}
        className={classes.choiceImg}
        src={"images/hand-" + move + ".svg"}
      />
    </IconButton>
  );
};
```

And we're done!

## Conclusion

You can now see your app fully functional by going to the folder where your cogment.yaml sits, and running the commands

```console
$ cogment run build
$ cogment run start
```

And opening up localhost:3000 in your browser