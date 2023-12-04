"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[8172],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>u});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},m=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},h="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),h=p(n),d=o,u=h["".concat(l,".").concat(d)]||h[d]||c[d]||i;return n?a.createElement(u,r(r({ref:t},m),{},{components:n})):a.createElement(u,r({ref:t},m))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[h]="string"==typeof e?e:o,r[1]=s;for(var p=2;p<i;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9208:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var a=n(7462),o=(n(7294),n(3905));const i={title:"Step 3 - The Environment in Cogment"},r="The Environment: A Game of RPS",s={unversionedId:"guide/tutorial/environment-in-cogment",id:"guide/tutorial/environment-in-cogment",title:"Step 3 - The Environment in Cogment",description:"In this step of the tutorial, we will look at what is needed to define the Environment in which Actors operate. Our goal in this section is to implement the rules for how the Environment responds to the actions at each step and produces new Observations for the Actors.",source:"@site/docs/guide/tutorial/3-environment-in-cogment.md",sourceDirName:"guide/tutorial",slug:"/guide/tutorial/environment-in-cogment",permalink:"/docs/guide/tutorial/environment-in-cogment",draft:!1,tags:[],version:"current",lastUpdatedAt:1696019767,formattedLastUpdatedAt:"Sep 29, 2023",sidebarPosition:3,frontMatter:{title:"Step 3 - The Environment in Cogment"},sidebar:"docSidebar",previous:{title:"Step 2 - Actors in Cogment",permalink:"/docs/guide/tutorial/actors-in-cogment"},next:{title:"Step 4 - Making Decisions with Feedback",permalink:"/docs/guide/tutorial/decision-making"}},l={},p=[{value:"What does Cogment need to know about the Environment?",id:"what-does-cogment-need-to-know-about-the-environment",level:2},{value:"Defining the Environment Service",id:"defining-the-environment-service",level:2},{value:"Defining the Environment Implementation",id:"defining-the-environment-implementation",level:2},{value:"Implementing the rules of the game",id:"implementing-the-rules-of-the-game",level:2},{value:"The Initialization Block: Creating the First Observations for Each Player",id:"the-initialization-block-creating-the-first-observations-for-each-player",level:3},{value:"The Event Loop: Creating New Observations in Response to Player Actions",id:"the-event-loop-creating-new-observations-in-response-to-player-actions",level:3},{value:"The termination block: reporting on what happened in the game",id:"the-termination-block-reporting-on-what-happened-in-the-game",level:3},{value:"Modifying the Environment Implementation to end the game",id:"modifying-the-environment-implementation-to-end-the-game",level:2},{value:"Modifying the Trial Runner to receive the termination signal from the Environment",id:"modifying-the-trial-runner-to-receive-the-termination-signal-from-the-environment",level:2}],m={toc:p},h="wrapper";function c(e){let{components:t,...i}=e;return(0,o.kt)(h,(0,a.Z)({},m,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"the-environment-a-game-of-rps"},"The Environment: A Game of RPS"),(0,o.kt)("p",null,"In this step of the tutorial, we will look at what is needed to define the Environment in which Actors operate. Our goal in this section is to implement the rules for how the Environment responds to the actions at each step and produces new Observations for the Actors."),(0,o.kt)("h2",{id:"what-does-cogment-need-to-know-about-the-environment"},"What does Cogment need to know about the Environment?"),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"/docs/guide/core-concepts#environment"},"Environment")," is the world in which Actors will operate. In the most general terms, we can think of the Environment as being the set of all possible states the world can be in, and the rules which determine the consequences of taking specific actions in these states. For RPS, the Environment can be fully specified by setting which states are possible (the different combinations of ",(0,o.kt)("inlineCode",{parentName:"p"},"ROCK"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"PAPER")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"SCISSORS")," from each Actor), and the rules for what happens when we observe each pair."),(0,o.kt)("p",null,"To fully specify the Environment in Cogment, we need to define what the Environment is (eg. what makes an RPS game), how computes the outcome of player actions, and where those computations are run."),(0,o.kt)("p",null,"To better understand how Cogment thinks of the Environment component, we use the following terminology (similar to that used for Actors):"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("strong",{parentName:"li"},"Environment Service")," is a designated node for taking care of the computations made by the Environment. This is ",(0,o.kt)("em",{parentName:"li"},"where")," the Environment computations happen. The Environment Service is launched by ",(0,o.kt)("inlineCode",{parentName:"li"},"environment/main.py")," on the TCP port set by the ",(0,o.kt)("inlineCode",{parentName:"li"},"ENVIRONMENT_PORT")," variable in the ",(0,o.kt)("inlineCode",{parentName:"li"},".env")," file."),(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("strong",{parentName:"li"},"Environment Implementation")," is the function that specifies the rules of the game. The implementation takes actions as inputs and produces observations as outputs. This is ",(0,o.kt)("em",{parentName:"li"},"how")," the Environment operations work. The Environment implementation function we will use is ",(0,o.kt)("inlineCode",{parentName:"li"},"rps_environment")," defined in ",(0,o.kt)("inlineCode",{parentName:"li"},"environment/main.py"))),(0,o.kt)("p",null,"Notice that we don't use a class to define ",(0,o.kt)("em",{parentName:"p"},"what")," the Environment does, as we did for the Actors. The specification is still made in the ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment.yaml")," file, but instead we define what an RPS game is with the ",(0,o.kt)("inlineCode",{parentName:"p"},"EnvironmentConfig")," message type from the ",(0,o.kt)("inlineCode",{parentName:"p"},"data.proto"),". You can look in ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment.yaml")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"data.proto")," to see, but so far the message is still empty. We will add the necessary information to the message later in this step of the tutorial."),(0,o.kt)("h2",{id:"defining-the-environment-service"},"Defining the Environment Service"),(0,o.kt)("p",null,"Let's look at ",(0,o.kt)("inlineCode",{parentName:"p"},"environment/main.py")," to see how Cogment sets up the Environment."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Registering environment service with Cogment",src:n(1676).Z,width:"1592",height:"388"}),"\nThe code is very similar to what we saw previously for the Actor service: The ",(0,o.kt)("inlineCode",{parentName:"p"},"main()")," function first initializes a ",(0,o.kt)("a",{parentName:"p",href:"https://cogment.ai/docs/reference/python#class-cogmentcontext"},"context")," in which the Environment will be registered. When registering the Environment in the context, we use the ",(0,o.kt)("inlineCode",{parentName:"p"},"register_environment")," method which takes only an implementation. Here we will use the ",(0,o.kt)("inlineCode",{parentName:"p"},"rps_environment")," function (also defined in ",(0,o.kt)("inlineCode",{parentName:"p"},"environment/main.py"),", more on this in a moment) as our implementation."),(0,o.kt)("p",null,"Then, the ",(0,o.kt)("inlineCode",{parentName:"p"},"main()")," function will start the Environment service on the appropriate port, and awaits the termination of the service."),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Ports for running services are specified in the ",(0,o.kt)("inlineCode",{parentName:"p"},".env")," file, loaded by the ",(0,o.kt)("inlineCode",{parentName:"p"},".run.sh")," script, and retrieved by the ",(0,o.kt)("inlineCode",{parentName:"p"},"os")," package to make the variable available to Python. To change the port this service uses, update the",(0,o.kt)("inlineCode",{parentName:"p"},".env")," file in the root level of the ",(0,o.kt)("inlineCode",{parentName:"p"},"rps")," directory rather than changing ",(0,o.kt)("inlineCode",{parentName:"p"},"main.py"),".")),(0,o.kt)("h2",{id:"defining-the-environment-implementation"},"Defining the Environment Implementation"),(0,o.kt)("p",null,"The implementation function, called ",(0,o.kt)("inlineCode",{parentName:"p"},"rps_environment")," here, is structured similarly to the Actor's implementation."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Defining the Environment Implementation function",src:n(8986).Z,width:"1750",height:"1628"})),(0,o.kt)("p",null,"Similar to the Actor implementation, there are three parts to the Environment implementation:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("strong",{parentName:"li"},"initialization")," block, where we can set variables that are important to know before the session starts. Later in this step of the tutorial, we will set up the initialization block to keep track of some stats about previous actions taken and which player won/lost each round."),(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("strong",{parentName:"li"},"event loop"),", which specifies how the environment produces observations based on the Actors' actions."),(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("strong",{parentName:"li"},"termination")," block, i.e. what happens after all the events have occurred. Here we'll use the termination block to print out some information about what happened between the players during a round of play.")),(0,o.kt)("p",null,"As with the Actor implementation, the Environment implementation takes as an argument the ",(0,o.kt)("a",{parentName:"p",href:"/docs/reference/python#class-environmentsession--session-"},"Environment session"),", which allows the Orchestrator to manage all the data associate with the Environment's operations in the trial."),(0,o.kt)("p",null,"Note that the Environment implementation makes use of the ",(0,o.kt)("inlineCode",{parentName:"p"},"Observation")," the data structure defined in ",(0,o.kt)("inlineCode",{parentName:"p"},"data.proto")," defining the actors observation space, but so far it is just empty - we have not yet provided any data to populate the ",(0,o.kt)("inlineCode",{parentName:"p"},"Observation")," message."),(0,o.kt)("h2",{id:"implementing-the-rules-of-the-game"},"Implementing the rules of the game"),(0,o.kt)("p",null,"We will first need to bring in the relevant datastructures into the ",(0,o.kt)("inlineCode",{parentName:"p"},"environment/main.py")," file so that our Environment implementation can work with the same action space and can create the bservations in the format the Actors expect to receive. We can see in ",(0,o.kt)("inlineCode",{parentName:"p"},"environment/main.py")," that we have already imported the ",(0,o.kt)("inlineCode",{parentName:"p"},"Observation")," data structure."),(0,o.kt)("p",null,"If we look at the definition of the ",(0,o.kt)("inlineCode",{parentName:"p"},"Observation")," message in the ",(0,o.kt)("inlineCode",{parentName:"p"},"data.proto"),", we see that it stores two fields of ",(0,o.kt)("inlineCode",{parentName:"p"},"PlayerState")," information: one field keeping track of the player itself and one keeping track of its opponent. This means in order to create the correct type of ",(0,o.kt)("inlineCode",{parentName:"p"},"Observation")," messages, we will also need to import the ",(0,o.kt)("inlineCode",{parentName:"p"},"PlayerState")," data structure to ",(0,o.kt)("inlineCode",{parentName:"p"},"environment/main.py"),". We will also need to import the types of moves that can be made so that we can define the relationships between them."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},'In the "Imports" section at the top of the file, add the following:')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"from data_pb2 import PlayerState, ROCK, PAPER, SCISSORS\n")),(0,o.kt)("p",null,"Next we can define a mapping between each move and the move that it defeats - this is basically all of the information necessary to establish the rules of the game. ",(0,o.kt)("strong",{parentName:"p"},'In the "Settings" section, add the following:')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"DEFEATS = {\n    ROCK: PAPER,\n    SCISSORS: ROCK,\n    PAPER: SCISSORS\n}\n")),(0,o.kt)("p",null,'You may have played RPS in which the winner is "best of N rounds" - for example, you must beat your opponent in 2 out of 3 rounds to win the game. We will want the Environment implementation to keep track of the number of rounds played and won by each of the two players so that we can know when to call a winner. Here we will create a simple ',(0,o.kt)("inlineCode",{parentName:"p"},"state")," data structure in the ",(0,o.kt)("inlineCode",{parentName:"p"},"rps_environment")," initialization block to keep track of how often each of players wins a round during the trial. Later we will set up how many successful rounds constitute winning the game. ",(0,o.kt)("strong",{parentName:"p"},"Add the following code to the initialization block of the Environment implementation function (before the event loop):")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'state = {\n    "rounds_count": 0,\n    "p1": {\n        "score": 0\n    },\n    "p2": {\n        "score": 0\n    },\n}\n')),(0,o.kt)("h3",{id:"the-initialization-block-creating-the-first-observations-for-each-player"},"The Initialization Block: Creating the First Observations for Each Player"),(0,o.kt)("p",null,"When we start a Trial, each player will need an initial ",(0,o.kt)("inlineCode",{parentName:"p"},"Observation")," from the Environment. The ",(0,o.kt)("inlineCode",{parentName:"p"},"Observation")," message tracks what each player's last move was and whether they won or lost the previous round, so we will have to set these by hand to start. ",(0,o.kt)("strong",{parentName:"p"},"Add the following code to the initialization block:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"p1_state = PlayerState(won_last=False, last_move=None)\np2_state = PlayerState(won_last=False, last_move=None)\nenvironment_session.start([\n    (p1.actor_name, Observation(me=p1_state, them=p2_state)),\n    (p2.actor_name, Observation(me=p2_state, them=p1_state)),\n])\n")),(0,o.kt)("p",null,"This code does the following:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Sets the initial state for each of the two Actors - neither won last game nor had a last move"),(0,o.kt)("li",{parentName:"ul"},"Calls for the session to start, which tells the Orchestrator to send an initial observation is sent to all actors. Each actor is given the appropriate ",(0,o.kt)("inlineCode",{parentName:"li"},"Observation")," constructed with the correct initial ",(0,o.kt)("inlineCode",{parentName:"li"},"PlayerState")," messages. One instance of ",(0,o.kt)("inlineCode",{parentName:"li"},"PlayerState")," per player is created, each is used as the ",(0,o.kt)("inlineCode",{parentName:"li"},"me")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"them")," state of each player's ",(0,o.kt)("inlineCode",{parentName:"li"},"Observation"))),(0,o.kt)("h3",{id:"the-event-loop-creating-new-observations-in-response-to-player-actions"},"The Event Loop: Creating New Observations in Response to Player Actions"),(0,o.kt)("p",null,"In the ",(0,o.kt)("strong",{parentName:"p"},"event loop")," we implement how the Environment produces the next Observations in response to the Actor's actions. We need to retrieve each player's action and determine which player won the round. Then, we update the internal ",(0,o.kt)("inlineCode",{parentName:"p"},"state"),". Finally, we produce up-to-date observations for the players."),(0,o.kt)("p",null,"So far, we have printed the actions the Environment received from each player, but these are the ",(0,o.kt)("inlineCode",{parentName:"p"},"PlayerAction")," data structures. What we actually want to work with is the ",(0,o.kt)("inlineCode",{parentName:"p"},".move")," attribute, which stores the index of the action that was taken. We'll use this ",(0,o.kt)("inlineCode",{parentName:"p"},"move")," attribute to determine which of the two players wins. If the two players had the same move, nobody wins. We'll also keep track of this in our ",(0,o.kt)("inlineCode",{parentName:"p"},"state")," object. ",(0,o.kt)("strong",{parentName:"p"},"Add the following code below your print statements:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'# Compute who wins, if the two players had the same move, nobody wins\np1_state = PlayerState(\n    won_last=p1_action.move == DEFEATS[p2_action.move],\n    last_move=p1_action.move\n)\np2_state = PlayerState(\n    won_last=p2_action.move == DEFEATS[p1_action.move],\n    last_move=p2_action.move\n)\n\n# keep track of winner/loser of each round\nstate["rounds_count"] += 1\nif p1_state.won_last:\n    state["p1"]["score"] += 1\n    print(f"{p1.actor_name} wins!")\nelif p2_state.won_last:\n    state["p2"]["score"] += 1\n    print(f"{p2.actor_name} wins!")\nelse:\n    print(f"draw.")\n')),(0,o.kt)("p",null,"This code computes for each player whether they won or lost, based on how their move compared to their opponents move by the hierarchy of moves specified in the ",(0,o.kt)("inlineCode",{parentName:"p"},"DEFEATS")," dictionary. We then log it in the ",(0,o.kt)("inlineCode",{parentName:"p"},"state")," dictionary object defined in the initialization block."),(0,o.kt)("p",null,"Finally, we need to construct the new Observation from these new player states, and pass this information along to the Actors if the trial is still active (eg. if the game hasn't ended). ",(0,o.kt)("strong",{parentName:"p"},"To do this, add the following code to the event loop:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"    # produce observation of updated state (computed above)\n    observations = [\n        (p1.actor_name, Observation(me=p1_state, them=p2_state)),\n        (p2.actor_name, Observation(me=p2_state, them=p1_state)),\n    ]\n    if event.type == cogment.EventType.ACTIVE:\n        # The trial is active\n        environment_session.produce_observations(observations)\n    else:\n        # The trial termination has been requested\n        environment_session.end(observations)\n")),(0,o.kt)("h3",{id:"the-termination-block-reporting-on-what-happened-in-the-game"},"The termination block: reporting on what happened in the game"),(0,o.kt)("p",null,"Finally, we will add some statements to the termination block to present a read-out about what happened in the Trial. ",(0,o.kt)("strong",{parentName:"p"},"In the termination block, replace the ",(0,o.kt)("inlineCode",{parentName:"strong"},'print("environment end")')," with:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"print(f\"Trial {environment_session.get_trial_id()} ended:\")\nprint(f\"\\t * {state['rounds_count']} rounds played\")\nprint(f\"\\t * {p1.actor_name} won {state['p1']['score']} rounds\")\nprint(f\"\\t * {p2.actor_name} won {state['p2']['score']} rounds\")\nprint(f\"\\t * {state['rounds_count'] - state['p1']['score'] - state['p2']['score']} draws\", flush=True)\n")),(0,o.kt)("p",null,"Note we add a ",(0,o.kt)("inlineCode",{parentName:"p"},"flush=True")," to the last print call to flush the data buffer so our output actually gets printed before the service gets terminated."),(0,o.kt)("p",null,"We now have an Environment implementation that will properly construct Observations to pass to the Actors, meaning we have fully defined all the inputs and outputs necessary for the sequential interaction between the Actor and Environment components to play rounds of RPS. However, RPS is usually played in games won by the player reaching a target score, i.e. a number of won rounds."),(0,o.kt)("p",null,"You can ",(0,o.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/setup#building-and-running-the-app"},"install and run")," the application to test your Environment implementation. Given the nature of the game and the fact that the Actors don't actually use the Observation information in any meaningful way, we expect Bob to win around 1/3 of the time, Alice to win 1/3 of the time, and the remaining 1/3 to be draws."),(0,o.kt)("h1",{id:"configuring-the-environment-how-many-successful-rounds-to-win-the-game"},"Configuring the Environment: How many successful rounds to win the game?"),(0,o.kt)("p",null,'We hinted earlier that RPS is not about single, disconnected rounds, but in playing a "best of N" game. Here we will show how the Environment can be configured with parameters. Setting up the game this way will also be useful later when we make an Actor implementation that can meaningfully use the information in the Observations to pick an action with some strategy, rather than randomly.'),(0,o.kt)("p",null,"We want to set up the Environment so that a trial is complete when one of the two players has won enough rounds. ",(0,o.kt)("strong",{parentName:"p"},"We can do this by adding a parameter to our previously empty ",(0,o.kt)("inlineCode",{parentName:"strong"},"EnvironmentConfig")," message in the ",(0,o.kt)("inlineCode",{parentName:"strong"},"data.proto")," file:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-protobuf"},"message EnvironmentConfig {\n  int32 target_score = 1;\n}\n")),(0,o.kt)("p",null,"This data structure is referenced within ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment.yaml")," in the ",(0,o.kt)("inlineCode",{parentName:"p"},"environment.config_type")," to define how the Environment is configured (you may think of it as similar to how the Actor classes were specified in the ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment.yaml")," file). Note that the ",(0,o.kt)("inlineCode",{parentName:"p"},"target_score")," above is just the first argument to the ",(0,o.kt)("inlineCode",{parentName:"p"},"EnvironmentConfig")," message -- we will set its value when we configure the Environment for the Trial."),(0,o.kt)("p",null,"If we open ",(0,o.kt)("inlineCode",{parentName:"p"},"trial_runner/main.py")," we will see that we pass an empty ",(0,o.kt)("inlineCode",{parentName:"p"},"EnvironmentConfig")," when setting up the Environment in the Trial Runner. We can modify this function to set a value for the ",(0,o.kt)("inlineCode",{parentName:"p"},"target_score")," which a player will need to reach before the game ends. ",(0,o.kt)("strong",{parentName:"p"},"Modify the ",(0,o.kt)("inlineCode",{parentName:"strong"},"EnvironmentConfig")," in the Trial Runner to be the following:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"env_config = EnvironmentConfig(\n    target_score = 5\n)\n")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Note that whenever we make a modification to the ",(0,o.kt)("inlineCode",{parentName:"p"},"data.proto")," file, we will need to re-run ",(0,o.kt)("inlineCode",{parentName:"p"},"./run.sh install")," to regenerate the ",(0,o.kt)("inlineCode",{parentName:"p"},"data_pb2.py")," file which the Python SDK uses for the implementations.")),(0,o.kt)("h2",{id:"modifying-the-environment-implementation-to-end-the-game"},"Modifying the Environment Implementation to end the game"),(0,o.kt)("p",null,"We now need to modify the Environment implementation to handle counting the number of rounds won, and executing the termination of the Trial once the ",(0,o.kt)("inlineCode",{parentName:"p"},"target_score")," has been reached."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"In the initialization block of the ",(0,o.kt)("inlineCode",{parentName:"strong"},"rps_environment")," implementation function in ",(0,o.kt)("inlineCode",{parentName:"strong"},"environment/main.py"),", add the following:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"# Default target score\nif environment_session.config is not None and environment_session.config.target_score >= 0:\n    target_score = environment_session.config.target_score\nelse:\n    target_score = 3\n")),(0,o.kt)("p",null,"The above code retrieves the value of the ",(0,o.kt)("inlineCode",{parentName:"p"},"target_score")," from the environment's configuration and sets a default value in case nothing is specified. When we configured the trial, we set the ",(0,o.kt)("inlineCode",{parentName:"p"},"target_score")," to be 5, but if the ",(0,o.kt)("inlineCode",{parentName:"p"},"environment_session")," doesn't have the right configuration details, the ",(0,o.kt)("inlineCode",{parentName:"p"},"target_score")," will be set to 3 by the Environment itself."),(0,o.kt)("p",null,"We also want the Environment to request the end of the Trial when this target score has been reached. ",(0,o.kt)("strong",{parentName:"p"},"In the event block, let's modify the code which handles the end of the game (eg. replace the check that the ",(0,o.kt)("inlineCode",{parentName:"strong"},"event.type==cogment.EventType.ACTIVE"),") to be:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'# handle end of game\nif state["p1"]["score"] >= target_score:\n    # p1 won\n    environment_session.end(observations)\nelif state["p2"]["score"] >= target_score:\n    # p2 won\n    environment_session.end(observations)\nelse:\n    # target score is not reached, continue sending observations to actors\n    environment_session.produce_observations(observations)\n')),(0,o.kt)("h2",{id:"modifying-the-trial-runner-to-receive-the-termination-signal-from-the-environment"},"Modifying the Trial Runner to receive the termination signal from the Environment"),(0,o.kt)("p",null,"Previously, the Trial Runner handled the termination of the Trial after 5 seconds. Now we want the Environment to handle the termination of the trial, so we need to modify the Trial Runner code to support this."),(0,o.kt)("p",null,"If we look at the ",(0,o.kt)("inlineCode",{parentName:"p"},"trial_runner/main.py")," file, we will see that the Trial Runner gets the ",(0,o.kt)("inlineCode",{parentName:"p"},"trial_id")," from the controller's ",(0,o.kt)("inlineCode",{parentName:"p"},"start_trial")," method. Because of the asynchronous nature of how these services run, we will need to initiate a function to listen for the trial's end ",(0,o.kt)("em",{parentName:"p"},"before")," we have initiated the trial start. This means we will need to know the ",(0,o.kt)("inlineCode",{parentName:"p"},"trial_id")," ahead of time, so when we call ",(0,o.kt)("inlineCode",{parentName:"p"},"start_trial")," we will pass it our chosen ",(0,o.kt)("inlineCode",{parentName:"p"},"trial_id")," as an argument."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"In ",(0,o.kt)("inlineCode",{parentName:"strong"},"trial_runner/main.py")," we'll change the way the Trial Runner starts the trials to the following:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'# set the name of the trial we want to be listening for\ntrial_id=f"rps-{datetime.datetime.now().isoformat()}"\n\n# Listening for ended trials\nasync def await_trial():\n    async for trial_info in controller.watch_trials(trial_state_filters=[cogment.TrialState.ENDED]):\n        if trial_info.trial_id == trial_id:\n            break\nawait_trial_task = asyncio.create_task(await_trial())\n\n# Start a new trial using the trial params we just created\ntrial_id = await controller.start_trial(trial_id_requested=trial_id, trial_params=trial_params)\nprint(f"Trial \'{trial_id}\' started")\n\n# Wait for the trial to end\nawait await_trial_task\nprint(f"Trial \'{trial_id}\' ended")\n')),(0,o.kt)("p",null,"The above code sets the ID of the trial, then defines how to use ",(0,o.kt)("a",{parentName:"p",href:"/docs/reference/python#async-watchtrialsself-trialstatefilters-fullinfofalse"},(0,o.kt)("inlineCode",{parentName:"a"},"controller.watch_trials"))," that will listen for the Environment to terminate the trial. It starts the trial with the specified ID, and then watches for the trial end."),(0,o.kt)("p",null,"We can now ",(0,o.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/setup#building-and-running-the-app"},"install and run")," the application to see that this works as expected. Bob and Alice play a single game of RPS which ends when one of the two players reaches the target number of rounds."),(0,o.kt)("details",null,(0,o.kt)("summary",null,(0,o.kt)("b",null,(0,o.kt)("span",{style:{fontSize:"20px"}},"Quick Summary"))),(0,o.kt)("p",null,"We learned about how Cogment represents the Environment through its implementation and configuration."),(0,o.kt)("p",null,"We set up the necessary components in ",(0,o.kt)("inlineCode",{parentName:"p"},"environment/main.py")," to specify the rules of RPS, namely:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"\nfrom data_pb2 import PlayerState, ROCK, PAPER, SCISSORS\nDEFEATS = {\n    ROCK: PAPER,\n    SCISSORS: ROCK,\n    PAPER: SCISSORS\n}\n")),(0,o.kt)("p",null,"In the initialWe added a data structure to keep track of statistics over a number of rounds:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'state = {\n    "rounds_count": 0,\n    "p1": {\n        "score": 0\n    },\n    "p2": {\n        "score": 0\n    },\n}\n')),(0,o.kt)("p",null,"We constructed initial observations, and started the Environment session to pass these to each Actor:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"p1_state = PlayerState(won_last=False, last_move=None)\np2_state = PlayerState(won_last=False, last_move=None)\nenvironment_session.start([\n    (p1.actor_name, Observation(me=p1_state, them=p2_state)),\n    (p2.actor_name, Observation(me=p2_state, them=p1_state)),\n])\n")),(0,o.kt)("p",null,"In the event block, we evaluated what each of the Actors did, who won, and stored this information in our ",(0,o.kt)("inlineCode",{parentName:"p"},"state")," data structure."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'# Compute who wins, if the two players had the same move, nobody wins\np1_state = PlayerState(\n    won_last=p1_action.move == DEFEATS[p2_action.move],\n    last_move=p1_action.move\n)\np2_state = PlayerState(\n    won_last=p2_action.move == DEFEATS[p1_action.move],\n    last_move=p2_action.move\n)\n\n# keep track of winner/loser of each round\nstate["rounds_count"] += 1\nif p1_state.won_last:\n    state["p1"]["score"] += 1\n    print(f"{p1.actor_name} wins!")\nelif p2_state.won_last:\n    state["p2"]["score"] += 1\n    print(f"{p2.actor_name} wins!")\nelse:\n    print(f"draw.")\n')),(0,o.kt)("p",null,"We constructed new Observations and had the Environment session pass this information to each Actor."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"    # produce observation of updated state (computed above)\n    observations = [\n        (p1.actor_name, Observation(me=p1_state, them=p2_state)),\n        (p2.actor_name, Observation(me=p2_state, them=p1_state)),\n    ]\n    if event.type == cogment.EventType.ACTIVE:\n        # The trial is active\n        environment_session.produce_observations(observations)\n    else:\n        # The trial termination has been requested\n        environment_session.end(observations)\n")),(0,o.kt)("p",null,"In the termination block, we printed a summary of the rounds played up to the point of termination:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"print(f\"Trial {environment_session.get_trial_id()} ended:\")\nprint(f\"\\t * {state['rounds_count']} rounds played\")\nprint(f\"\\t * {p1.actor_name} won {state['p1']['score']} rounds\")\nprint(f\"\\t * {p2.actor_name} won {state['p2']['score']} rounds\")\nprint(f\"\\t * {state['rounds_count'] - state['p1']['score'] - state['p2']['score']} draws\", flush=True)\n")),(0,o.kt)("p",null,"We then set up the Environment to initiate the termination after a set number of rounds had been won by one of the players. We set the ",(0,o.kt)("inlineCode",{parentName:"p"},"EnvironmentConfig")," in the ",(0,o.kt)("inlineCode",{parentName:"p"},"data.proto"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-protobuf"},"message EnvironmentConfig {\n  int32 target_score = 1;\n}\n")),(0,o.kt)("p",null,"We made use of this in ",(0,o.kt)("inlineCode",{parentName:"p"},"trial_runner/main.py")," and passed the correct value to the ",(0,o.kt)("inlineCode",{parentName:"p"},"EnvironmentConfig"),"L"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"env_config = EnvironmentConfig(\n    target_score = 5\n)\n")),(0,o.kt)("p",null,"We then changed the Environment implementation to be aware of the termination condition, or set one if none was provided:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"# Default target score\nif environment_session.config is not None and environment_session.config.target_score >= 0:\n    target_score = environment_session.config.target_score\nelse:\n    target_score = 3\n")),(0,o.kt)("p",null,"We then set the Environment to end the trial when this condition was met:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'# handle end of game\nif state["p1"]["score"] >= target_score:\n    # p1 won\n    environment_session.end(observations)\nelif state["p2"]["score"] >= target_score:\n    # p2 won\n    environment_session.end(observations)\nelse:\n    # target score is not reached, continue sending observations to actors\n    environment_session.produce_observations(observations)\n')),(0,o.kt)("p",null,"Finally, we modified the Trial Runner to listen for end signal from the Environment:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'# set the name of the trial we want to be listening for\ntrial_id=f"rps-{datetime.datetime.now().isoformat()}"\n\n# Listening for ended trials\nasync def await_trial():\n    async for trial_info in controller.watch_trials(trial_state_filters=[cogment.TrialState.ENDED]):\n        if trial_info.trial_id == trial_id:\n            break\nawait_trial_task = asyncio.create_task(await_trial())\n\n# Start a new trial using the trial params we just created\ntrial_id = await controller.start_trial(trial_id_requested=trial_id, trial_params=trial_params)\nprint(f"Trial \'{trial_id}\' started")\n\n# Wait for the trial to end\nawait await_trial_task\nprint(f"Trial \'{trial_id}\' ended")\n'))),(0,o.kt)("p",null,"You have now successfully implemented an Environment which is configured to run a game of RPS until one player has won 5 rounds. The Environment receives the Actors' actions and constructs new Observations. However, since the Actors select actions at random, they are not really using the Observation information in any meaningful way. In the next step of the tutorial, we will modify ",(0,o.kt)("inlineCode",{parentName:"p"},"Bob")," to use the information from the Environment to select actions and see how he performs against ",(0,o.kt)("inlineCode",{parentName:"p"},"Alice"),"."))}c.isMDXComponent=!0},8986:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/environment_implementation_0-fa80380b37d4d5170d55c7dbe3208b62.png"},1676:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/environment_main-1026c4be163c7072c12ccdaeffb78468.png"}}]);