"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[5519],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(n),u=o,h=m["".concat(l,".").concat(u)]||m[u]||d[u]||i;return n?a.createElement(h,r(r({ref:t},p),{},{components:n})):a.createElement(h,r({ref:t},p))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,r[1]=s;for(var c=2;c<i;c++)r[c]=n[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4985:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var a=n(7462),o=(n(7294),n(3905));const i={title:"Step 4 - Making Decisions with Feedback"},r="Making Decisions with Feedback",s={unversionedId:"guide/tutorial/decision-making",id:"guide/tutorial/decision-making",title:"Step 4 - Making Decisions with Feedback",description:"In this step of the tutorial, we will start thinking about rewards. Rewards are a way to evaluate how an Actor performs at a task. They can be used to evaluate or compare different implementations of an Actor, or, especially in the context of Reinforcement Learning, train a model. In Cogment, both the environment and other actors can evaluate an actor. Here, we will focus on sending rewards from the environment.",source:"@site/docs/guide/tutorial/4-decision-making.md",sourceDirName:"guide/tutorial",slug:"/guide/tutorial/decision-making",permalink:"/docs/guide/tutorial/decision-making",draft:!1,tags:[],version:"current",lastUpdatedAt:1696019767,formattedLastUpdatedAt:"Sep 29, 2023",sidebarPosition:4,frontMatter:{title:"Step 4 - Making Decisions with Feedback"},sidebar:"docSidebar",previous:{title:"Step 3 - The Environment in Cogment",permalink:"/docs/guide/tutorial/environment-in-cogment"},next:{title:"Advanced Tutorial Steps",permalink:"/docs/guide/tutorial/advanced-tutorials/"}},l={},c=[{value:"Sending Rewards to the Actors",id:"sending-rewards-to-the-actors",level:2},{value:"Enabling Actors to Make Use of Information from the Environment",id:"enabling-actors-to-make-use-of-information-from-the-environment",level:2},{value:"Registering a new Actor with Cogment",id:"registering-a-new-actor-with-cogment",level:2}],p={toc:c};function d(e){let{components:t,...i}=e;return(0,o.kt)("wrapper",(0,a.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"making-decisions-with-feedback"},"Making Decisions with Feedback"),(0,o.kt)("p",null,"In this step of the tutorial, we will start thinking about rewards. Rewards are a way to evaluate how an Actor performs at a task. They can be used to evaluate or compare different implementations of an Actor, or, especially in the context of Reinforcement Learning, train a model. In Cogment, both the environment and other actors can evaluate an actor. Here, we will focus on sending rewards from the environment."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"including feedback from the environment",src:n(643).Z,width:"2604",height:"940"})),(0,o.kt)("p",null,"Until now, the concept of game is only known to the Environment. It has no impact on the Observation and action spaces, and thus no impact on the Actor implementation. This means an actor wouldn't ",(0,o.kt)("em",{parentName:"p"},"know")," that the round it currently plays is the tie breaker in a game or its very first round. As a result the actor will play every round the same way."),(0,o.kt)("p",null,"In this step we will allow the Environment to send rewards to the actors, and modify ",(0,o.kt)("inlineCode",{parentName:"p"},"Bob"),"'s implementations to make use of this kind of information in gameplay and compare how it performs against ",(0,o.kt)("inlineCode",{parentName:"p"},"Alice"),"'s implementation."),(0,o.kt)("h2",{id:"sending-rewards-to-the-actors"},"Sending Rewards to the Actors"),(0,o.kt)("p",null,"Here, we will modify ",(0,o.kt)("inlineCode",{parentName:"p"},"environment/main.py")," to include rewards when passing information to the Actors. Note that not all actions need to be rewarded. When a game is won, the Environment will add a ",(0,o.kt)("strong",{parentName:"p"},"positive reward to the winner")," (we chose a value of 1) and a ",(0,o.kt)("strong",{parentName:"p"},"negative reward to the loser")," (we chose a value of -1). Cogment also supports the notion of ",(0,o.kt)("em",{parentName:"p"},"confidence"),", a weight between 0 and 1 that expresses the qualification of the reward sender in its appreciation. In this case we are applying objective rules, so we use a confidence of 1."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"In the event loop, when the first player wins a game we add the following:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"environment_session.add_reward(value=1, confidence=1, to=[p1.actor_name])\nenvironment_session.add_reward(value=-1, confidence=1, to=[p2.actor_name])\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"When the second player wins a game we add the following:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"environment_session.add_reward(value=-1, confidence=1, to=[p1.actor_name])\nenvironment_session.add_reward(value=1, confidence=1, to=[p2.actor_name])\n")),(0,o.kt)("p",null,"Modify the ",(0,o.kt)("inlineCode",{parentName:"p"},"environment/main.py")," file to include the above additions."),(0,o.kt)("p",null,"Your Environment implementation event block should now look like this:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Environment implementation with rewards",src:n(6374).Z,width:"1916",height:"1964"})),(0,o.kt)("p",null,"You can now ",(0,o.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/setup#building-and-running-the-app"},"build and run")," the application to check that it works as expected. In particular, you should see logs relative to the reception of rewards on the Actor side."),(0,o.kt)("h2",{id:"enabling-actors-to-make-use-of-information-from-the-environment"},"Enabling Actors to Make Use of Information from the Environment"),(0,o.kt)("p",null,"In this section, we will create a new Actor implementation in ",(0,o.kt)("inlineCode",{parentName:"p"},"actors/main.py")," below our ",(0,o.kt)("inlineCode",{parentName:"p"},"random_agent")," implementation. We'll call our new implementation ",(0,o.kt)("inlineCode",{parentName:"p"},"heuristic_agent")," - it will just use a simple decision making logic for selecting an action based on the Observation it receives."),(0,o.kt)("p",null,"This Actor will also need to know what moves beat other moves. ",(0,o.kt)("strong",{parentName:"p"},'In the "Settings" section, add the ',(0,o.kt)("inlineCode",{parentName:"strong"},"DEFEATS")," we specified in the Environment:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"DEFEATS = {\n  ROCK: PAPER,\n  SCISSORS: ROCK,\n  PAPER: SCISSORS\n}\n")),(0,o.kt)("p",null,"Now we can include a new Actor implementation that makes choices that utilize this knowledge. In ",(0,o.kt)("inlineCode",{parentName:"p"},"actors/main.py"),' add the following to the "Actor Implementation Functions" section:'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"async def heuristic_agent(actor_session):\n    # initialization\n    actor_session.start()\n\n    # event loop\n    async for event in actor_session.all_events():\n        if event.observation:\n            observation = event.observation\n            print(f\"'{actor_session.name}' received an observation: '{observation}'\")\n            if event.type == cogment.EventType.ACTIVE:\n                if observation.observation.me.won_last:\n                    # I won the last round, let's play the same thing\n                    actor_session.do_action(PlayerAction(move=observation.observation.me.last_move))\n                elif observation.observation.them.won_last:\n                    # I lost the last round, let's play what would have won\n                    actor_session.do_action(PlayerAction(move=DEFEATS[observation.observation.them.last_move]))\n                else:\n                    # last round was a draw, let's play randomly\n                    actor_session.do_action(PlayerAction(move=random.choice(MOVES)))\n        for reward in event.rewards:\n            print(f\"'{actor_session.name}' received a reward for tick #{reward.tick_id}: {reward.value}\")\n\n    # termination\n")),(0,o.kt)("p",null,"This heuristic player uses a simple strategy for winning: if my last move was successful, play it again, and if it wasn't, play what would have won the last round. If the last round ended in a draw, select an action at random."),(0,o.kt)("h2",{id:"registering-a-new-actor-with-cogment"},"Registering a new Actor with Cogment"),(0,o.kt)("p",null,"Before we can use this new actor, we will need to register it with Cogment."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"In the ",(0,o.kt)("inlineCode",{parentName:"strong"},"main")," function of ",(0,o.kt)("inlineCode",{parentName:"strong"},"actors/main.py"),", add the following:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'context.register_actor(\n    impl=heuristic_agent, # implementation defined above\n    impl_name="heuristic_agent",\n    actor_classes=["player",] # actor class defined in the cogment.yaml file\n    )\n')),(0,o.kt)("p",null,"This will make Cogment aware of an actor of the ",(0,o.kt)("inlineCode",{parentName:"p"},"player")," class which uses the ",(0,o.kt)("inlineCode",{parentName:"p"},"heuristic_agent")," implementation. Next, let's make ",(0,o.kt)("inlineCode",{parentName:"p"},"Bob")," an Actor of this type."),(0,o.kt)("h1",{id:"modifying-bob"},"Modifying ",(0,o.kt)("inlineCode",{parentName:"h1"},"Bob")),(0,o.kt)("p",null,"In ",(0,o.kt)("inlineCode",{parentName:"p"},"trial_runner/main.py"),", we will need to change which type of registered Actor ",(0,o.kt)("inlineCode",{parentName:"p"},"Bob")," is going to be in the game. Since we have registered this new Actor, all we need to do is change the ",(0,o.kt)("inlineCode",{parentName:"p"},"ActorParameters")," for ",(0,o.kt)("inlineCode",{parentName:"p"},"Bob"),". ",(0,o.kt)("strong",{parentName:"p"},"In ",(0,o.kt)("inlineCode",{parentName:"strong"},"trial_runner/main.py")," set the ",(0,o.kt)("inlineCode",{parentName:"strong"},"ActorParameters")," for the Actor named ",(0,o.kt)("inlineCode",{parentName:"strong"},"Bob")," to be:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'actor_1_params = cogment.ActorParameters(\n    cog_settings,\n    name="Bob",\n    class_name="player",\n    endpoint=ACTORS_ENDPOINT,\n    implementation="heuristic_agent"\n    )\n')),(0,o.kt)("p",null,"You can now ",(0,o.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/setup#building-the-application"},"install and run")," the application to check that it works. Don't expect the heuristic player to beat the random player, the nature of the game actually rewards pure randomness in the playing. However, now you have all of the tools necessary implement various strategies and see how they fare against each other. This concludes the basic tutorial for Cogment in RPS. If you'd like to try some more advanced techniques, check out the ",(0,o.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/advanced-tutorials/"},"advanced tutorials"),"."))}d.isMDXComponent=!0},643:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/actor-env-interaction-reward-950ec0555811e5b4fa50d22165fb5051.png"},6374:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/environment_implementation_reward-7060bff3febc8f53cd4c23120c7073f9.png"}}]);