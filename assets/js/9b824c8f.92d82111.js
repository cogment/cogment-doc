"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[880],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(r),h=a,u=d["".concat(s,".").concat(h)]||d[h]||m[h]||o;return r?n.createElement(u,i(i({ref:t},p),{},{components:r})):n.createElement(u,i({ref:t},p))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},2406:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const o={title:"Core Concepts",sidebar_position:1},i="Core Concepts",l={unversionedId:"guide/core-concepts",id:"guide/core-concepts",title:"Core Concepts",description:"Cogment is built around concepts adapted from multi-agent systems (agents, environment), Markov decision processes (action and observation space) and reinforcement learning (trials, rewards).",source:"@site/docs/guide/core-concepts.md",sourceDirName:"guide",slug:"/guide/core-concepts",permalink:"/docs/guide/core-concepts",draft:!1,tags:[],version:"current",lastUpdatedAt:1675461707,formattedLastUpdatedAt:"Feb 3, 2023",sidebarPosition:1,frontMatter:{title:"Core Concepts",sidebar_position:1},sidebar:"docSidebar",previous:{title:"Community",permalink:"/docs/community-channels"},next:{title:"Development guide",permalink:"/docs/guide/development-guide"}},s={},c=[{value:"Observations &amp; actions",id:"observations--actions",level:2},{value:"Trials",id:"trials",level:2},{value:"Actors",id:"actors",level:2},{value:"Environment",id:"environment",level:2},{value:"The spec file",id:"the-spec-file",level:2},{value:"Architecture",id:"architecture",level:2},{value:"Orchestrator",id:"orchestrator",level:3},{value:"Controller",id:"controller",level:3},{value:"Environment",id:"environment-1",level:3},{value:"Actors",id:"actors-1",level:3},{value:"Additional components",id:"additional-components",level:3},{value:"Components availability summary",id:"components-availability-summary",level:2}],p={toc:c};function m(e){let{components:t,...o}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"core-concepts"},"Core Concepts"),(0,a.kt)("p",null,"Cogment is built around concepts adapted from multi-agent systems (agents, environment), Markov decision processes (action and observation space) and reinforcement learning (trials, rewards)."),(0,a.kt)("h2",{id:"observations--actions"},"Observations & actions"),(0,a.kt)("p",null,"Observations and actions are key concepts of Cogment, they are main input / output of the different components:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#environment"},"Environments")," take actions as an input and output observations,"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#actors"},"Actors")," take observations as an input and output actions.")),(0,a.kt)("p",null,"This discrete framework makes it easy to model the sequential decision making of the Actors in Environments, it is borrowed from Markov Decision Process (MDP) formalism, in particular Partially Observable MDP (POMDP): each Actor can get a different Observation from the environment representing what it perceives about the state of the world. The Action represents the decision the Actor takes upon receiving this observation, this action is then applied by the Environment. Cogment leverages this discrete update to orchestrate the execution of the components and the dispatch of data between them."),(0,a.kt)("h2",{id:"trials"},"Trials"),(0,a.kt)("p",null,"Trials are what a Cogment deployment runs. They enable ",(0,a.kt)("a",{parentName:"p",href:"#actors"},"Actors")," to interact with their ",(0,a.kt)("a",{parentName:"p",href:"#environment"},"Environment"),". Trials are started by clients connecting to Cogment. A trial can end either by being terminated from a client or end by itself, for example once a specific state of the Environment is reached."),(0,a.kt)("p",null,"During the trial:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("a",{parentName:"li",href:"#environment"},"Environment")," generates ",(0,a.kt)("a",{parentName:"li",href:"#observations--actions"},(0,a.kt)("strong",{parentName:"a"},"observations"))," of its internal state and sends them to the ",(0,a.kt)("a",{parentName:"li",href:"#actors"},"actors"),"."),(0,a.kt)("li",{parentName:"ul"},"Given these observations, each actor chooses and sends an ",(0,a.kt)("a",{parentName:"li",href:"#observations--actions"},(0,a.kt)("strong",{parentName:"a"},"action")),"."),(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("a",{parentName:"li",href:"#environment"},"Environment")," receives the actions and updates its state."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Rewards")," can be sent to the ",(0,a.kt)("a",{parentName:"li",href:"#actors"},"actors")," from either the environment or other actors. A sent reward is a measure of an actor\u2019s performance within the environment at a given point in time during the trial."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#actors"},"Actors")," receive ",(0,a.kt)("strong",{parentName:"li"},"rewards")," if at least one was sent to them."),(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("a",{parentName:"li",href:"#actors"},"actors")," or the ",(0,a.kt)("a",{parentName:"li",href:"#environment"},"environment")," can send ",(0,a.kt)("strong",{parentName:"li"},"messages")," to actors or the environment."),(0,a.kt)("li",{parentName:"ul"},"A log of the activity during the trial (observations, actions, rewards & messages) is produced and can be stored.")),(0,a.kt)("p",null,"A trial is defined by the participating ",(0,a.kt)("a",{parentName:"p",href:"#actors"},"Actors")," and the host ",(0,a.kt)("a",{parentName:"p",href:"#environment"},"Environment"),". As a concept, Trials are quite close to Reinforcement Learning's ",(0,a.kt)("strong",{parentName:"p"},"Episodes"),", i.e. all the states that come between an initial state and a terminal state. However, because Cogment can be used outside of an RL context, we prefer using the more generic term of Trial."),(0,a.kt)("h2",{id:"actors"},"Actors"),(0,a.kt)("p",null,"Actors within a trial instantiate ",(0,a.kt)("strong",{parentName:"p"},"actor classes")," defined by the nature of the information they receive from the ",(0,a.kt)("a",{parentName:"p",href:"#environment"},"Environment"),", their ",(0,a.kt)("strong",{parentName:"p"},"observation space"),", and what actions they can perform, their ",(0,a.kt)("strong",{parentName:"p"},"action space"),"."),(0,a.kt)("p",null,"In Cogment, the observation and action space are defined as typed data structures. In particular, Cogment uses ",(0,a.kt)("a",{parentName:"p",href:"https://developers.google.com/protocol-buffers/"},"Protocol Buffers - protobuf -")," as a format to specify these data structures. This typing defines both an interface contract between the Actors and the Environment and helps convey semantic information, thus facilitating the independent design and development of both."),(0,a.kt)("p",null,"An Actor might be controlled either by a software agent, or by a Human. Whichever the case, the process of generating actions based on observations remains the same, and the ",(0,a.kt)("a",{parentName:"p",href:"#environment"},"Environment")," treats them the same."),(0,a.kt)("p",null,'Some Actors connect to the trial (we call them "client" Actors) and others will wait for the trial to connect to them (we call these "service" Actors).'),(0,a.kt)("h2",{id:"environment"},"Environment"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"#environment"},"Environment")," is the context within which the ",(0,a.kt)("a",{parentName:"p",href:"#trials"},"Trial")," takes place. The Environment receives the actions done by the Actors, usually updates an internal state, and generates an observation for each ",(0,a.kt)("a",{parentName:"p",href:"#actors"},"Actor"),"."),(0,a.kt)("p",null,"The Environment is the main integration point between Cogment and an external system, either a ",(0,a.kt)("strong",{parentName:"p"},"simulation")," or a ",(0,a.kt)("strong",{parentName:"p"},"real world system"),"."),(0,a.kt)("h2",{id:"the-spec-file"},"The spec file"),(0,a.kt)("p",null,"At the heart of every Cogment project is a ",(0,a.kt)("a",{parentName:"p",href:"https://yaml.org"},"YAML")," ",(0,a.kt)("strong",{parentName:"p"},"spec file")," typically called ",(0,a.kt)("inlineCode",{parentName:"p"},"cogment.yaml"),". It specifies the trials for this project including its actor classes and their action & observation spaces. You can learn more about the specification file in the ",(0,a.kt)("a",{parentName:"p",href:"/docs/reference/cogment-yaml"},"dedicated reference page")),(0,a.kt)("h2",{id:"architecture"},"Architecture"),(0,a.kt)("p",null,"Running trials with Cogment usually involves the deployment of a cluster of services and clients. These components are either provided by the Cogment framework, depicted below in blue, or implemented for a particular project, depicted below in orange."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Cogment Architecture - Simple",src:r(2213).Z,width:"759",height:"513"})),(0,a.kt)("p",null,"User implemented components use one of the ",(0,a.kt)("a",{parentName:"p",href:"/docs/guide/development-guide"},"Cogment SDKs")," or directly implement the ",(0,a.kt)("a",{parentName:"p",href:"/docs/reference/grpc"},"underlying protocol"),". Components communicate using ",(0,a.kt)("a",{parentName:"p",href:"https://grpc.io"},"gRPC"),", clients can also communicate in a web-friendly way using ",(0,a.kt)("a",{parentName:"p",href:"https://grpc.io/docs/platforms/web/"},"gRPC-Web")," and ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy"},"grpcwebproxy"),"."),(0,a.kt)("h3",{id:"orchestrator"},"Orchestrator"),(0,a.kt)("p",null,"The Orchestrator is the glue that binds everything together. It is responsible for running the ",(0,a.kt)("a",{parentName:"p",href:"#Trials"},"Trials")," and contacting other services as needed to ensure their execution."),(0,a.kt)("p",null,"The key aspect of Cogment's orchestrator is its capacity to handle a number of network connections in parallel while keeping its responsiveness."),(0,a.kt)("h3",{id:"controller"},"Controller"),(0,a.kt)("p",null,"The Controller is a key part of using Cogment, it initiates communication with the Orchestrator to control the execution of ",(0,a.kt)("a",{parentName:"p",href:"#trials"},"Trials"),". It is responsible for starting Trials, retrieving and watching their state (including the end of the trial), or requesting trial termination."),(0,a.kt)("h3",{id:"environment-1"},"Environment"),(0,a.kt)("p",null,"The Environment implementation is accessed by the ",(0,a.kt)("a",{parentName:"p",href:"#orchestrator"},"Orchestrator")," to run the ",(0,a.kt)("a",{parentName:"p",href:"#environment"},"Environment")," during ",(0,a.kt)("a",{parentName:"p",href:"#trials"},"Trials"),"."),(0,a.kt)("p",null,"Using one of ",(0,a.kt)("a",{parentName:"p",href:"/docs/guide/development-guide"},"Cogment's SDKs"),", the Environment can be implemented as a function integrating a ",(0,a.kt)("em",{parentName:"p"},'"state of the world"')," with the Trial. This function performs the following tasks during the Trial:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Generate Observations from the current ",(0,a.kt)("em",{parentName:"li"},"state of the world"),", for example retrieving the visible objects from a 3D simulation."),(0,a.kt)("li",{parentName:"ul"},"Apply the Actions, thus updating the ",(0,a.kt)("em",{parentName:"li"},"state of the world"),", for example changing the velocity of a moving vehicle in a race simulation."),(0,a.kt)("li",{parentName:"ul"},"Evaluate the performance of ",(0,a.kt)("a",{parentName:"li",href:"#actors"},"Actors")," and send them Rewards, for example by checking if a vehicle crossed the finish line in a race simulation."),(0,a.kt)("li",{parentName:"ul"},"Send and receive direct messages.")),(0,a.kt)("h3",{id:"actors-1"},"Actors"),(0,a.kt)("p",null,"Actors can be implemented in two different ways, either as a service or as a client. ",(0,a.kt)("strong",{parentName:"p"},"Service Actor")," implementations are accessed by the ",(0,a.kt)("a",{parentName:"p",href:"#orchestrator"},"Orchestrator")," during ",(0,a.kt)("a",{parentName:"p",href:"#trials"},"Trials"),", while ",(0,a.kt)("strong",{parentName:"p"},"Client Actor")," implementations join a Trial by initiating the communication with the Orchestrator. Client Actors implementations can ",(0,a.kt)("em",{parentName:"p"},"reach")," a Cogment deployment through ",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/NAT_traversal"},"NAT traversal"),". This makes them particularly well-suited to implement human-driven Actors, in web-browsers for example."),(0,a.kt)("p",null,"Using one of ",(0,a.kt)("a",{parentName:"p",href:"/docs/guide/development-guide"},"Cogment's SDKs")," Actors can be implemented as functions handling the integration between a decision-making Actor (software agent or Human) and the ",(0,a.kt)("a",{parentName:"p",href:"#trials"},"Trial"),". This function performs the following tasks during the Trial:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Receive Observations and do Actions in response, for example vectorizing the retrieved observation, feeding it to a neural network and converting its output to an Action."),(0,a.kt)("li",{parentName:"ul"},"Receive Rewards, for example using them to update a neural network."),(0,a.kt)("li",{parentName:"ul"},"Send and receive direct messages.")),(0,a.kt)("p",null,"Please note that rewards can also be retrieved after the fact using a ",(0,a.kt)("a",{parentName:"p",href:"#additional-optional-services"},"datalog"),"."),(0,a.kt)("h3",{id:"additional-components"},"Additional components"),(0,a.kt)("p",null,"On top of the core components described above, a Cogment deployment can include these additional ones:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Datalog")," services can be used to listen to the activity during a trial (actions, observations, rewards, messages) in order to, for example, store these data for the offline training of AI agents. ",(0,a.kt)("a",{parentName:"li",href:"/docs/reference/cli/trial-datastore/trial-datastore-server"},(0,a.kt)("strong",{parentName:"a"},"Trial Datastore"))," is an out-of-the-box implementation of this."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/reference/cli/model-registry"},(0,a.kt)("strong",{parentName:"a"},"Model Registry"))," handles the storage and dispatch of AI models trained with Cogment and used by the actors."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/reference/cli/directory/directory-server"},(0,a.kt)("strong",{parentName:"a"},"Directory"))," handles the publishing and discovery of cogment services."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Pre-Trial Hooks")," can be used to dynamically setup Trials from a given configuration, for example changing the number of Actors or pointing to other Environment or Actor implementations.")),(0,a.kt)("h2",{id:"components-availability-summary"},"Components availability summary"),(0,a.kt)("p",null,"The following table summarizes how each component can either be implemented or used out of the box."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Component"),(0,a.kt)("th",{parentName:"tr",align:null},"Cogment"),(0,a.kt)("th",{parentName:"tr",align:null},"Python SDK"),(0,a.kt)("th",{parentName:"tr",align:null},"Javascript SDK"),(0,a.kt)("th",{parentName:"tr",align:null},"gRPC API"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Orchestrator"),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/cli/orchestrator"},(0,a.kt)("inlineCode",{parentName:"a"},"cogment services orchestrator"))),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 implement ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#control-api"},"Control API")," & ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#client-actor-api"},"Client Actor API"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Controller"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#get_controllerself-endpoint"},"get controller")),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/javascript/#getcontrollerendpoint"},"get controller")),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 use ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#control-api"},"Control API"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Environment"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#register_environmentself-impl-impl_name-default"},"register environment")," & ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#async-serve_all_registeredself-served_endpoint-prometheus_port--8000"},"serve")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 implement ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#environment-api"},"Environment API"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Actor (Service)"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#register_actorself-impl-impl_name-actor_classes"},"register actor")," & ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#async-serve_all_registeredself-served_endpoint-prometheus_port--8000"},"serve")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 implement ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#service-actor-api"},"Service Actor API"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Actor (Client)"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#register_actorself-impl-impl_name-actor_classes"},"register actor")," & join trial"),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/javascript#registeractorimpl-actorname-actorclass"},"register actor")," & ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/javascript#async-jointrialtrialid-endpoint-actorname"},"join trial")),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 use ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#client-actor-api"},"Client Actor API"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Trial Datastore"),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/cli/trial-datastore/trial-datastore-server"},(0,a.kt)("inlineCode",{parentName:"a"},"cogment services trial_datastore"))),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#register_datalogself-impl"},"register datalog"),", ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#async-serve_all_registeredself-served_endpoint-prometheus_port--8000"},"serve")," & ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#get_datastoreself-endpoint"},"get datastore")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 implement ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#datalog-api"},"Datalog API")," & ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#trial-datastore-api"},"Trial Datastore API"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Trial Datastore Client"),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/cli/trial-datastore/trial-datastore-client"},(0,a.kt)("inlineCode",{parentName:"a"},"cogment client trial_datastore"))),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#get_datastoreself-endpoint"},"get datastore")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 use ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#trial-datastore-api"},"Trial Datastore API"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Model Registry"),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/cli/model-registry"},(0,a.kt)("inlineCode",{parentName:"a"},"cogment services model_registry"))),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 implement ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#model-registry-api"},"Model Registry API"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Model Registry Client"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#async-get_model_registryself-endpointendpoint"},"get model registry")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 use ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#model-registry-api"},"Model Registry API"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Directory"),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/cli/directory/directory-server"},"`cogment services directory")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 implement ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#directory-api"},"Directory API"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Directory Client"),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/cli/directory/directory-client"},"`cogment client directory")),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#__init__self-user_id-cog_settings-prometheus_registryprometheus_clientcoreregistry-directory_endpointnone-directory_auth_tokennone"},"use directory")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 use ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#directory-api"},"Directory API"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Pre Trial Hook"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#register_datalogself-impl"},"register pre trial hook")," & ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/python#async-serve_all_registeredself-served_endpoint-prometheus_port--8000"},"serve")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u2705 implement ",(0,a.kt)("a",{parentName:"td",href:"/docs/reference/grpc#hook-api"},"Pre Trial Hook API"))))))}m.isMDXComponent=!0},2213:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/cogment_architecture_simple-6f96e9992c938c99cafccbeed60512b0.png"}}]);