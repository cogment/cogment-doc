"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[264],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>h});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=a.createContext({}),l=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},m=function(e){var t=l(e.components);return a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),c=l(n),h=o,u=c["".concat(p,".").concat(h)]||c[h]||d[h]||i;return n?a.createElement(u,r(r({ref:t},m),{},{components:n})):a.createElement(u,r({ref:t},m))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=c;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:o,r[1]=s;for(var l=2;l<i;l++)r[l]=n[l];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},2175:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var a=n(3117),o=(n(7294),n(3905));const i={},r="Step 2: Implement a first actor and environment",s={unversionedId:"guide/tutorial/random-player",id:"guide/tutorial/random-player",title:"Step 2: Implement a first actor and environment",description:"This part of the tutorial follows step 1, make sure you've gone through it before starting this one. Alternatively, the completed step 1 can be retrieved from the tutorial's repository.",source:"@site/docs/guide/tutorial/2-random-player.md",sourceDirName:"guide/tutorial",slug:"/guide/tutorial/random-player",permalink:"/docs/guide/tutorial/random-player",draft:!1,tags:[],version:"current",lastUpdatedAt:1649768289,formattedLastUpdatedAt:"4/12/2022",sidebarPosition:2,frontMatter:{},sidebar:"docSidebar",previous:{title:"Step 1: Create a new Trial",permalink:"/docs/guide/tutorial/bootstrap-and-data-structures"},next:{title:"Step 3: Rewards",permalink:"/docs/guide/tutorial/rewards"}},p={},l=[{value:"Random player agent",id:"random-player-agent",level:2},{value:"Implementing the rules of the game",id:"implementing-the-rules-of-the-game",level:2}],m={toc:l};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"step-2-implement-a-first-actor-and-environment"},"Step 2: Implement a first actor and environment"),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This part of the tutorial follows ",(0,o.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/bootstrap-and-data-structures"},"step 1"),", make sure you've gone through it before starting this one. Alternatively, the completed step 1 can be retrieved from the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment-tutorial-rps"},"tutorial's repository"),"."))),(0,o.kt)("p",null,"In this step of the tutorial, we will implement the (very simple) decison logic for the random player as well as the base mechanics for RPS, i.e. the rules of the game, in the environment services."),(0,o.kt)("h2",{id:"random-player-agent"},"Random player agent"),(0,o.kt)("p",null,"In the ",(0,o.kt)("inlineCode",{parentName:"p"},"rps")," directory, the ",(0,o.kt)("inlineCode",{parentName:"p"},"random_agent")," directory contains the python implementation for the eponymous service. You'll find a few files here:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"cogment.yaml")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"data.proto")," are copied from the ",(0,o.kt)("inlineCode",{parentName:"li"},"rps")," directory and ",(0,o.kt)("inlineCode",{parentName:"li"},"cog_settings.py")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"data_pb2.py")," are generated from them when running ",(0,o.kt)("inlineCode",{parentName:"li"},"./run.sh build"),", don't edit them here."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"requirements.txt")," is a ",(0,o.kt)("a",{parentName:"li",href:"https://pip.pypa.io/en/stable/reference/pip_install/?highlight=requirements#requirements-file-format"},"pip requirement file")," defining the dependencies of the service. For the moment it only lists ",(0,o.kt)("a",{parentName:"li",href:"https://pypi.org/project/cogment/"},(0,o.kt)("inlineCode",{parentName:"a"},"cogment")),", Cogment's python SDK."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"main.py")," contains the implementation of the service.")),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"To get a better understanding of what happens when running ",(0,o.kt)("inlineCode",{parentName:"p"},"./run.sh build"),", you can take a look at ",(0,o.kt)("inlineCode",{parentName:"p"},"./run.sh")," and in particular to the ",(0,o.kt)("inlineCode",{parentName:"p"},"_py_build")," function that is called on all the python modules directory."),(0,o.kt)("p",{parentName:"div"},"You'll see that it does the following:"),(0,o.kt)("ul",{parentName:"div"},(0,o.kt)("li",{parentName:"ul"},"Load the environment variables defined in ",(0,o.kt)("inlineCode",{parentName:"li"},".env"),","),(0,o.kt)("li",{parentName:"ul"},"Copy ",(0,o.kt)("inlineCode",{parentName:"li"},"cogment.yaml")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"data.proto")," to the module's directory,"),(0,o.kt)("li",{parentName:"ul"},"Create a python virtualenv and activate it,"),(0,o.kt)("li",{parentName:"ul"},"Install the python dependencies defined in ",(0,o.kt)("inlineCode",{parentName:"li"},"requirements.txt"),","),(0,o.kt)("li",{parentName:"ul"},"Run the cogment python code generation tool to generate ",(0,o.kt)("inlineCode",{parentName:"li"},"cog_settings.py")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"data_pb2.py"),".")))),(0,o.kt)("p",null,"Open ",(0,o.kt)("inlineCode",{parentName:"p"},"main.py")," and take a look at the initial content."),(0,o.kt)("p",null,"At the bottom you'll find the ",(0,o.kt)("inlineCode",{parentName:"p"},"main")," function, it initializes Cogment's context, registers the ",(0,o.kt)("inlineCode",{parentName:"p"},"random_agent")," actor's implementation, then starts the service itsef on the tcp port defined by the ",(0,o.kt)("inlineCode",{parentName:"p"},"RANDOM_AGENT_PORT")," environment variable and awaits its termination. All the environment variables for this projects are defined in a ",(0,o.kt)("inlineCode",{parentName:"p"},".env")," file that is loaded by the ",(0,o.kt)("inlineCode",{parentName:"p"},"./run.sh")," script, to change the port this service uses, simply update the ",(0,o.kt)("inlineCode",{parentName:"p"},".env")," file."),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Cogment's python sdk leverages Python's ",(0,o.kt)("a",{parentName:"p",href:"https://docs.python.org/3/library/asyncio-task.html"},"asynchronous features"),", you'll need a basic understanding of them."))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'async def main():\n    print(f"Random agent service starting on port {PORT}...")\n\n    context = cogment.Context(cog_settings=cog_settings, user_id="rps")\n    context.register_actor(\n        impl=random_agent,\n        impl_name="random_agent",\n        actor_classes=["player",])\n\n    await context.serve_all_registered(cogment.ServedEndpoint(port=PORT), prometheus_port=0)\n')),(0,o.kt)("p",null,"At the beginning of the file, the function ",(0,o.kt)("inlineCode",{parentName:"p"},"random_agent")," is the actor's implementation. This function is called once per actor and per trial and handles the full lifetime of the actor."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The actor's ",(0,o.kt)("strong",{parentName:"li"},"initialization"),", before the ",(0,o.kt)("inlineCode",{parentName:"li"},"async for"),". This is where, for example, actor's internal data can be defined before calling ",(0,o.kt)("inlineCode",{parentName:"li"},"actor_session.start()")," to notify that it is ready,"),(0,o.kt)("li",{parentName:"ul"},"Its ",(0,o.kt)("strong",{parentName:"li"},"event loop"),", the content of the ",(0,o.kt)("inlineCode",{parentName:"li"},"async for"),". This is where resides the implementation of the actor's response to various events,"),(0,o.kt)("li",{parentName:"ul"},"Its ",(0,o.kt)("strong",{parentName:"li"},"termination"),", after the ",(0,o.kt)("inlineCode",{parentName:"li"},"async for"),".")),(0,o.kt)("p",null,"The generated implementation is very simple:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"it handles the three main kind of events: ",(0,o.kt)("strong",{parentName:"li"},"observations"),", ",(0,o.kt)("strong",{parentName:"li"},"rewards")," and ",(0,o.kt)("strong",{parentName:"li"},"messages"),","),(0,o.kt)("li",{parentName:"ul"},"it does a default ",(0,o.kt)("strong",{parentName:"li"},"action")," whenever required, i.e. in response to an observation.")),(0,o.kt)("p",null,"We will further learn about how to use rewards in ",(0,o.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/rewards"},"step 3")," and observations in ",(0,o.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/heuristic-player"},"step 4"),". Messages are out of the scope for this ",(0,o.kt)("em",{parentName:"p"},"basics")," tutorial."),(0,o.kt)("p",null,"Please note the import and usage of ",(0,o.kt)("inlineCode",{parentName:"p"},"PlayerAction")," which is the data structure from ",(0,o.kt)("inlineCode",{parentName:"p"},"data.proto")," defining the actor's action space."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"async def random_agent(actor_session):\n    actor_session.start()\n\n    async for event in actor_session.all_events():\n        if event.observation:\n            observation = event.observation\n            print(f\"'{actor_session.name}' received an observation: '{observation}'\")\n            if event.type == cogment.EventType.ACTIVE:\n                action = PlayerAction()\n                actor_session.do_action(action)\n        for reward in event.rewards:\n            print(f\"'{actor_session.name}' received a reward for tick #{reward.tick_id}: {reward.value}\")\n        for message in event.messages:\n            print(f\"'{actor_session.name}' received a message from '{message.sender_name}': - '{message.payload}'\")\n")),(0,o.kt)("p",null,"Our goal is to implement an actor playing at random. We first need to import the different ",(0,o.kt)("inlineCode",{parentName:"p"},"Move"),", as defined in our data structures. We also need to import ",(0,o.kt)("inlineCode",{parentName:"p"},"random"),", the python package generating random numbers."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"from data_pb2 import ROCK, PAPER, SCISSORS\n\nimport random\n\nMOVES = [ROCK, PAPER, SCISSORS]\n")),(0,o.kt)("p",null,"Once this is available we can simply update the ",(0,o.kt)("em",{parentName:"p"},"taking decision")," part of the actor's implementation to compute a random move whenever it is needed."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"if event.observation:\n    observation = event.observation\n    print(f\"'{actor_session.name}' received an observation: '{observation}'\")\n    if event.type == cogment.EventType.ACTIVE:\n        action = PlayerAction(move=random.choice(MOVES))\n        actor_session.do_action(action)\n")),(0,o.kt)("p",null,"Modify the ",(0,o.kt)("inlineCode",{parentName:"p"},"random_agent/main.py")," file to include the above additions."),(0,o.kt)("h2",{id:"implementing-the-rules-of-the-game"},"Implementing the rules of the game"),(0,o.kt)("p",null,"In the ",(0,o.kt)("inlineCode",{parentName:"p"},"rps")," directory, the ",(0,o.kt)("inlineCode",{parentName:"p"},"environment")," directory contains the python implementation for the eponymous service. Similarly to the actor's service, you will find a few files here."),(0,o.kt)("p",null,"Open ",(0,o.kt)("inlineCode",{parentName:"p"},"main.py")," and take a look at the initial content."),(0,o.kt)("p",null,"The code is very similar to the ",(0,o.kt)("inlineCode",{parentName:"p"},"random_agent"),"'s. In the ",(0,o.kt)("inlineCode",{parentName:"p"},"main")," function, instead of using ",(0,o.kt)("inlineCode",{parentName:"p"},"register_actor"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"register_environment")," is used. The implementation function, called ",(0,o.kt)("inlineCode",{parentName:"p"},"environment")," here, is structured similarly to the actor's one but handles two kinds of events: ",(0,o.kt)("strong",{parentName:"p"},"actions")," (and the last actions of a trial ",(0,o.kt)("strong",{parentName:"p"},"final_actions"),") and ",(0,o.kt)("strong",{parentName:"p"},"message"),". Environments don't perform actions, they produce observations that are sent to the actors participating in the trial."),(0,o.kt)("p",null,"Please note the import and usage of ",(0,o.kt)("inlineCode",{parentName:"p"},"Observation")," which is the datastructure defined in ",(0,o.kt)("inlineCode",{parentName:"p"},"data.proto")," defining the actors observation space."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'async def environment(environment_session):\n    print(f"Start trial {environment_session.get_trial_id()}")\n\n    # Start the trial and send an initial observation to all actors\n    environment_session.start([("*", Observation())])\n\n    async for event in environment_session.all_events():\n        if event.actions:\n            actions = event.actions\n            print(f"environment received the actions")\n            for actor, recv_action in zip(environment_session.get_active_actors(), actions):\n                print(f" actor \'{actor.actor_name}\' did action \'{recv_action.action}\'")\n            observation = Observation()\n            if event.type == cogment.EventType.ACTIVE:\n                # The trial is active\n                environment_session.produce_observations([("*", observation)])\n            else:\n                # The trial termination has been requested\n                environment_session.end([("*", observation)])\n        for message in event.messages:\n            print(f"environment received a message from \'{message.sender_name}\': - \'{message.payload}\'")\n\n    print("environment end")\n')),(0,o.kt)("p",null,"Our goal, in this section, is to implement how the environment computes the observations from the actions done by the actors at a given timestep."),(0,o.kt)("p",null,"We first import the needed datastructure, define a mapping to be able to print moves and define a dictionary mapping each move to the move that defeats it."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'from data_pb2 import PlayerState, ROCK, PAPER, SCISSORS\n\nMOVES_STR = ["\ud83d\udc4a rock", "\u270b paper", "\u270c\ufe0f scissors"]\n\nDEFEATS = {\n    ROCK: PAPER,\n    SCISSORS: ROCK,\n    PAPER: SCISSORS\n}\n')),(0,o.kt)("p",null,"In the ",(0,o.kt)("strong",{parentName:"p"},"initialization")," phase of the environment implementation, i.e. before the ",(0,o.kt)("inlineCode",{parentName:"p"},"async for"),", we create a simple ",(0,o.kt)("inlineCode",{parentName:"p"},"state")," data structure that is keeping around the number of rounds played and won by each of the two players."),(0,o.kt)("p",null,"We then compute the initial observation for each of the two players. One instance of ",(0,o.kt)("inlineCode",{parentName:"p"},"PlayerState")," per player is created, each is used as the ",(0,o.kt)("inlineCode",{parentName:"p"},"me")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"them")," state of each player's observation."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'state = {\n    "rounds_count": 0,\n    "p1": {\n        "score": 0\n    },\n    "p2": {\n        "score": 0\n    },\n}\nprint(f"Start trial {environment_session.get_trial_id()}")\n[p1, p2] = environment_session.get_active_actors()\np1_state = PlayerState(won_last=False, last_move=None)\np2_state = PlayerState(won_last=False, last_move=None)\nenvironment_session.start([\n    (p1.actor_name, Observation(me=p1_state, them=p2_state)),\n    (p2.actor_name, Observation(me=p2_state, them=p1_state)),\n])\n')),(0,o.kt)("p",null,"In the ",(0,o.kt)("strong",{parentName:"p"},"event loop")," we implement how the environment produces observations based on the actor's actions."),(0,o.kt)("p",null,"We start by retrieving each player's action and computing who won the round. Then, we update the internal ",(0,o.kt)("inlineCode",{parentName:"p"},"state"),". Finally, we produce up-to-date observations for the players."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'if event.actions:\n    [p1_action, p2_action] = [recv_action.action for recv_action in event.actions]\n    print(f"{p1.actor_name} played {MOVES_STR[p1_action.move]}")\n    print(f"{p2.actor_name} played {MOVES_STR[p2_action.move]}")\n\n    # Compute who wins, if the two players had the same move, nobody wins\n    p1_state = PlayerState(\n        won_last=p1_action.move == DEFEATS[p2_action.move],\n        last_move=p1_action.move\n    )\n    p2_state = PlayerState(\n        won_last=p2_action.move == DEFEATS[p1_action.move],\n        last_move=p2_action.move\n    )\n    state["rounds_count"] += 1\n    if p1_state.won_last:\n        state["p1"]["score"] += 1\n        print(f"{p1.actor_name} wins!")\n    elif p2_state.won_last:\n        state["p2"]["score"] += 1\n        print(f"{p2.actor_name} wins!")\n    else:\n        print(f"draw.")\n\n    # Generate and send observations\n    observations = [\n        (p1.actor_name, Observation(me=p1_state, them=p2_state)),\n        (p2.actor_name, Observation(me=p2_state, them=p1_state)),\n    ]\n    if event.type == cogment.EventType.ACTIVE:\n        # The trial is active\n        environment_session.produce_observations(observations)\n    else:\n        # The trial termination has been requested\n        environment_session.end(observations)\n')),(0,o.kt)("p",null,"Finally, in the ",(0,o.kt)("strong",{parentName:"p"},"termination")," phase, we print some stats about the trial itself."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"print(f\"Trial {environment_session.get_trial_id()} ended:\")\nprint(f\"\\t * {state['rounds_count']} rounds played\")\nprint(f\"\\t * {p1.actor_name} won {state['p1']['score']} rounds\")\nprint(f\"\\t * {p2.actor_name} won {state['p2']['score']} rounds\")\nprint(f\"\\t * {state['rounds_count'] - state['p1']['score'] - state['p2']['score']} draws\")\n")),(0,o.kt)("p",null,"Modify the ",(0,o.kt)("inlineCode",{parentName:"p"},"environment/main.py")," file to include the above additions. Please note that this code makes assumptions on the number of actors and their classes. Production code should handle non-standard cases in a better way."),(0,o.kt)("p",null,"You can now ",(0,o.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/bootstrap-and-data-structures#building-and-running-the-app"},"build and run")," the application. Given the nature of the game and the fully random nature of the plays you should have around 1/3 of player 1 wins, 1/3 of player 2's and 1/3 of draws."),(0,o.kt)("p",null,"This concludes the step 2 of the tutorial: you implemented your first actor and your first environment."),(0,o.kt)("p",null,"Let\u2019s move on to learning more about rewards in ",(0,o.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/rewards"},"step 3"),"."))}d.isMDXComponent=!0}}]);