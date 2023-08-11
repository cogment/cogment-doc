"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[330],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=d(n),h=i,u=m["".concat(s,".").concat(h)]||m[h]||c[h]||r;return n?a.createElement(u,l(l({ref:t},p),{},{components:n})):a.createElement(u,l({ref:t},p))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var d=2;d<r;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8009:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var a=n(7462),i=(n(7294),n(3905));const r={sidebar_position:5},l="Javascript SDK",o={unversionedId:"reference/javascript",id:"reference/javascript",title:"Javascript SDK",description:"Repository Latest release",source:"@site/docs/reference/javascript.md",sourceDirName:"reference",slug:"/reference/javascript",permalink:"/docs/reference/javascript",draft:!1,tags:[],version:"current",lastUpdatedAt:1659467142,formattedLastUpdatedAt:"Aug 2, 2022",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"docSidebar",previous:{title:"Python SDK",permalink:"/docs/reference/python"},next:{title:"Installation",permalink:"/docs/reference/python-enterprise/installation"}},s={},d=[{value:"Installation",id:"installation",level:2},{value:"General usage",id:"general-usage",level:2},{value:"The spec file",id:"the-spec-file",level:3},{value:"Trial Parameters",id:"trial-parameters",level:3},{value:"Compiling the spec file",id:"compiling-the-spec-file",level:4},{value:"CogSettings.js",id:"cogsettingsjs",level:3},{value:"Imports",id:"imports",level:3},{value:"class cogment.Context",id:"class-cogmentcontext",level:2},{value:"<code>constructor(userId, cogSettings)</code>",id:"constructoruserid-cogsettings",level:3},{value:"<code>getController(endpoint)</code>",id:"getcontrollerendpoint",level:3},{value:"<code>async joinTrial(trialId, endpoint, actorName)</code>",id:"async-jointrialtrialid-endpoint-actorname",level:3},{value:"<code>registerActor(impl, actorName, actorClass)</code>",id:"registeractorimpl-actorname-actorclass",level:3},{value:"class Controller",id:"class-controller",level:2},{value:"<code>async startTrial(trialConfig = undefined, trialIdRequested = undefined)</code>",id:"async-starttrialtrialconfig--undefined-trialidrequested--undefined",level:3},{value:"<code>terminateTrial(trialIds, hard = false)</code>",id:"terminatetrialtrialids-hard--false",level:3},{value:"<code>async getTrialInfo(trialIds)</code>",id:"async-gettrialinfotrialids",level:3},{value:"<code>async watchTrials(trialStateFilters=[])</code>",id:"async-watchtrialstrialstatefilters",level:3},{value:"<code>async getActors(trialId)</code>",id:"async-getactorstrialid",level:3},{value:"<code>async getRemoteVersions()</code>",id:"async-getremoteversions",level:3},{value:"class Session",id:"class-session",level:2},{value:"<code>getTrialId()</code>",id:"gettrialid",level:3},{value:"<code>getTickId()</code>",id:"gettickid",level:3},{value:"<code>isTrialOver()</code>",id:"istrialover",level:3},{value:"<code>sendingDone()</code>",id:"sendingdone",level:3},{value:"class ActorSession extends Session",id:"class-actorsession-extends-session",level:2},{value:"<code>start(autoDoneSending=True)</code>",id:"startautodonesendingtrue",level:3},{value:"<code>async *eventLoop()</code>",id:"async-eventloop",level:3},{value:"<code>doAction(action)</code>",id:"doactionaction",level:3},{value:"<code>sendMessage(payload, to)</code>",id:"sendmessagepayload-to",level:3},{value:"enum cogment.TrialState",id:"enum-cogmenttrialstate",level:2},{value:"class TrialInfo",id:"class-trialinfo",level:2},{value:"class RecvEvent",id:"class-recvevent",level:2},{value:"enum cogment.EventType",id:"enum-cogmenteventtype",level:3},{value:"type ObservationT",id:"type-observationt",level:2},{value:"type ActionT",id:"type-actiont",level:2},{value:"class MessageBase",id:"class-messagebase",level:2},{value:"type Reward",id:"type-reward",level:2},{value:"interface IRewardSource",id:"interface-irewardsource",level:2}],p={toc:d};function c(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"javascript-sdk"},"Javascript SDK"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment-js-sdk"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/repository-cogment%2Fcogment--js--sdk-%235217b8?style=for-the-badge&logo=github",alt:"Repository"}))," ",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@cogment/cogment-js-sdk"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/npm/v/@cogment/cogment-js-sdk?style=for-the-badge",alt:"Latest release"}))),(0,i.kt)("h2",{id:"installation"},"Installation"),(0,i.kt)("p",null,"The simplest way to install the Javascript SDK is to just install it using npm:\n",(0,i.kt)("inlineCode",{parentName:"p"},"npm install @cogment/cogment-js-sdk")),(0,i.kt)("h2",{id:"general-usage"},"General usage"),(0,i.kt)("h3",{id:"the-spec-file"},"The spec file"),(0,i.kt)("p",null,"The specifications of a trial type are contained in a ",(0,i.kt)("a",{parentName:"p",href:"/docs/reference/cogment-yaml"},"spec file")," and the imported files defined in the spec. This file is typically named ",(0,i.kt)("inlineCode",{parentName:"p"},"cogment.yaml"),"."),(0,i.kt)("p",null,"For example, an ",(0,i.kt)("a",{parentName:"p",href:"/docs/guide/core-concepts#actors"},"actor")," class is defined by its required observation space and action space."),(0,i.kt)("p",null,'These "spaces" are defined by using protobuf message types (from the imported files). ',(0,i.kt)("a",{parentName:"p",href:"/docs/guide/core-concepts#observations--actions"},"Observations and actions")," will simply be instances of the appropriate type."),(0,i.kt)("p",null,"Messages and feedback user data don't have a set type, they can be any type as long as the receiver can manage that type. The type is determined by the provided message from the originator."),(0,i.kt)("p",null,"They will mostly arrive as an instance of ",(0,i.kt)("inlineCode",{parentName:"p"},"cogment.MessageBase")," and have fields according to their definition in your proto files."),(0,i.kt)("h3",{id:"trial-parameters"},"Trial Parameters"),(0,i.kt)("p",null,"The trial ",(0,i.kt)("a",{parentName:"p",href:"/docs/reference/parameters"},"parameters")," can come from the default parameters provided to the Orchestrator on startup, or from the pre-trial hooks (themselves provided to the Orchestrator on startup)."),(0,i.kt)("p",null,"The parameters are mostly indepedent of the spec file (cogment.yaml), except that the active actors listed in the parameters must have their actor class match an actor class defined in the spec file."),(0,i.kt)("p",null,"Below, when we refer to the trial parameters, we mean the final parameters after any pre-trial hooks."),(0,i.kt)("h4",{id:"compiling-the-spec-file"},"Compiling the spec file"),(0,i.kt)("p",null,'In order to use the specification found in the spec file within Javascript scripts, it needs to be compiled into Javascript modules. This is done by a tool called "cogment-js-sdk-generate".'),(0,i.kt)("h3",{id:"cogsettingsjs"},"CogSettings.js"),(0,i.kt)("p",null,"All API entry points require a cogment specification object. This specification object can be determined\nfrom the content of a project's spec file. As such, it should be generated using the ",(0,i.kt)("inlineCode",{parentName:"p"},"cogment-js-sdk-generate")," tool"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"npx cogment-js-sdk-generate config.yaml\n")),(0,i.kt)("p",null,"This will generate both a ",(0,i.kt)("inlineCode",{parentName:"p"},"CogSettings.js")," file, as well as any required compiled protocol buffer files."),(0,i.kt)("h3",{id:"imports"},"Imports"),(0,i.kt)("p",null,"Whether a script implements an actor or environment, it should import both the ",(0,i.kt)("inlineCode",{parentName:"p"},"cogment")," module (generic Javascript SDK for Cogment) and the ",(0,i.kt)("inlineCode",{parentName:"p"},"cogSettings")," module (project specific definitions created from the spec file)."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-Javascript"},"import { cogSettings } from './CogSettings';\nimport * as cogment from '@cogment/cogment-js-sdk'\n")),(0,i.kt)("h2",{id:"class-cogmentcontext"},"class cogment.Context"),(0,i.kt)("p",null,"Class to setup and run all the different aspects of trials."),(0,i.kt)("h3",{id:"constructoruserid-cogsettings"},(0,i.kt)("inlineCode",{parentName:"h3"},"constructor(userId, cogSettings)")),(0,i.kt)("p",null,"Parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"userId"),": ",(0,i.kt)("em",{parentName:"li"},"string")," - Identifier for the user of this context."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"cogSettings"),": ",(0,i.kt)("em",{parentName:"li"},"cogment.CogSettings")," - Settings module associated with trials that will be run (",(0,i.kt)("a",{parentName:"li",href:"#cog_settings.py"},"cogSettings")," namespace).")),(0,i.kt)("h3",{id:"getcontrollerendpoint"},(0,i.kt)("inlineCode",{parentName:"h3"},"getController(endpoint)")),(0,i.kt)("p",null,"Method to get a controller instance to manage trials (start, stop, inquire, etc)."),(0,i.kt)("p",null,"Parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"endpoint"),": ",(0,i.kt)("em",{parentName:"li"},"string")," - URL of the connection to the Orchestrator.")),(0,i.kt)("p",null,"Return: ",(0,i.kt)("em",{parentName:"p"},"Controller")," - An instance of the Controller class used to manage trials."),(0,i.kt)("h3",{id:"async-jointrialtrialid-endpoint-actorname"},(0,i.kt)("inlineCode",{parentName:"h3"},"async joinTrial(trialId, endpoint, actorName)")),(0,i.kt)("p",null,"Method for an actor to asynchronously join an existing trial. This task will normally end after the user implementation has exited."),(0,i.kt)("p",null,"Parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"trialId"),": ",(0,i.kt)("em",{parentName:"li"},"string")," - The UUID of the trial to join."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"endpoint"),": ",(0,i.kt)("em",{parentName:"li"},"string")," - URL of the connection to the Orchestrator."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"actorName"),": ",(0,i.kt)("em",{parentName:"li"},"string")," - Name of the actor joining the trial.")),(0,i.kt)("p",null,"Return: void"),(0,i.kt)("h3",{id:"registeractorimpl-actorname-actorclass"},(0,i.kt)("inlineCode",{parentName:"h3"},"registerActor(impl, actorName, actorClass)")),(0,i.kt)("p",null,"Method to register the asynchronous callback function that will run an actor for a trial."),(0,i.kt)("p",null,"Parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"impl"),": ",(0,i.kt)("em",{parentName:"li"},"async function(ActorSession instance)")," - Callback function to be registered."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"actorName"),": ",(0,i.kt)("em",{parentName:"li"},"string")," - Name for the actor implementation being run by the given callback function."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"actorClass"),": ",(0,i.kt)("em",{parentName:"li"},"string")," - The actor class name that can be run by the given callback function. The possible names are specified in spec file under section ",(0,i.kt)("inlineCode",{parentName:"li"},"actorClasses:name"),". If the list is empty, this implementation can run any actor class.")),(0,i.kt)("p",null,"Return: void"),(0,i.kt)("h2",{id:"class-controller"},"class Controller"),(0,i.kt)("p",null,"Class containing data and methods to control and manage trials."),(0,i.kt)("h3",{id:"async-starttrialtrialconfig--undefined-trialidrequested--undefined"},(0,i.kt)("inlineCode",{parentName:"h3"},"async startTrial(trialConfig = undefined, trialIdRequested = undefined)")),(0,i.kt)("p",null,"Method to start a new trial. The parameters of the trial will be set by the pre-trial hooks (registered in ",(0,i.kt)("inlineCode",{parentName:"p"},"cogment.Context"),"), and the hooks will receive the provided trial config."),(0,i.kt)("p",null,"Parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"trialConfig"),": ",(0,i.kt)("em",{parentName:"li"},"cogment.MessageBase")," - Configuration for the trial. The type is specified in the spec file under the section ",(0,i.kt)("inlineCode",{parentName:"li"},"trial:config_type"),". Can be ",(0,i.kt)("inlineCode",{parentName:"li"},"undefined")," if no configuration is provided. This is provided to the first pre-trial hook."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"trialIdRequested"),": ",(0,i.kt)("em",{parentName:"li"},"string")," - The trial identifier requested for the new trial. It must be unique among all active trials and a limited set of the latest ended trials (this list of trials can be retrieved with ",(0,i.kt)("inlineCode",{parentName:"li"},"getTrialInfo")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"watchTrial"),"). If provided, the Orchestrator will try to use this trialId, otherwise, a UUID will be created.")),(0,i.kt)("p",null,"Return: ",(0,i.kt)("em",{parentName:"p"},"string")," - The newly started trial ID."),(0,i.kt)("h3",{id:"terminatetrialtrialids-hard--false"},(0,i.kt)("inlineCode",{parentName:"h3"},"terminateTrial(trialIds, hard = false)")),(0,i.kt)("p",null,"Method to request the end of a trial."),(0,i.kt)("p",null,"Parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"trialIds"),": ",(0,i.kt)("em",{parentName:"li"},"string[]")," - The trial ID(s) to request to terminate. There must be at least one ID."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"hard"),": ",(0,i.kt)("em",{parentName:"li"},"boolean")," - If ",(0,i.kt)("inlineCode",{parentName:"li"},"true"),", the termination will be forced and not wait for any action or observation. If ",(0,i.kt)("inlineCode",{parentName:"li"},"false"),", the trial will wait for the next tick, to end gracefully (i.e. wait for the next full set of actions and response observations).")),(0,i.kt)("p",null,"Return: void"),(0,i.kt)("h3",{id:"async-gettrialinfotrialids"},(0,i.kt)("inlineCode",{parentName:"h3"},"async getTrialInfo(trialIds)")),(0,i.kt)("p",null,"Method to get information about a trial."),(0,i.kt)("p",null,"Parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"trialIds"),": ",(0,i.kt)("em",{parentName:"li"},"string[]")," - The trial ID(s) from which to request information. If no ID is provided, returns information about all trials. Note that ended trials may only appear for a short time in this list after they have ended.")),(0,i.kt)("p",null,"Return: ",(0,i.kt)("em",{parentName:"p"},"TrialInfo[]")," - List of trial information, one per trial. Can be empty if no trial matches."),(0,i.kt)("h3",{id:"async-watchtrialstrialstatefilters"},(0,i.kt)("inlineCode",{parentName:"h3"},"async watchTrials(trialStateFilters=[])")),(0,i.kt)("p",null,"Generator method to iterate, in real-time, through all trial states matching the filters. When called, it will first iterate over the current states matching the filters, for all trials. Afterwards, it will iterate in real-time over the matching states as they change."),(0,i.kt)("p",null,"Parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"trialStateFilters"),": ",(0,i.kt)("em",{parentName:"li"},"cogment.TrialState[]")," - List of enum values from ",(0,i.kt)("inlineCode",{parentName:"li"},"cogment.TrialState")," for which we are interested in receiving state changes.")),(0,i.kt)("p",null,"Return: ",(0,i.kt)("em",{parentName:"p"},"generator(TrialInfo instance)")," - A generator for the state changes that arrive. The ",(0,i.kt)("inlineCode",{parentName:"p"},"TrialInfo")," received here only contains the trial ID and the state."),(0,i.kt)("h3",{id:"async-getactorstrialid"},(0,i.kt)("inlineCode",{parentName:"h3"},"async getActors(trialId)")),(0,i.kt)("p",null,"Method to get the list of configured actors in a trial."),(0,i.kt)("p",null,"Parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"trialId"),": ",(0,i.kt)("em",{parentName:"li"},"string")," - The trial ID from which to request the list of actors.")),(0,i.kt)("p",null,"Return: ActorInfo[] - List of actors configured in this trial."),(0,i.kt)("h3",{id:"async-getremoteversions"},(0,i.kt)("inlineCode",{parentName:"h3"},"async getRemoteVersions()")),(0,i.kt)("p",null,"Method to get the versions from the remote Orchestrator."),(0,i.kt)("p",null,"Parameters: None"),(0,i.kt)("p",null,"Return: ",(0,i.kt)("em",{parentName:"p"},"{","[key: string]",": string}")," - The key of the object is the name of the component (",(0,i.kt)("em",{parentName:"p"},"string"),"), and the value is the version (",(0,i.kt)("em",{parentName:"p"},"string"),")."),(0,i.kt)("h2",{id:"class-session"},"class Session"),(0,i.kt)("p",null,"Abstract class that manages aspects of a trial. Contains data and methods common to all sessions ."),(0,i.kt)("h3",{id:"gettrialid"},(0,i.kt)("inlineCode",{parentName:"h3"},"getTrialId()")),(0,i.kt)("p",null,"Method to get the UUID of the trial managed by this session."),(0,i.kt)("p",null,"Parameters: None"),(0,i.kt)("p",null,"Return: ",(0,i.kt)("em",{parentName:"p"},"string")," - UUID of the trial."),(0,i.kt)("h3",{id:"gettickid"},(0,i.kt)("inlineCode",{parentName:"h3"},"getTickId()")),(0,i.kt)("p",null,"Method to get the current tick id of the trial (i.e. time step)."),(0,i.kt)("p",null,"Parameters: None"),(0,i.kt)("p",null,"Return: ",(0,i.kt)("em",{parentName:"p"},"number")," - The current tick id."),(0,i.kt)("h3",{id:"istrialover"},(0,i.kt)("inlineCode",{parentName:"h3"},"isTrialOver()")),(0,i.kt)("p",null,"Method to inquire if the current trial has ended."),(0,i.kt)("p",null,"Parameters: None"),(0,i.kt)("p",null,"Return: ",(0,i.kt)("em",{parentName:"p"},"boolean")," - True if the trial has ended, false otherwise."),(0,i.kt)("h3",{id:"sendingdone"},(0,i.kt)("inlineCode",{parentName:"h3"},"sendingDone()")),(0,i.kt)("p",null,"Method to notify the Orchestrator that all data for the trial, from this session, has been sent. This can be called only when the session is ending. When starting the session (see ",(0,i.kt)("inlineCode",{parentName:"p"},"ActorSession"),"), if the ",(0,i.kt)("inlineCode",{parentName:"p"},"autoDoneSending")," parameter is True, this method should not be called, and if the parameter is False, it MUST be called to end the trial properly."),(0,i.kt)("p",null,"Parameters: None"),(0,i.kt)("p",null,"Return: void"),(0,i.kt)("h2",{id:"class-actorsession-extends-session"},"class ActorSession extends Session"),(0,i.kt)("h3",{id:"startautodonesendingtrue"},(0,i.kt)("inlineCode",{parentName:"h3"},"start(autoDoneSending=True)")),(0,i.kt)("p",null,"Method to start the actor. This method should be called before any other method in the session."),(0,i.kt)("p",null,"Parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"autoDoneSending"),": ",(0,i.kt)("em",{parentName:"li"},"boolean")," - Controls when to notify the Orchestrator that all data has been sent. If True, the session will automatically send the notification after receiving the last observation. If False, the user MUST call ",(0,i.kt)("inlineCode",{parentName:"li"},"sendingDone")," to end the trial properly.")),(0,i.kt)("p",null,"Return: void"),(0,i.kt)("h3",{id:"async-eventloop"},(0,i.kt)("inlineCode",{parentName:"h3"},"async *eventLoop()")),(0,i.kt)("p",null,"Generator method to iterate over all events (observations, rewards, messages) as they are received. This will block and wait for an event.\nWhen this generator exits, the callback function (registered with ",(0,i.kt)("inlineCode",{parentName:"p"},"registerActor"),') should return to end the trial cleanly.\nThe generator will exit for various reasons indicating the end of the trial, a loss of communication with the orchestrator, or if the generator is sent "False".'),(0,i.kt)("p",null,"Parameters: None"),(0,i.kt)("p",null,"Return: ",(0,i.kt)("em",{parentName:"p"},"AsyncGenerator<RecvEvent",">")," - A generator for the events that arrive. The ",(0,i.kt)("inlineCode",{parentName:"p"},"RecvEvent")," instances received from this generator will not contain actions. When receiving an observation in the event, the ",(0,i.kt)("inlineCode",{parentName:"p"},"this.doAction"),' method is normally used to "reply" (if the event type is ',(0,i.kt)("inlineCode",{parentName:"p"},"EventType.ACTIVE"),")."),(0,i.kt)("h3",{id:"doactionaction"},(0,i.kt)("inlineCode",{parentName:"h3"},"doAction(action)")),(0,i.kt)("p",null,"Method to send actions to the environment."),(0,i.kt)("p",null,"Parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"action"),": ",(0,i.kt)("em",{parentName:"li"},"ActionT")," - An instance of the action space class specified in the corresponding section ",(0,i.kt)("inlineCode",{parentName:"li"},"actorClasses:action:space")," of the spec file. If ",(0,i.kt)("inlineCode",{parentName:"li"},"undefined"),", then no action space is sent (empty content) and the environment will receive a default initialized action space of the appropriate type.")),(0,i.kt)("p",null,"Return: void"),(0,i.kt)("h3",{id:"sendmessagepayload-to"},(0,i.kt)("inlineCode",{parentName:"h3"},"sendMessage(payload, to)")),(0,i.kt)("p",null,"Method to send a message related to the current time step (tick id)."),(0,i.kt)("p",null,"Parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"payload"),": ",(0,i.kt)("em",{parentName:"li"},"cogment.MessageBase")," - The message data to be sent. The class can be any protobuf class. It is the responsibility of the receiving actor to manage the class received."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"to"),": ",(0,i.kt)("em",{parentName:"li"},"string[]")," - Targets of feedback. Each value could be the name of an actor in the trial, or the name of the environment (from ",(0,i.kt)("inlineCode",{parentName:"li"},"this.envName"),'). Or it could represent a set of actors (with wildcards); A set of actors can be represented with the wildcard character "',(0,i.kt)("inlineCode",{parentName:"li"},"*"),'" for all actors (of all classes), or "',(0,i.kt)("inlineCode",{parentName:"li"},"actorClass.*"),'" for all actors of a specific class (the ',(0,i.kt)("inlineCode",{parentName:"li"},"actorClass")," must match one of the classes listed in the trial parameters). Note that the wildcard does not include the environment.")),(0,i.kt)("p",null,"Return: void"),(0,i.kt)("h2",{id:"enum-cogmenttrialstate"},"enum cogment.TrialState"),(0,i.kt)("p",null,"Enum representing the various states of trials."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"UNKNOWN: Should not be used."),(0,i.kt)("li",{parentName:"ul"},"INITIALIZING: The trial is in the process of starting."),(0,i.kt)("li",{parentName:"ul"},"PENDING: The trial is waiting for its final parameters, before running."),(0,i.kt)("li",{parentName:"ul"},"RUNNING: The trial is running."),(0,i.kt)("li",{parentName:"ul"},"TERMINATING: The trial is in the process of terminating (either a request to terminate has been received or the last observation has been received)."),(0,i.kt)("li",{parentName:"ul"},"ENDED: The trial has ended. Only a set number of ended trials will be kept (configured in the Orchestrator).")),(0,i.kt)("p",null,"For further information on trial lifetime, check the ",(0,i.kt)("a",{parentName:"p",href:"/docs/guide/development-guide#trial-lifetime"},"dedicated section"),"."),(0,i.kt)("h2",{id:"class-trialinfo"},"class TrialInfo"),(0,i.kt)("p",null,"Class enclosing the details of a trial."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"trialId"),": ",(0,i.kt)("em",{parentName:"p"},"string")," - The trial ID to which the details pertain."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"state"),": ",(0,i.kt)("em",{parentName:"p"},"cogment.TrialState")," - The current state of the trial."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"envName"),": ",(0,i.kt)("em",{parentName:"p"},"string")," - The name of the environment running the trial."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"tickId"),": ",(0,i.kt)("em",{parentName:"p"},"number")," - The time step that the information relates to. Only provided from a call to ",(0,i.kt)("inlineCode",{parentName:"p"},"getTrialInfo"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"duration"),": ",(0,i.kt)("em",{parentName:"p"},"number")," - The time (in nanoseconds) that the trial has run. Only provided from a call to ",(0,i.kt)("inlineCode",{parentName:"p"},"getTrialInfo"),"."),(0,i.kt)("h2",{id:"class-recvevent"},"class RecvEvent"),(0,i.kt)("p",null,"Class representing a received event (for environments and actors). It can contain any combination of data according to the receiver needs, or even be empty, but it will always have a type."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"type"),": ",(0,i.kt)("em",{parentName:"p"},"EventType")," - Type of event the enclosed data represents."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"observation"),": ",(0,i.kt)("em",{parentName:"p"},"ObservationT")," - Observation data. This can only be received by actors. ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," if not present."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"actions"),": ",(0,i.kt)("em",{parentName:"p"},"ActionT")," - Action data from actors. This can only be received by the environment. The list is empty if not present."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"rewards"),": ",(0,i.kt)("em",{parentName:"p"},"Reward[]")," - Reward values and data. This can only be received by actors. The list is empty if not present."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"messages"),": ",(0,i.kt)("em",{parentName:"p"},"MessageBase[]")," - Message data. The list is empty if not present."),(0,i.kt)("h3",{id:"enum-cogmenteventtype"},"enum cogment.EventType"),(0,i.kt)("p",null,"Enum representing the type of an event."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"EventType.NONE"),": Empty event. This kind of event should never be received.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"EventType.ACTIVE"),": Normal event from an active trial. Most events will be of this type.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"EventType.ENDING"),": Events from a trial in the process of ending. For the environment, this means that these events contain the last actions from the actors, and the trial is awaiting a final observation. For the actors, this means that the trial is ending and no action can/need to be sent in response. Note that because of network timing, there may be ",(0,i.kt)("inlineCode",{parentName:"p"},"ACTIVE")," events (e.g. rewards or messages) arriving after some ",(0,i.kt)("inlineCode",{parentName:"p"},"ENDING")," events, but the trial is ending regardless.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"EventType.FINAL"),": Final event for the trial. This does not contain data. The event loop will exit after this event is delivered. This event can be ignored if nothing needs to be done before exiting the loop."))),(0,i.kt)("p",null,"For further information on trial lifetime, check the ",(0,i.kt)("a",{parentName:"p",href:"/docs/guide/development-guide#trial-lifetime"},"dedicated section"),"."),(0,i.kt)("h2",{id:"type-observationt"},"type ObservationT"),(0,i.kt)("p",null,"Type containing the details of an actor's observation. This will be different depending on what the ActionSpace defined in your spec file contains"),(0,i.kt)("h2",{id:"type-actiont"},"type ActionT"),(0,i.kt)("p",null,"Type containing the details of an action from an actor. This will be different depending on what the ActionSpace defined in your spec file contains"),(0,i.kt)("h2",{id:"class-messagebase"},"class MessageBase"),(0,i.kt)("p",null,"Base Class of all messages, this will contain different fields depending on what fields are in the specific message you are receiving (defined in proto files)"),(0,i.kt)("h2",{id:"type-reward"},"type Reward"),(0,i.kt)("p",null,"type containing the details of a received reward."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"tickId"),": ",(0,i.kt)("em",{parentName:"p"},"number")," - The tick id (time step) for which the reward should be applied."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"receiverName"),": ",(0,i.kt)("em",{parentName:"p"},"string")," - Name of the receiver for the reward (the name of an actor, or wildcard string)."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"value"),": ",(0,i.kt)("em",{parentName:"p"},"float")," - Value of the reward (aggregated from the sources)"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"sources"),": ",(0,i.kt)("em",{parentName:"p"},"IRewardSource[]")," - List of sources that gave this reward"),(0,i.kt)("h2",{id:"interface-irewardsource"},"interface IRewardSource"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"senderName"),": ",(0,i.kt)("em",{parentName:"p"},"string")," - Name of the reward sender;"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"value"),": ",(0,i.kt)("em",{parentName:"p"},"number")," - Value of the reward;"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"confidence"),": ",(0,i.kt)("em",{parentName:"p"},"number")," - Confidence of this reward;"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"userData"),": ",(0,i.kt)("em",{parentName:"p"},"google.protobuf.IAny")," - Extra data;"))}c.isMDXComponent=!0}}]);