"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[505],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>h});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},m=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=p(a),h=r,u=c["".concat(s,".").concat(h)]||c[h]||d[h]||i;return a?n.createElement(u,o(o({ref:t},m),{},{components:a})):n.createElement(u,o({ref:t},m))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},9214:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const i={sidebar_position:8},o="Cogment 2.0",l={unversionedId:"reference/cogment-v2-changes",id:"reference/cogment-v2-changes",title:"Cogment 2.0",description:"This document describes the full list of the changes for Cogment 2.O. A migration guide is available there.",source:"@site/docs/reference/cogment-v2-changes.md",sourceDirName:"reference",slug:"/reference/cogment-v2-changes",permalink:"/docs/reference/cogment-v2-changes",draft:!1,tags:[],version:"current",lastUpdatedAt:1682371745,formattedLastUpdatedAt:"Apr 24, 2023",sidebarPosition:8,frontMatter:{sidebar_position:8},sidebar:"docSidebar",previous:{title:"gRPC API",permalink:"/docs/reference/grpc"},next:{title:"Apache License",permalink:"/docs/license"}},s={},p=[{value:"Breaking changes",id:"breaking-changes",level:2},{value:"Cogment.yaml",id:"cogmentyaml",level:3},{value:"Python SDK",id:"python-sdk",level:3},{value:"Javascript SDK",id:"javascript-sdk",level:3},{value:"Datalog sample",id:"datalog-sample",level:3},{value:"Orchestrator",id:"orchestrator",level:3},{value:"Deprecated Behaviors",id:"deprecated-behaviors",level:2},{value:"Cogment.yaml",id:"cogmentyaml-1",level:3},{value:"Orchestrator",id:"orchestrator-1",level:3},{value:"Python SDK",id:"python-sdk-1",level:3},{value:"New Functionalities",id:"new-functionalities",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Python SDK",id:"python-sdk-2",level:3}],m={toc:p};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"cogment-20"},"Cogment 2.0"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"This document describes the full list of the changes for Cogment 2.O. A migration guide is available ",(0,r.kt)("a",{parentName:"p",href:"/docs/guide/implementation-recipes/v2-migration-guide"},"there"),".")),(0,r.kt)("p",null,"Cogment 2.0 is a massive internal change to Cogment, starting with the underlying gRPC API that has seen a major refactoring. But there is a minimal amount of changes that affect the use of cogment. The changes that affect users are in three categories: breaking changes, deprecated behavior and new functionalities."),(0,r.kt)("h2",{id:"breaking-changes"},"Breaking changes"),(0,r.kt)("p",null,"These are changes that, if the related features were used, will prevent Cogment v1 projects from working with Cogment v2. They represent the minimum changes necessary to upgrade to v2."),(0,r.kt)("h3",{id:"cogmentyaml"},"Cogment.yaml"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Delta types of observations (and all related settings) are not supported anymore. This means that in cogment.yaml, these sections are now ignored:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"import::python")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"import::javascript")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"actor_classes::observation::delta")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"actor_classes::observation::delta_apply_fn")))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"config")," (for trial, environment and actor) are not accepted in the parameters section anymore.")),(0,r.kt)("h3",{id:"python-sdk"},"Python SDK"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"Session.get_active_actors()")," method has been restricted to the environment only. This means that actors cannot call this method anymore (it will raise an exception). If actors need the full list of actors, there are a few possibilities:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Create a controller in the actor implementation and use the ",(0,r.kt)("inlineCode",{parentName:"li"},"Controller.get_actors()")," method."),(0,r.kt)("li",{parentName:"ul"},"Receive the actor list in the config from the pre-trial hooks; the pre-trial hooks have implicit knowledge of all actors (at least the last hook)."),(0,r.kt)("li",{parentName:"ul"},"Add the information in the actors observation space."),(0,r.kt)("li",{parentName:"ul"},"Send the information in a message."))),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"EnvironmentSession.send_message()")," method will not accept a ",(0,r.kt)("inlineCode",{parentName:"li"},"to_environment")," parameter anymore (since it does not make sense anyway)."),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"Controller.terminate_trial()")," method parameter ",(0,r.kt)("inlineCode",{parentName:"li"},"trial_id")," has been renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"trial_ids"),"."),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"Controller.get_trial_info()")," method parameter ",(0,r.kt)("inlineCode",{parentName:"li"},"trial_id")," has been renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"trial_ids"),".")),(0,r.kt)("h3",{id:"javascript-sdk"},"Javascript SDK"),(0,r.kt)("p",null,"Except for the following, everything has been subject to breaking changes:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The shape of the observation object has remained the same"),(0,r.kt)("li",{parentName:"ul"},"You can keep the actor function that you have in your v1 project")),(0,r.kt)("p",null,"Please refer to the new ",(0,r.kt)("a",{parentName:"p",href:"/docs/reference/javascript"},"Javascript API Reference")),(0,r.kt)("h3",{id:"datalog-sample"},"Datalog sample"),(0,r.kt)("p",null,"Since the Datalog samples, unlike everything else in the SDK, used the raw API protobuf, it has implicitly changed. But in v2, there is now a wrapper for it, which replaces direct access to the protobuf content."),(0,r.kt)("p",null,"If people still have serialized v1 data stored (e.g. in a database), v1 versions of the sample protobuf messages (",(0,r.kt)("inlineCode",{parentName:"p"},"DatalogSample_v1"),") are provided in the API for convenience, so users can deserialize the data into v1 samples and extract the information."),(0,r.kt)("p",null,"For more info, visit the ",(0,r.kt)("a",{parentName:"p",href:"/docs/reference/grpc#LogExporterSampleRequest"},"gRPC api")," documentation"),(0,r.kt)("h3",{id:"orchestrator"},"Orchestrator"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The environment variables read by the Orchestrator on start have changed names to help prevent clashes.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"TRIAL_LIFECYCLE_PORT")," becomes ",(0,r.kt)("inlineCode",{parentName:"li"},"COGMENT_LIFECYCLE_PORT")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"TRIAL_ACTOR_PORT")," becomes ",(0,r.kt)("inlineCode",{parentName:"li"},"COGMENT_ACTOR_PORT")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"PROMETHEUS_PORT")," becomes ",(0,r.kt)("inlineCode",{parentName:"li"},"COGMENT_ORCHESTRATOR_PROMETHEUS_PORT")))),(0,r.kt)("li",{parentName:"ul"},"The Orchestrator does not search for the file named ",(0,r.kt)("inlineCode",{parentName:"li"},"cogment.yaml")," as the default spec file anymore. The spec file name must be explicit on the command line using ",(0,r.kt)("inlineCode",{parentName:"li"},"--config=cogment.yaml"),"."),(0,r.kt)("li",{parentName:"ul"},"For further information, refer to the ",(0,r.kt)("a",{parentName:"li",href:"/docs/reference/cli/orchestrator"},"Orchestrator documentation"),".")),(0,r.kt)("h2",{id:"deprecated-behaviors"},"Deprecated Behaviors"),(0,r.kt)("p",null,"These are changes that are optional to upgrade to Cogment v2, but will eventually be phased out and become breaking changes in a future version. If these features are used with Cogment v2, warnings will be issued."),(0,r.kt)("h3",{id:"cogmentyaml-1"},"Cogment.yaml"),(0,r.kt)("p",null,"The spec file is not used by the Orchestrator anymore, and when used by the other components, these sections of the file will be ignored:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"trial_params")," section is not needed anymore (since the Orchestrator has its own parameters file)"),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"datalog")," section is deprecated (the details of the datalog have been moved to the Orchestrator parameters file)"),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"trial:pre-hooks")," section is deprecated (these values are now passed to the Orchestrator on the command line)")),(0,r.kt)("p",null,"For more information, visit the ",(0,r.kt)("a",{parentName:"p",href:"/docs/reference/cogment-yaml"},"Cogment.yaml documentation"),"."),(0,r.kt)("h3",{id:"orchestrator-1"},"Orchestrator"),(0,r.kt)("p",null,"Providing a spec file (cogment.yaml) to the Orchestrator is deprecated. The new behavior is as follows:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Provide a YAML default parameters file (command line option ",(0,r.kt)("inlineCode",{parentName:"li"},"--params"),") with the top level section ",(0,r.kt)("inlineCode",{parentName:"li"},"trial_params"),"."),(0,r.kt)("li",{parentName:"ul"},"Add the datalog section to the parameters (if desired), without type (for type ",(0,r.kt)("inlineCode",{parentName:"li"},"none")," just omit the datalog section). I.e. Whereas the spec file was defining a single data logger for all trials, the new Orchestrator can have a different data logger for each trial, and thus a datalog section is now found in the trial default parameters. Example of the new parameters datalog section:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"trial_params:\n    datalog:\n        - endpoint: grpc://logger:9000\n        - exclude_fields: [messages, actions]\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The endpoint for a client actor in the parameters must now be ",(0,r.kt)("inlineCode",{parentName:"li"},"cogment://client")," instead of just ",(0,r.kt)("inlineCode",{parentName:"li"},"client"),". E.g.:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"trial_params:\n    actors:\n        - endpoint: cogment://client\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Pre-trial hooks are defined on the command line (or environment variable) as opposed to being found in the spec file.")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"The Cogment Orchestrator and the generate tools ignore the sections of the YAML files that are not relevant to them, therefore the content of the spec and parameters files can be combined in a single file safely.")),(0,r.kt)("p",null,"The Orchestrator needs a parameters file or pre-trial hooks (or both). Thus with pre-trial hooks and no parameters file (or a carefully defined parameters file) the Orchestrator is now independent of any trial specifications (spec file) and can run any type of trial. With a fully defined parameters file and no hooks, the Orchestrator can work as before for simple projects."),(0,r.kt)("h3",{id:"python-sdk-1"},"Python SDK"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#send_messageself-payload-to"},(0,r.kt)("inlineCode",{parentName:"a"},"ActorSession.send_message()"))," method should not use the ",(0,r.kt)("inlineCode",{parentName:"li"},"to_environment"),' parameter anymore. The environment is targeted using its name (defaulted to "env" if not given specifically, or ',(0,r.kt)("inlineCode",{parentName:"li"},"ActorSession.env_name"),")."),(0,r.kt)("li",{parentName:"ul"},"The joining of a trial by a client actor (",(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#async-join_trialself-trial_id-endpoint-impl_namenone-actor_namenone-actor_classnone"},(0,r.kt)("inlineCode",{parentName:"a"},"Context.join_trial()")),") should now be made by providing an actor name or class (unlike previously where an implementation name was provided). This is to allow the pre-trial hooks to decide on the details of the actor (including implementation) that should be used, the same way as for service actors."),(0,r.kt)("li",{parentName:"ul"},"In ",(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#class-recvobservation"},(0,r.kt)("inlineCode",{parentName:"a"},"RecvObservation")),", the ",(0,r.kt)("inlineCode",{parentName:"li"},"snapshot")," attribute is deprecated. A new attribute ",(0,r.kt)("inlineCode",{parentName:"li"},"observation")," takes its place."),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#terminate_trialself-trial_ids-hardfalse"},(0,r.kt)("inlineCode",{parentName:"a"},"Controller.terminate_trial()"))," method parameter ",(0,r.kt)("inlineCode",{parentName:"li"},"trial_ids")," now takes a list of IDs (instead of a single string for one ID)."),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#async-get_trial_infoself-trial_ids"},(0,r.kt)("inlineCode",{parentName:"a"},"Controller.get_trial_info()"))," method parameter ",(0,r.kt)("inlineCode",{parentName:"li"},"trial_ids")," now takes a list of IDs (instead of a single string for one ID or ",(0,r.kt)("inlineCode",{parentName:"li"},"None"),")."),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"url")," attribute of ",(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#class-cogmentendpoint"},(0,r.kt)("inlineCode",{parentName:"a"},"cogment.Endpoint"))," must now be a gRPC type URL (i.e. start with ",(0,r.kt)("inlineCode",{parentName:"li"},"grpc://"),"). ",(0,r.kt)("inlineCode",{parentName:"li"},"Endpoint")," is used to join a trial and to get a Controller.")),(0,r.kt)("h2",{id:"new-functionalities"},"New Functionalities"),(0,r.kt)("p",null,"These are changes that are additional and transparent to a v1 project."),(0,r.kt)("h3",{id:"parameters"},"Parameters"),(0,r.kt)("p",null,"These are the parameters defined in the new file given to the Orchestrator, and that can be changed by pre-trial hooks."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The environment can be given a ",(0,r.kt)("inlineCode",{parentName:"li"},"name"),', similarly to the actors. If not given, it defaults to "env".')),(0,r.kt)("h3",{id:"python-sdk-2"},"Python SDK"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"When starting a trial (",(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#async-start_trialself-trial_confignone-trial_id_requestednone"},(0,r.kt)("inlineCode",{parentName:"a"},"Controller.start_trial()")),"), a new ",(0,r.kt)("inlineCode",{parentName:"li"},"trial_id_requested"),' parameter requests the trial ID to be a specific string instead of an automatic UUID. It is a "request" because the trial will not start if the id conflicts with another active trial; an empty ID string will be returned if the trial is not started.'),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#terminate_trialself-trial_ids-hardfalse"},(0,r.kt)("inlineCode",{parentName:"a"},"Controller.terminate_trial()"))," method has a new parameter ",(0,r.kt)("inlineCode",{parentName:"li"},"hard"),'. This parameter forces a hard/immediate termination of the trial. As opposed to a "soft" termination which will wait for the next tick to terminate nicely.'),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"ActorSession")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"EnvironmentSession")," have a new method ",(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#sending_doneself"},(0,r.kt)("inlineCode",{parentName:"a"},"sending_done()"))," to indicate that they have finished sending data and will now only be listening until the end of the trial. This is required only if the new ",(0,r.kt)("inlineCode",{parentName:"li"},"auto_done_sending")," parameter of the ",(0,r.kt)("inlineCode",{parentName:"li"},"start()")," method is ",(0,r.kt)("inlineCode",{parentName:"li"},"False")," (It is ",(0,r.kt)("inlineCode",{parentName:"li"},"True")," by default for backward compatibility). This only needs to be manually done (i.e. ",(0,r.kt)("inlineCode",{parentName:"li"},"auto_done_sending=False"),") in special situations."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#get_user_idself"},(0,r.kt)("inlineCode",{parentName:"a"},"PrehookSession.get_user_id()"))," new method."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#class-prehooksession"},(0,r.kt)("inlineCode",{parentName:"a"},"PrehookSession.environment_name"))," new attribute."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#class-datalogsession"},(0,r.kt)("inlineCode",{parentName:"a"},"DatalogSession.user_id"))," new attribute (this info used to be available in the protobuf ",(0,r.kt)("inlineCode",{parentName:"li"},"DatalogSample"),")."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/reference/python#class-recvaction"},(0,r.kt)("inlineCode",{parentName:"a"},"RecvAction.tick_id"))," new attribute.")))}d.isMDXComponent=!0}}]);