"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[886],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=r,h=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return n?a.createElement(h,i(i({ref:t},c),{},{components:n})):a.createElement(h,i({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8782:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(3117),r=(n(7294),n(3905));const o={},i="Step 1: Create a new Trial",l={unversionedId:"guide/tutorial/bootstrap-and-data-structures",id:"guide/tutorial/bootstrap-and-data-structures",title:"Step 1: Create a new Trial",description:"Prerequisites",source:"@site/docs/guide/tutorial/1-bootstrap-and-data-structures.md",sourceDirName:"guide/tutorial",slug:"/guide/tutorial/bootstrap-and-data-structures",permalink:"/docs/guide/tutorial/bootstrap-and-data-structures",draft:!1,tags:[],version:"current",lastUpdatedAt:1657553723,formattedLastUpdatedAt:"7/11/2022",sidebarPosition:1,frontMatter:{},sidebar:"docSidebar",previous:{title:"Tutorial",permalink:"/docs/guide/tutorial/"},next:{title:"Step 2: Implement a first actor and environment",permalink:"/docs/guide/tutorial/random-player"}},s={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Bootstrap",id:"bootstrap",level:2},{value:"Building and running the app",id:"building-and-running-the-app",level:2},{value:"Trial specs",id:"trial-specs",level:2},{value:"Action Space",id:"action-space",level:3},{value:"Observation Space",id:"observation-space",level:3}],c={toc:p};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"step-1-create-a-new-trial"},"Step 1: Create a new Trial"),(0,r.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,r.kt)("p",null,"To follow this tutorial you'll need a working installation of ",(0,r.kt)("strong",{parentName:"p"},"Cogment"),". If you haven't done so already, follow our ",(0,r.kt)("a",{parentName:"p",href:"/docs/reference/cli/"},"installation instructions"),"."),(0,r.kt)("p",null,"Additionaly, you'll need:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.python.org/"},"python")," 3.7 or later,"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://virtualenv.pypa.io/en/latest/"},"virtualenv"),".")),(0,r.kt)("h2",{id:"bootstrap"},"Bootstrap"),(0,r.kt)("p",null,"The easiest way to get started with the project structure is to retrieve the result of step 1 from the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment-tutorial-rps"},"tutorial's repository")," from the ",(0,r.kt)("inlineCode",{parentName:"p"},"1-bootstrap-and-data-structures")," folder in a new local ",(0,r.kt)("inlineCode",{parentName:"p"},"rps")," folder."),(0,r.kt)("p",null,"If you followed the installation test instructions, you probably already downloaded or cloned the sources for the tutorial from ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment-tutorial-rps"},"https://github.com/cogment/cogment-tutorial-rps"),". If not, now is the time to do so."),(0,r.kt)("p",null,"You can then get a clean starting point using"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"mkdir rps\ncd rps\ncp -r /path/to/cogment-tutorial-rps/1-bootstrap-and-data-structures/* .\n")),(0,r.kt)("p",null,"This will get you started for an app with 2 AIs able to play games of RPS."),(0,r.kt)("p",null,"In Cogment's terminology, we have created 2 actors sharing a single implementation picking a random move for each round. We will develop a ",(0,r.kt)("strong",{parentName:"p"},"service actor")," implementation which is well suited for AIs, rather than a ",(0,r.kt)("strong",{parentName:"p"},"client actor")," implementation which would be better for an interactive actor; for exemple, an actor controlled by a Human player. In ",(0,r.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/human-player"},"step 5"),", we will create such implementation."),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"For the remainder of this tutorial, unless otherwise mentioned, it is assumed that all operations are run in the ",(0,r.kt)("inlineCode",{parentName:"p"},"rps")," directory."))),(0,r.kt)("h2",{id:"building-and-running-the-app"},"Building and running the app"),(0,r.kt)("p",null,"We can now check that everything works as expected."),(0,r.kt)("p",null,"First, we will need to run the build phase. This script will actually copy the ",(0,r.kt)("inlineCode",{parentName:"p"},"cogment.yaml")," and all referenced proto files to the modules directories, create virtualenvs and install the python dependencies."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"./run.sh build\n")),(0,r.kt)("p",null,"3 python modules are defined in their own folders in this first step:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"environment")," is a service where we will implement the dynamics of the game itself,"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"random_agent"),' is a service where we will implement a first "AI" agent picking moves at random,'),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"client")," is a simple script that launches Cogment trials, in this case RPS games.")),(0,r.kt)("p",null,"Run the following to start all the services of the Cogment app as well as the Cogment orchestrator: the ",(0,r.kt)("inlineCode",{parentName:"p"},"orchestrator"),", the ",(0,r.kt)("inlineCode",{parentName:"p"},"environment")," and our ",(0,r.kt)("inlineCode",{parentName:"p"},"random_agent"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"./run.sh services_start\n")),(0,r.kt)("p",null,"In another terminal, run the following to start a client for this Cogment app. This will connect to the running services to start a trial, let it run for a few seconds, and then terminate it."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ ./run.sh client_start\nClient starting...\nTrial 'c2663cd4-f93f-4156-90fd-1ee002b18c1f' started\nTrial 'c2663cd4-f93f-4156-90fd-1ee002b18c1f' terminated\n")),(0,r.kt)("p",null,"This should also generate some logs in the first terminal where the app services are running. You can now terminate the services using ",(0,r.kt)("inlineCode",{parentName:"p"},"ctrl+C"),"."),(0,r.kt)("p",null,"At this point we have a working but empty Cogment app. Before starting to implement the environment and the agent, let's take a look at the trial specifications that are also defined in what you fetched."),(0,r.kt)("h2",{id:"trial-specs"},"Trial specs"),(0,r.kt)("p",null,"The trial specs are defined in the file named ",(0,r.kt)("inlineCode",{parentName:"p"},"cogment.yaml")," and its imported ",(0,r.kt)("a",{parentName:"p",href:"https://developers.google.com/protocol-buffers/"},"Protocol Buffers")," (protobuf) files, here ",(0,r.kt)("inlineCode",{parentName:"p"},"data.proto"),". Trial specs define what protobuf messages the actor and environments participating in the trial will use and expect."),(0,r.kt)("p",null,"Let's first take a look at the ",(0,r.kt)("inlineCode",{parentName:"p"},"cogment.yaml")," file."),(0,r.kt)("p",null,"The first ",(0,r.kt)("inlineCode",{parentName:"p"},"import")," section defines the location of the prototobuf files that are used."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"import:\n    proto:\n        - data.proto\n")),(0,r.kt)("p",null,"In our case ",(0,r.kt)("inlineCode",{parentName:"p"},"data.proto")," already defines several protobuf message types in the ",(0,r.kt)("inlineCode",{parentName:"p"},"rps")," package. They are referred to in the following sections of the file."),(0,r.kt)("p",null,"The following sections relate to the configuration for the environment and the trial, they will be discussed in the coming steps."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"environment:\n    config_type: rps.EnvironmentConfig\n\ntrial:\n    config_type: rps.TrialConfig\n")),(0,r.kt)("p",null,"For now we'll focus on the last section, the actor classes and their ",(0,r.kt)("strong",{parentName:"p"},"Action Space and Observation Space"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"actor_classes:\n    - name: player\n      action:\n          space: rps.PlayerAction\n      observation:\n          space: rps.Observation\n")),(0,r.kt)("h3",{id:"action-space"},"Action Space"),(0,r.kt)("p",null,"Let's start by opening the ",(0,r.kt)("inlineCode",{parentName:"p"},"data.proto")," file to look at ",(0,r.kt)("inlineCode",{parentName:"p"},"PlayerAction")," which defines what each player can do at each step of the game. In the case of RPS, players choose one move among the three alternatives giving their name to the game: ",(0,r.kt)("em",{parentName:"p"},'"Rock"'),", ",(0,r.kt)("em",{parentName:"p"},'"Paper"')," or ",(0,r.kt)("em",{parentName:"p"},'"Scissors"'),"."),(0,r.kt)("p",null,"To do that we use an ",(0,r.kt)("inlineCode",{parentName:"p"},"enum")," called ",(0,r.kt)("inlineCode",{parentName:"p"},"Move"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-proto"},"enum Move {\n  ROCK = 0;\n  PAPER = 1;\n  SCISSORS = 2;\n}\n")),(0,r.kt)("p",null,"This type is used in ",(0,r.kt)("inlineCode",{parentName:"p"},"PlayerAction"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-proto"},"message PlayerAction {\n  Move move = 1;\n}\n")),(0,r.kt)("h3",{id:"observation-space"},"Observation Space"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"Observation")," message type defines what the actors perceive from the environment. It is an input they use to choose which action to take."),(0,r.kt)("p",null,"In the context of RPS, the environment is limited to the two players and what they played. We represent this information in a data structure called ",(0,r.kt)("inlineCode",{parentName:"p"},"PlayerState")," using two properties."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-proto"},"message PlayerState {\n  optional Move last_move = 1; // Last move played\n  bool won_last = 2;  // Did the player win the last round\n}\n")),(0,r.kt)("p",null,"Note that ",(0,r.kt)("inlineCode",{parentName:"p"},"last_move")," is optional because during the first round of the game, the players have not yet played any move."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"Observation")," message type itself defines the observed players from the point of view of each player."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-proto"},"message Observation {\n  PlayerState me = 1;\n  PlayerState them = 2;\n}\n")),(0,r.kt)("p",null,"This concludes the step 1 of the tutorial: you have bootstrapped a Cogment project, learned about the trial specs and in particular the action and observation spaces, started your app and ran a trial."),(0,r.kt)("p",null,"Let\u2019s move on to actually implementing our services in ",(0,r.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/random-player"},"step 2"),"."))}u.isMDXComponent=!0}}]);