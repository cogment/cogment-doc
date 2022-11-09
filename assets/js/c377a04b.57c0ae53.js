"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[971],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(n),u=a,h=d["".concat(l,".").concat(u)]||d[u]||m[u]||o;return n?r.createElement(h,i(i({ref:t},p),{},{components:n})):r.createElement(h,i({ref:t},p))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1269:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(3117),a=(n(7294),n(3905));const o={title:"Overview",description:"An introduction to Cogment",sidebar_position:1},i="The Cogment Platform",s={unversionedId:"index",id:"index",title:"Overview",description:"An introduction to Cogment",source:"@site/docs/index.md",sourceDirName:".",slug:"/",permalink:"/docs/",draft:!1,tags:[],version:"current",lastUpdatedAt:1668007816,formattedLastUpdatedAt:"11/9/2022",sidebarPosition:1,frontMatter:{title:"Overview",description:"An introduction to Cogment",sidebar_position:1},sidebar:"docSidebar",next:{title:"Community",permalink:"/docs/community-channels"}},l={},c=[{value:"What is Cogment?",id:"what-is-cogment",level:2},{value:"When to use Cogment?",id:"when-to-use-cogment",level:3},{value:"When not to use Cogment",id:"when-not-to-use-cogment",level:3},{value:"Components",id:"components",level:3},{value:"First steps",id:"first-steps",level:2},{value:"Citations",id:"citations",level:2}],p={toc:c};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"the-cogment-platform"},"The Cogment Platform"),(0,a.kt)("h2",{id:"what-is-cogment"},"What is Cogment?"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://cogment.ai"},"Cogment")," is the first open source platform designed to address the challenges of continuously training humans and AI together. It is developed by ",(0,a.kt)("a",{parentName:"p",href:"https://ai-r.com"},"AI Redefined"),", to enable AI practitioners to build, train and operate AI agents in simulated or real environments shared with humans."),(0,a.kt)("h3",{id:"when-to-use-cogment"},"When to use Cogment?"),(0,a.kt)("p",null,"Cogment borrows a lot of its formalism from ",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Reinforcement_learning"},"Reinforcement Learning (RL)"),", in particular ",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Markov_decision_process"},"Markov Decision Processes (MDPs)"),", and to ",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Multi-agent_system"},"Multi-Agent Systems (MAS)"),". This makes Cogment particularly well suited to implement Reinforcement Learning and Multi-Agent Reinforcement Learning (MARL) agents and training processes."),(0,a.kt)("p",null,"Cogment is designed to enable Humans and AIs to operate in shared environments, as such it is very adapted to any kind of Human-In-the-Loop Learning (HILL) process such as Imitation Learning (IL) / Behavior Cloning (BC), RL from human feedback or even Active Learning."),(0,a.kt)("p",null,"More generally, Cogment is designed to allow the training of complex agent architectures on ",(0,a.kt)("strong",{parentName:"p"},"sequential decision-making tasks")," in complex environments and supports Humans in the loop. It is especially well suited to address multi-agent contexts, regardless of their learning mechanisms (or, for that matter, whether they are of the learning kind or not). Cogment also relies on the Actor's abstraction, meaning that human users and learning or non-learning agents alike are treated in the same way from a high level point of view, rendering them interchangeable."),(0,a.kt)("p",null,"As such, Cogment is suited for, among others, these contexts:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Easily bootstrapping a given system by using human users, or heuristic agents, or both, then transitioning seamlessly to ML implementations"),(0,a.kt)("li",{parentName:"ul"},"Architecture multiple ML approaches to contribute to a single role, either by balancing them through specific rulesets, or specific performance metrics, or any other criteria"),(0,a.kt)("li",{parentName:"ul"},"Comparing different agent types/implementations without requiring any change in the implementation of the environment")),(0,a.kt)("h3",{id:"when-not-to-use-cogment"},"When not to use Cogment"),(0,a.kt)("p",null,"Cogment can be used in many other contexts it wasn't specifically designed for. However, for several types and scales of ML-powered projects, it may not be the most fitting approach for:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Perception tasks trained on offline datasets"),(0,a.kt)("li",{parentName:"ul"},"Simple projects focused around one learning agent"),(0,a.kt)("li",{parentName:"ul"},"Projects deployed only locally with no plans of larger scale distributed deployment")),(0,a.kt)("h3",{id:"components"},"Components"),(0,a.kt)("p",null,"The Cogment platform consists of multiple components:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The main ",(0,a.kt)("a",{parentName:"li",href:"/docs/reference/cli/"},(0,a.kt)("strong",{parentName:"a"},"Cogment CLI"))," includes the main components in a cross platform easily distributable package,",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("a",{parentName:"li",href:"/docs/reference/cli/orchestrator"},(0,a.kt)("strong",{parentName:"a"},"Orchestrator")),", the ",(0,a.kt)("em",{parentName:"li"},"heart")," of a Cogment app, is in charge of running the components,"),(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("a",{parentName:"li",href:"/docs/reference/cli/directory/directory-server"},(0,a.kt)("strong",{parentName:"a"},"Directory")),' is the "directory" where Cogment services are registered and can be found by clients and other services.'),(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("a",{parentName:"li",href:"/docs/reference/cli/trial-datastore/trial-datastore-server"},(0,a.kt)("strong",{parentName:"a"},"Trial Datastore")),", which stores and make available data generated while running Cogment,"),(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("a",{parentName:"li",href:"/docs/reference/cli/model-registry"},(0,a.kt)("strong",{parentName:"a"},"Model Registry")),", which versions and stores trained AI models to be used by Cogment agents,"))),(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("strong",{parentName:"li"},"SDKs")," are used to build your Cogment app services and clients, SDKs are available in ",(0,a.kt)("a",{parentName:"li",href:"/docs/reference/python"},"Python")," and ",(0,a.kt)("a",{parentName:"li",href:"/docs/reference/javascript"},"Javascript"),".")),(0,a.kt)("h2",{id:"first-steps"},"First steps"),(0,a.kt)("p",null,"Before diving right in, we recommend taking the time to read the ",(0,a.kt)("a",{parentName:"p",href:"/docs/guide/core-concepts"},"Core concepts")," section which details the terminology we use for several critical concepts of Cogment. You can then proceed to read on how to ",(0,a.kt)("a",{parentName:"p",href:"/docs/reference/cli/"},"install")," the platform."),(0,a.kt)("p",null,"To get your hands dirty, proceed to the ",(0,a.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/"},"tutorial")," for an introduction to all things Cogment."),(0,a.kt)("h2",{id:"citations"},"Citations"),(0,a.kt)("p",null,"If you use ",(0,a.kt)("strong",{parentName:"p"},"Cogment")," in your research, please cite the ",(0,a.kt)("a",{parentName:"p",href:"https://arxiv.org/abs/2106.11345"},"white paper")," as follows:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bibtex"},"@misc{air2021cogment,\n    title={Cogment: Open Source Framework For Distributed Multi-actor Training, Deployment & Operations},\n    author={AI Redefined and Sai Krishna Gottipati and Sagar Kurandwad and Clod\xe9ric Mars and Gregory Szriftgiser and Fran\xe7ois Chabot},\n    year={2021},\n    eprint={2106.11345},\n    archivePrefix={arXiv},\n    primaryClass={cs.AI}\n}\n")))}m.isMDXComponent=!0}}]);