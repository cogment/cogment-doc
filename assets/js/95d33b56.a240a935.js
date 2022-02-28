"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[344],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),c=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(n),d=a,h=m["".concat(s,".").concat(d)]||m[d]||u[d]||r;return n?o.createElement(h,i(i({ref:t},p),{},{components:n})):o.createElement(h,i({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4195:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return m}});var o=n(7462),a=n(3366),r=(n(7294),n(3905)),i=["components"],l={},s="Step 6: Add a web client for the human player",c={unversionedId:"cogment/tutorial/web-client",id:"cogment/tutorial/web-client",title:"Step 6: Add a web client for the human player",description:"This part of the tutorial follows step 5, make sure you've gone through it before starting this one. Alternatively the completed step 5 can be retrieved from the tutorial's repository.",source:"@site/docs/cogment/tutorial/6-web-client.md",sourceDirName:"cogment/tutorial",slug:"/cogment/tutorial/web-client",permalink:"/docs/cogment/tutorial/web-client",tags:[],version:"current",lastUpdatedAt:1645720139,formattedLastUpdatedAt:"2/24/2022",sidebarPosition:6,frontMatter:{},sidebar:"docSidebar",previous:{title:"Step 5: Add a human player in the loop",permalink:"/docs/cogment/tutorial/human-player"},next:{title:"Step 7: Add a player trained with Reinforcement Learning using DQN",permalink:"/docs/cogment/tutorial/dqn-player"}},p=[{value:"Prerequisites",id:"prerequisites",children:[],level:2},{value:"The web client",id:"the-web-client",children:[],level:2},{value:"Creating a React app",id:"creating-a-react-app",children:[],level:2},{value:"Adding Material UI",id:"adding-material-ui",children:[],level:2},{value:"Setting up Docker",id:"setting-up-docker",children:[],level:2},{value:"Adding Cogment to our web client",id:"adding-cogment-to-our-web-client",children:[],level:2},{value:"index.js / index.css",id:"indexjs--indexcss",children:[],level:2},{value:"App.js",id:"appjs",children:[],level:2},{value:"hooks/useActions.js",id:"hooksuseactionsjs",children:[],level:2},{value:"Making it look good",id:"making-it-look-good",children:[],level:2}],u={toc:p};function m(e){var t=e.components,n=(0,a.Z)(e,i);return(0,r.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"step-6-add-a-web-client-for-the-human-player"},"Step 6: Add a web client for the human player"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"This part of the tutorial follows ",(0,r.kt)("a",{parentName:"p",href:"/docs/cogment/tutorial/human-player"},"step 5"),", make sure you've gone through it before starting this one. Alternatively the completed step 5 can be retrieved from the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment-tutorial-rps"},"tutorial's repository"),".")),(0,r.kt)("p",null,"In this step of the tutorial, we will go over a web client implementation, to enable Humans to play RPS, while being able to take advantage of various web technologies."),(0,r.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,r.kt)("p",null,"To develop a web client, we will need a working installation of Node.js. You can download and install this from:"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://nodejs.org/en/download/"},"https://nodejs.org/en/download/")),(0,r.kt)("h2",{id:"the-web-client"},"The web client"),(0,r.kt)("p",null,"In the previous steps, we triggered the trials by running ",(0,r.kt)("inlineCode",{parentName:"p"},"cogment run client"),". This launched a trial using code in ",(0,r.kt)("inlineCode",{parentName:"p"},"client/main.py"),". In this step we will trigger a trial using a React app."),(0,r.kt)("p",null,"Before we start with the Cogment side of things, we'll need to get a few prerequisite files setup."),(0,r.kt)("h2",{id:"creating-a-react-app"},"Creating a React app"),(0,r.kt)("p",null,"First, we will initialize a React app. This can be done very simply by running:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ npx create-react-app web-client\n")),(0,r.kt)("p",null,"Once this is done, we will be able to open a React app in our browser by running the following commands:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ cd web-client\n$ npm start\n")),(0,r.kt)("h2",{id:"adding-material-ui"},"Adding Material UI"),(0,r.kt)("p",null,"We will be using Material UI for this web client. This will provide us with a nice and clean way to add styles to our application, as well as some components which we will use to reduce code size."),(0,r.kt)("p",null,"Install Material UI by running the following commands from inside of the web-client folder:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ npm i @material-ui/core\n$ npm i @material-ui/icons\n")),(0,r.kt)("h2",{id:"setting-up-docker"},"Setting up Docker"),(0,r.kt)("p",null,"In addition to the docker-compose services we already have, we'll need two more for this web client. One to run it, and another for a proxy service called ",(0,r.kt)("inlineCode",{parentName:"p"},"grpcwebproxy"),"."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"NOTE: ",(0,r.kt)("inlineCode",{parentName:"p"},"grpcwebproxy")," ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy"},"(link)")," is a helpful program that allows grpc endpoints to be utilized by web applications. Web applications cannot natively use the grpc protocol that all Cogment elements use to communicate with one another. Using this proxy to translate the web socket connections it accepts into grpc requests solves this issue.")),(0,r.kt)("p",null,"For these services, let's add the following to the end of our docker-compose.yaml:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'web-client:\n    build:\n        context: web-client\n        dockerfile: ../js_service.dockerfile\n    environment:\n        - NODE_ENV=development\n        - CHOKIDAR_USEPOLLING=true\n        - REACT_APP_APP_VERSION=dev\n    restart: on-failure\n    ports:\n        - "3000:3000"\n    depends_on:\n        - grpcwebproxy\n\ngrpcwebproxy:\n    build:\n        context: ./grpcwebproxy\n        dockerfile: ../grpcwebproxy.dockerfile\n    restart: on-failure\n    ports:\n        - "8080:8080"\n    depends_on:\n        - orchestrator\n')),(0,r.kt)("p",null,"We will also need two additional dockerfiles to go along these entries. The first one will be ",(0,r.kt)("inlineCode",{parentName:"p"},"grpcwebproxy.dockerfile"),", with the following content:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-dockerfile"},'FROM golang:1.15.2 as dev\n\nWORKDIR /go\n\nARG GO111MODULE=auto\nENV GO111MODULE=${GO111MODULE}\nENV GOPATH=/go\n\nENV COGMENT_URL=orchestrator:9000\n\nRUN go get github.com/improbable-eng/grpc-web/go/grpcwebproxy\n\nEXPOSE 8080\n\nCMD ["grpcwebproxy", "--backend_addr=orchestrator:9000", "--run_tls_server=false", "--allow_all_origins", "--use_websockets"]\n')),(0,r.kt)("p",null,"The second one will be ",(0,r.kt)("inlineCode",{parentName:"p"},"js_service.dockerfile"),", with the following content:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-dockerfile"},'# pull official base image\nFROM node:14 as dev\n\n# set working directory\n\nWORKDIR /app\nEXPOSE 3000\n\n# generate protos\nCOPY package.json package-lock.json ./\nCOPY cogment.yaml ./\nCOPY *.proto ./\n\nRUN mkdir src\nRUN npm i\nRUN npx cogment-js-sdk-generate cogment.yaml\n\n# copy generated app\nCOPY . ./\n\n# start app\nCMD ["npm", "start"]\n')),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"NOTE: Since the port for ",(0,r.kt)("inlineCode",{parentName:"p"},"grpcwebproxy")," is exposed outside of the docker network, the docker-compose entry and corresponding dockerfile are not actually needed for the web-client; it can just as easily be run outside of docker. However, doing it like this makes the command to startup the application much simpler.")),(0,r.kt)("p",null,"Finally, we have to add ",(0,r.kt)("inlineCode",{parentName:"p"},"web-client")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"grpcwebproxy")," to the start, build, and stop commands in our ",(0,r.kt)("inlineCode",{parentName:"p"},"cogment.yaml"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"build: docker-compose build orchestrator environment random_agent web-client grpcwebproxy\nstart: docker-compose up orchestrator environment random_agent web-client grpcwebproxy\nstop: docker-compose stop orchestrator environment random_agent web-client grpcwebproxy\n")),(0,r.kt)("h2",{id:"adding-cogment-to-our-web-client"},"Adding Cogment to our web client"),(0,r.kt)("p",null,"The easiest way to add Cogment to any web client is to start with a React app, then follow the three steps below:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Install the Javascript SDK using:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ npm i @cogment/cogment-js-sdk\n")),(0,r.kt)("p",{parentName:"li"},"while inside of the web-client folder")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Copy the hooks folder from the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment-tutorial-rps"},"tutorial's repository"),", found at ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment-tutorial-rps/tree/main/6-web-client/web-client/src"},"6-web-client/web-client/src/"),", into your src directory.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Navigate one folder up to your project directory (where you have your cogment.yaml) then run the following command to generate Javascript files from your defined protobufs:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ cogment copy cogment.yaml *.proto web-client\n")))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"NOTE: Had we chosen ",(0,r.kt)("inlineCode",{parentName:"p"},"Y")," at the beginning of this tutorial when asked by the CLI if we wanted a web client, the React hooks used in this section would normally have been generated with the command ",(0,r.kt)("inlineCode",{parentName:"p"},"cogment init"),'."')),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"(optional) You can run the following commands outside of docker to generate your protobuf files if you need or want the typings at develop time",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"$ cd web-client\n$ npm install\n$ npx cogment-js-sdk-generate cogment.yaml\n")))),(0,r.kt)("p",null,"Now that all that's done, we can finally start coding our web client!"),(0,r.kt)("h1",{id:"code"},"CODE"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"NOTE: For each of the following files, we will provide the styles in a code block. Feel free to skip these, or make your own; they are not important to the function of this application.")),(0,r.kt)("h2",{id:"indexjs--indexcss"},"index.js / index.css"),(0,r.kt)("p",null,"When we created our React app, these two files were generated automatically. Replace their content with the following:"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"NOTE: These can also be downloaded from the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment-tutorial-rps"},"tutorial's repository"),".")),(0,r.kt)("p",null,"index.css:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-css"},"body {\n    margin: 0;\n    background-color: #c5cce8;\n}\n")),(0,r.kt)("p",null,"index.js"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'import React from "react";\nimport ReactDOM from "react-dom";\nimport "./index.css";\nimport { App } from "./App";\nimport {\n    createMuiTheme,\n    responsiveFontSizes,\n    ThemeProvider,\n} from "@material-ui/core/styles";\n\nlet theme = createMuiTheme({\n    palette: {\n        primary: {\n            light: "#c5cce8",\n            main: "#6B80C4",\n        },\n        secondary: {\n            main: "#ffb400",\n        },\n    },\n});\n\ntheme = responsiveFontSizes(theme);\n\nReactDOM.render(\n    <React.StrictMode>\n        <ThemeProvider theme={theme}>\n            <App />\n        </ThemeProvider>\n    </React.StrictMode>,\n    document.getElementById("root")\n);\n')),(0,r.kt)("p",null,"This is simply to provide styles to our Material UI components. We haven't started with the actual Cogment part yet, which is exactly what we'll be doing next."),(0,r.kt)("h2",{id:"appjs"},"App.js"),(0,r.kt)("p",null,"We'll start with a few imports. Some of these files don't exist yet, so we'll be creating them:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'//First is some React imports\nimport React, { useEffect } from "react";\n\n//Then some imports for icons and Material UI functionality we\'ll be using\nimport {\n    Box,\n    Button,\n    makeStyles,\n    Typography,\n    useTheme,\n} from "@material-ui/core";\n\n//And here\'s the important part: we\'re importing the two things that will allow us to use Cogment.\n\n//First, the \'useActions\' hook which will give us our observations as a human agent, as well as allow us to send actions.\nimport { useActions } from "./hooks/useActions";\n\n//Second, our \'cogSettings\'. This is a file that was generated when we ran\n//`npx cogment-js-sdk-generate cogment.yaml`\n//This file tells our web client relevant information about our trials, environments, and actor classes.\nimport { cogSettings } from "./CogSettings";\n\n//These are messages which were defined in data.proto. These imports will need to change whenever their corresponding messages in data.proto are changed and `npx cogment-js-sdk-generate cogment.yaml` is run.\nimport { PlayerAction } from "./data_pb";\n')),(0,r.kt)("p",null,'Then we add a function that will convert the play, encoded as the same "move" enum that we defined in our data.proto, to a string we can use in our application:'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'function getMoveText(move) {\n    switch (move) {\n        case 0:\n            return "rock";\n        case 1:\n            return "paper";\n        case 2:\n            return "scissors";\n        default:\n            throw new Error("Not a rock, paper, or scissors");\n    }\n}\n')),(0,r.kt)("p",null,"Finally, the React component."),(0,r.kt)("p",null,"At the start of this component is the most important part of our application: the useAction hook."),(0,r.kt)("p",null,"This hook returns an array with 3 elements:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"event: this contains all the information about any observation, reward, or message we've received this tick. We will use this to see what plays we and the computer made.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"startTrial: this is a function which takes no arguments, and is a very simple way to start a new trial with our player actor.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"sendAction: this is a function which takes an argument of type 'Action'. This class can be imported from data_pb.js, but we'll see that later in this tutorial."))),(0,r.kt)("p",null,"This hook takes in 3 arguments:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"cogSettings: this is what's imported from CogSettings.js. It provides all the relevant information about data.proto to this hook so that it can function.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"actorName: the name of the human actor which this web client will be representing. This is defined in cogment.yaml.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"actorClass: the class of the human actor which this web client will be representing. This is defined in cogment.yaml."))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'export const App = () => {\n    const [event, startTrial, sendAction] = useActions(\n        cogSettings,\n        "player_1",\n        "player"\n    );\n\n    //Function to construct the Action which the player will send when they click either rock, paper, or scissors\n    const choose = (move) => {\n        const action = new PlayerAction();\n        action.setMove(move);\n        sendAction(action);\n    };\n\n    //This will start a trial as soon as we\'re connected to the orchestrator\n    useEffect(() => {\n        if (startTrial) startTrial();\n    }, [startTrial]);\n\n    //Get any observation from the current event, events have observations, messages, and rewards, and all three can be unpacked from the event object\n    //We will also unpack a helpful variable called \'last\', this will allow us to know when the trial has ended\n    const { observation, last } = event;\n\n    const [gameState, setGameState] = useState({\n        gameStage: "start",\n        roundIndex: 0,\n        lastMoveComputer: 0,\n        lastMoveHuman: 0,\n    });\n    const [firstObservation, setFirstObservation] = useState(true);\n\n    useEffect(() => {\n        //Parse game state out of the observation\n        //Some events don\'t contain an observation, so we need to store the observation contents in a state\n        if (!observation) return;\n\n        //The first observation is not useful, as it just contains the default game state, before players have made moves\n        if (firstObservation) {\n            setFirstObservation(false);\n            return;\n        }\n\n        //Get all relevant information from the observation\n        const roundIndex = gameState.roundIndex + 1;\n        const gameStage = "playing";\n        const lastMoveComputer = observation.them.lastMove;\n        const lastMoveHuman = observation.me.lastMove;\n        const lastWonComputer = observation.them.wonLast;\n        const lastWonHuman = observation.me.wonLast;\n\n        setGameState({\n            gameStage,\n            roundIndex,\n            lastMoveComputer,\n            lastMoveHuman,\n            lastWonComputer,\n            lastWonHuman,\n        });\n        // eslint-disable-next-line react-hooks/exhaustive-deps\n    }, [observation]);\n\n    //The layout of the page\n    return (\n        <Box>\n            {/*\n        Tell the player everything we know about the trial state, such as, plays, who won, etc...\n      */}\n            <Typography>Game stage: {gameState.gameStage}</Typography>\n            <Typography>\n                Human\'s move:{" "}\n                {gameState.gameStage !== "start" &&\n                    getMoveText(gameState.lastMoveHuman)}\n            </Typography>\n            <Typography>\n                Computer\'s move:{" "}\n                {gameState.gameStage !== "start" &&\n                    getMoveText(gameState.lastMoveComputer)}\n            </Typography>\n            <Typography>\n                Did Human win last round?{" "}\n                {observation && gameState.lastWonHuman ? "Yes" : "No"}\n            </Typography>\n            <Typography>\n                Did Computer win last round?{" "}\n                {observation && gameState.lastWonComputer ? "Yes" : "No"}\n            </Typography>\n            <Button onClick={() => choose(0)}>Rock</Button>\n            <Button onClick={() => choose(1)}>Paper</Button>\n            <Button onClick={() => choose(2)}>Scissors</Button>\n        </Box>\n    );\n};\n')),(0,r.kt)("h2",{id:"hooksuseactionsjs"},"hooks/useActions.js"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"NOTE: This section needs to be updated for Cogment 2.0, and will only work with Cogment versions 1.x")),(0,r.kt)("p",null,"This hook does multiple things. It starts a trial, joins a trial, sends actions, and receives information from the orchestrator. The following is its annotated code:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'import { Context } from "@cogment/cogment-js-sdk";\nimport { useEffect, useState } from "react";\n\nexport const useActions = (cogSettings, actorName, actorClass) => {\n    const [event, setEvent] = useState({\n        observation: null,\n        actions: null,\n        messages: null,\n        rewards: null,\n        type: null,\n        last: false,\n    });\n\n    const [startTrial, setStartTrial] = useState(null);\n    const [sendAction, setSendAction] = useState(null);\n\n    //Set up the connection and register the actor only once, regardless of re-rendering\n    useEffect(() => {\n        const context = new Context(cogSettings, actorName);\n\n        context.registerActor(\n            async (actorSession) => {\n                actorSession.start();\n\n                //Double arrow function here beause react will turn a single one into a lazy loaded function\n                setSendAction(() => (action) => {\n                    actorSession.doAction(action);\n                });\n\n                for await (const event of actorSession.eventLoop()) {\n                    const eventUseActions = event;\n\n                    eventUseActions.last = event.type === 3;\n\n                    setEvent(eventUseActions);\n                }\n            },\n            actorName,\n            actorClass\n        );\n\n        const endpoint =\n            window.location.protocol +\n            "//" +\n            window.location.hostname +\n            ":8080";\n        const controller = context.getController(endpoint);\n\n        //Need to output a function so that the user can start the trial when all actors are connected\n        //Again, double arrow function cause react will turn a single one into a lazy loaded function\n        setStartTrial(() => async () => {\n            const trialId = await controller.startTrial();\n            await context.joinTrial(trialId, endpoint, actorName);\n        });\n    }, [cogSettings, actorName, actorClass]);\n\n    return [event, startTrial, sendAction];\n};\n')),(0,r.kt)("p",null,"Please note that the ",(0,r.kt)("inlineCode",{parentName:"p"},"useActions")," hook is generated by ",(0,r.kt)("inlineCode",{parentName:"p"},"cogment init"),". We've still gone through it in this tutorial, because that is where most of the Cogment related code is contained, and it must be understood if we want to use Cogment without React.JS."),(0,r.kt)("p",null,"We also need to add the following to ",(0,r.kt)("inlineCode",{parentName:"p"},"web-client/.eslintignore"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"src/*_pb*\nsrc/cog_settings*\n")),(0,r.kt)("p",null,"Normally this file will be created by ",(0,r.kt)("inlineCode",{parentName:"p"},"cogment init"),", but if you have been following the tutorial step-by-step, you need to create it manually."),(0,r.kt)("p",null,"You can now see our app fully functional by going to the folder where our cogment.yaml sits, and running the commands:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ cogment run build\n$ cogment run start\n")),(0,r.kt)("p",null,"And opening up localhost:3000 in our browser."),(0,r.kt)("p",null,"And with that we're done!"),(0,r.kt)("h2",{id:"making-it-look-good"},"Making it look good"),(0,r.kt)("p",null,"If we want a fancier interface, there is a completed UI in the tutorials repository that we can copy into our project. Then, along with some style code that can be found in the repository version of App.js, just replace the return statement from App.js with the following:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<Box>\n    <Header observation={observation} gameState={gameState} />\n    <Container className={classes.container}>\n        <Player\n            score={humanScore}\n            color={theme.palette.primary.main}\n            IconClass={PersonIcon}\n            choose={choose}\n            isHuman\n        />\n\n        <Player\n            score={computerScore}\n            color={theme.palette.secondary.main}\n            IconClass={ComputerIcon}\n            selected={\n                gameState !== "start" &&\n                getMoveText(observation.them.lastRoundMove)\n            }\n        />\n    </Container>\n</Box>\n')))}m.isMDXComponent=!0}}]);