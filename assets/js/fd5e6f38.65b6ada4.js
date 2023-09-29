"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[3106],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>u});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},m=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=s(n),u=o,h=c["".concat(p,".").concat(u)]||c[u]||d[u]||i;return n?a.createElement(h,r(r({ref:t},m),{},{components:n})):a.createElement(h,r({ref:t},m))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var s=2;s<i;s++)r[s]=n[s];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},845:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var a=n(7462),o=(n(7294),n(3905));const i={},r="Migrate from Cogment v1 to v2",l={unversionedId:"guide/implementation-recipes/v2-migration-guide",id:"guide/implementation-recipes/v2-migration-guide",title:"Migrate from Cogment v1 to v2",description:"This document is written as a guide to migrate from Cogment v1 to v2, a full list of the changes is also available here.",source:"@site/docs/guide/implementation-recipes/v2-migration-guide.md",sourceDirName:"guide/implementation-recipes",slug:"/guide/implementation-recipes/v2-migration-guide",permalink:"/docs/guide/implementation-recipes/v2-migration-guide",draft:!1,tags:[],version:"current",lastUpdatedAt:1696019767,formattedLastUpdatedAt:"Sep 29, 2023",frontMatter:{},sidebar:"docSidebar",previous:{title:"Configure Trial from Controller",permalink:"/docs/guide/implementation-recipes/configure-trial-from-controller"},next:{title:"Tutorial",permalink:"/docs/guide/tutorial/"}},p={},s=[{value:"Updating components",id:"updating-components",level:2},{value:"<code>cogment.yaml</code> split in a spec file and a parameters file",id:"cogmentyaml-split-in-a-spec-file-and-a-parameters-file",level:2},{value:"pre-trial hooks definition moved to an orchestrator configuration",id:"pre-trial-hooks-definition-moved-to-an-orchestrator-configuration",level:2},{value:"Datalog definition now part of each trial&#39;s parameters",id:"datalog-definition-now-part-of-each-trials-parameters",level:2},{value:"Datalog API has changed, and now has a python wrapper",id:"datalog-api-has-changed-and-now-has-a-python-wrapper",level:2},{value:"Default trial parameters no longer support definition user configuration for trials, environments and actors",id:"default-trial-parameters-no-longer-support-definition-user-configuration-for-trials-environments-and-actors",level:2},{value:"Prefer using full URL for endpoints",id:"prefer-using-full-url-for-endpoints",level:2},{value:"Support for &quot;delta&quot; observations discontinued",id:"support-for-delta-observations-discontinued",level:2},{value:"New code generation workflow",id:"new-code-generation-workflow",level:2},{value:"Orchestrator environment variables namespaced",id:"orchestrator-environment-variables-namespaced",level:2},{value:"Trials&#39; environments can be named",id:"trials-environments-can-be-named",level:2},{value:"Python SDK",id:"python-sdk",level:2},{value:"Javascript SDK",id:"javascript-sdk",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2}],m={toc:s};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"migrate-from-cogment-v1-to-v2"},"Migrate from Cogment v1 to v2"),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"This document is written as a guide to migrate from Cogment v1 to v2, a full list of the changes is also available ",(0,o.kt)("a",{parentName:"p",href:"/docs/reference/cogment-v2-changes"},"here"),".")),(0,o.kt)("h2",{id:"updating-components"},"Updating components"),(0,o.kt)("p",null,"The following components needs to be updated to work with Cogment v2:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Update the CLI to the latest version and check that the version is correct"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-console"},"curl --silent -L https://raw.githubusercontent.com/cogment/cogment-cli/main/install.sh | sudo bash\n")),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-console"},"cogment version\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Update the docker images to the versions compatible with the 2.0 API. These should be updated in ",(0,o.kt)("inlineCode",{parentName:"p"},"Dockerfile"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"*.dockerfile")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"docker-compose.yml")," files in your project. The minimal version to use API 2.0 are:"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"cogment/orchestrator:v2.0.0")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"cogment/trial-datastore:v0.2.0")," (prereleased component)"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"cogment/model-registry:v0.4.0")," (prereleased component)"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Update the version of the python SDK to ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment[generate]>=2.0.2")," (learn more about generate ",(0,o.kt)("a",{parentName:"p",href:"#new-code-generation-workflow"},"here"),") in your ",(0,o.kt)("inlineCode",{parentName:"p"},"requirements.txt")," files or equivalent.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Update the version of the javascript SDK to ",(0,o.kt)("inlineCode",{parentName:"p"},"@cogment/cogment-js-sdk^2")," in your ",(0,o.kt)("inlineCode",{parentName:"p"},"package.json")," files or equivalent."))),(0,o.kt)("h2",{id:"cogmentyaml-split-in-a-spec-file-and-a-parameters-file"},(0,o.kt)("inlineCode",{parentName:"h2"},"cogment.yaml")," split in a spec file and a parameters file"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment.yaml")," file has seen a lot of changes, the most important one is that we now differ between the ",(0,o.kt)("strong",{parentName:"p"},"spec file")," which specifies the types of trial for a cogment project, including actor classes and their action/observation spaces, and the ",(0,o.kt)("strong",{parentName:"p"},"parameters file")," which specifies default parameters for trials. The spec file is used in the code generation process of each SDKs and is no longer used by the orchestrator. The parameters file is used by the orchestrator, if you use pre-trial hooks to configure the started trials it might not be necessary."),(0,o.kt)("p",null,"We now recommand that two different files, respectively named ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment.yaml")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"params.yaml")," be used, however you can still use one file containing both content."),(0,o.kt)("admonition",{title:"Recommended update",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Move the ",(0,o.kt)("inlineCode",{parentName:"p"},"trial_params")," section of the existing ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment.yaml")," file to a dedicated ",(0,o.kt)("inlineCode",{parentName:"p"},"params.yaml")," file."),(0,o.kt)("p",{parentName:"admonition"},"Further changes are required to both sections, as described below.")),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"If the ",(0,o.kt)("inlineCode",{parentName:"p"},"--config=cogment.yaml")," was provided to the orchestrator, remove it."),(0,o.kt)("p",{parentName:"admonition"},"To provide a parameters file to the orchestrator use the ",(0,o.kt)("inlineCode",{parentName:"p"},"--params=params.yaml")," command line option.")),(0,o.kt)("p",null,"Further details can be found in the ",(0,o.kt)("a",{parentName:"p",href:"/docs/reference/cogment-yaml"},"spec file documentation"),"."),(0,o.kt)("h2",{id:"pre-trial-hooks-definition-moved-to-an-orchestrator-configuration"},"pre-trial hooks definition moved to an orchestrator configuration"),(0,o.kt)("p",null,"pre-trial hooks are no longer defined in the ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment.yaml")," file, but instead are now given to the orchestrator as a command line option or through an environment variable."),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Remove the ",(0,o.kt)("inlineCode",{parentName:"p"},"trial:pre-hooks")," section from the spec file. Instead specify the hook addresses as gRPC URLs, e.g. ",(0,o.kt)("inlineCode",{parentName:"p"},"grpc://1.1.1.1:9000"),", using the orchestrator cli option ",(0,o.kt)("inlineCode",{parentName:"p"},"--pre_trial_hooks"),", separating potential multiple hooks with comas.")),(0,o.kt)("p",null,"Further details can be found in the ",(0,o.kt)("a",{parentName:"p",href:"/docs/reference/cli/orchestrator"},"orchestrator documentation"),"."),(0,o.kt)("h2",{id:"datalog-definition-now-part-of-each-trials-parameters"},"Datalog definition now part of each trial's parameters"),(0,o.kt)("p",null,"The datalog definition is no longer a project-wide configuration but can be specified for each trial in its parameters."),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Remove the ",(0,o.kt)("inlineCode",{parentName:"p"},"datalog")," section from the spec file."),(0,o.kt)("p",{parentName:"admonition"},"Datalog can be defined in the parameters file with the following format:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"trial_params:\n    datalog:\n        - endpoint: grpc://logger:9000\n")),(0,o.kt)("p",{parentName:"admonition"},"It can also be defined when configuring the trial in the pre-trial hook.")),(0,o.kt)("h2",{id:"datalog-api-has-changed-and-now-has-a-python-wrapper"},"Datalog API has changed, and now has a python wrapper"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Instead of returning raw protobuf messages, Python wrapper objects are returned, so access to the raw messages is not available anymore"),(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("inlineCode",{parentName:"li"},"DatalogSession")," attribute ",(0,o.kt)("inlineCode",{parentName:"li"},"raw_trial_params")," is not available anymore."),(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("inlineCode",{parentName:"li"},"DatalogSession")," attribute ",(0,o.kt)("inlineCode",{parentName:"li"},"trial_params")," returns a ",(0,o.kt)("inlineCode",{parentName:"li"},"cogment.LogParams")," object instead of a protobuf message."),(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("inlineCode",{parentName:"li"},"DatalogSession.get_all_samples()")," now generates ",(0,o.kt)("inlineCode",{parentName:"li"},"cogment.LogSample")," objects instead of a protobuf message."),(0,o.kt)("li",{parentName:"ul"},"If there is a need to deserialize v1 data (e.g. from an old database), v1 versions of the sample protobuf messages (",(0,o.kt)("inlineCode",{parentName:"li"},"cogment.api.datalog_pb2.TrialParams_v1")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"cogment.api.datalog_pb2.DatalogSample_v1"),") are provided in the API for convenience.")),(0,o.kt)("p",null,"For more information, please see the following sections of the Python SDK Documentation"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/docs/reference/python#class-cogmentlogsample"},"LogSample")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/docs/reference/python#class-datalogsession"},"DatalogSession"))),(0,o.kt)("h2",{id:"default-trial-parameters-no-longer-support-definition-user-configuration-for-trials-environments-and-actors"},"Default trial parameters no longer support definition user configuration for trials, environments and actors"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"config")," sections that were used to define default user configuration of trials, environments and actors are no longer supported. If necessary, these must be provided when starting the trial, for the trial config, and in pre-trial hooks, for the environment and actors config. Defaults can also be defined in the implementation code itself."),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Remove the ",(0,o.kt)("inlineCode",{parentName:"p"},"config")," sections (for trial, environment and actor) from the params file."),(0,o.kt)("p",{parentName:"admonition"},"For simple projects, provide a default configuration in the implementation code directly, for more complex one use a pre-trial hook.")),(0,o.kt)("h2",{id:"prefer-using-full-url-for-endpoints"},"Prefer using full URL for endpoints"),(0,o.kt)("admonition",{title:"Recommended update",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Use full gRPC URLs, starting with ",(0,o.kt)("inlineCode",{parentName:"p"},"grpc://"),", when defining endpoints in the params file on in the SDKs.")),(0,o.kt)("p",null,"Additionaly, to prepare for further features, we are introducing a ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment")," URL scheme. At the moment only the special ",(0,o.kt)("em",{parentName:"p"},"client")," endpoint is concerned."),(0,o.kt)("admonition",{title:"Recommended update",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"If actors are clients, replace the endpoint value from ",(0,o.kt)("inlineCode",{parentName:"p"},"client")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment://client"))),(0,o.kt)("h2",{id:"support-for-delta-observations-discontinued"},'Support for "delta" observations discontinued'),(0,o.kt)("p",null,'Framework support for "delta" observations has been discontinued. The same result can be obtained user-side in the environment and actor implementations.'),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Remove the following section from the spec file:"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"import::python")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"import::javascript")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"actor_classes::observation::delta")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"actor_classes::observation::delta_apply_fn"))),(0,o.kt)("p",{parentName:"admonition"},"In the python SDK, ",(0,o.kt)("a",{parentName:"p",href:"/docs/reference/python#class-recvobservation"},(0,o.kt)("inlineCode",{parentName:"a"},"RecvObservation"))," ",(0,o.kt)("inlineCode",{parentName:"p"},"delta")," attribute no longer exists."),(0,o.kt)("p",{parentName:"admonition"},"You can support delta observations in your code, for example you could change the definition of your observation message to support both full observation or delta observation."),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-protobuf"},"message Observation {\n    oneof observation_or_delta {\n        ObservationMessage obs = 1;\n        DeltaObservation delta = 2;\n    }\n}\n")),(0,o.kt)("p",{parentName:"admonition"},"As before the environment side can decide to send full or delta observations. On the consumer side, actor or datalog, you'll need to keep the previous observation around to apply the delta to it.")),(0,o.kt)("admonition",{title:"Recommended update",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Instead of using ",(0,o.kt)("a",{parentName:"p",href:"/docs/reference/python#class-recvobservation"},(0,o.kt)("inlineCode",{parentName:"a"},"RecvObservation"))," ",(0,o.kt)("inlineCode",{parentName:"p"},"snapshot")," attribute, use ",(0,o.kt)("inlineCode",{parentName:"p"},"observation")," instead.")),(0,o.kt)("h2",{id:"new-code-generation-workflow"},"New code generation workflow"),(0,o.kt)("p",null,"The code generation step is no longer perfomed by the CLI but by dedicated tools provided with the SDKs. ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment copy")," is provided by the CLI as a cross platform way to copy the required files, i.e. the spec, protobuf and params files, from the root of the project to services source directories. As a result of these ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment sync")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment generate")," are no longer available."),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Replace any usage of ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment sync")," with ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment copy"),". This new commands needs to know explicitly what files to copy"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-console"},"cogment copy data.proto cogment.yaml params.yaml environment_dir actor_dir\n"))),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"For services using the python SDK:"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},"Make sure you install the SDK and the ",(0,o.kt)("inlineCode",{parentName:"li"},"generate")," tool using ",(0,o.kt)("inlineCode",{parentName:"li"},"pip install cogment[generate]"),"."),(0,o.kt)("li",{parentName:"ul"},"Generate the necessary files with ",(0,o.kt)("inlineCode",{parentName:"li"},"python3 -m cogment.generate --spec cogment.yaml"),"."))),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"For services using the javascript SDK"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},"Generate the necessary files with ",(0,o.kt)("inlineCode",{parentName:"li"},"npx cogment-js-sdk-generate cogment.yaml"),"."))),(0,o.kt)("h2",{id:"orchestrator-environment-variables-namespaced"},"Orchestrator environment variables namespaced"),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Change the name of environment variables:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre"},"-   From `TRIAL_LIFECYCLE_PORT` to `COGMENT_LIFECYCLE_PORT`\n-   From `TRIAL_ACTOR_PORT` to `COGMENT_ACTOR_PORT`\n-   From `PROMETHEUS_PORT` to `COGMENT_ORCHESTRATOR_PROMETHEUS_PORT`\n"))),(0,o.kt)("h2",{id:"trials-environments-can-be-named"},"Trials' environments can be named"),(0,o.kt)("p",null,'Just like the actors, the environment in a trial can now be named, this name defaults to "env". The environment name is used to address it, in particular to send messages. Environments and actors names belong to the same "namespace" and must be unique.'),(0,o.kt)("admonition",{title:"Recommended update",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Instead of using the ",(0,o.kt)("inlineCode",{parentName:"p"},"to_environment")," arguments of ",(0,o.kt)("a",{parentName:"p",href:"/docs/reference/python#send_messageself-payload-to"},(0,o.kt)("inlineCode",{parentName:"a"},"ActorSession.send_message()")),", use ",(0,o.kt)("inlineCode",{parentName:"p"},"to")," and specify the environment's name.")),(0,o.kt)("h2",{id:"python-sdk"},"Python SDK"),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"p"},"Controller.terminate_trial()")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"Controller.get_trial_info()")," no longer supports providing a single trial identifier as a string."),(0,o.kt)("p",{parentName:"admonition"},"Their usage need to change from"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-python"},'# Using named argument\nmy_controller.terminate_trial(trial_id="my_trial_id")\n# Using positional argument\nmy_controller.get_trial_info("my_trial_id")\n')),(0,o.kt)("p",{parentName:"admonition"},"to"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-python"},'my_controller.terminate_trial(trial_ids=["my_trial_id"])\nmy_controller.get_trial_info(["my_trial_id"])\n'))),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"In actor implementaion, remove all usage of ",(0,o.kt)("inlineCode",{parentName:"p"},"get_active_actors()"),". This method has been restricted to the environment only."),(0,o.kt)("p",{parentName:"admonition"},"If actors need the full list of actors, there are a few possibilities: - Create a controller in the actor implementation and use the ",(0,o.kt)("inlineCode",{parentName:"p"},"Controller.get_actors()")," method. - Receive the actor list in the config from the pre-trial hooks; the pre-trial hooks have implicit knowledge of all actors (at least the last hook). - Add the information in the actors observation space. - Send the information in a message.")),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Remove all usage of ",(0,o.kt)("inlineCode",{parentName:"p"},"EnvironmentSession.send_message()")," using the ",(0,o.kt)("inlineCode",{parentName:"p"},"to_environment")," argument.")),(0,o.kt)("admonition",{title:"Required update",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Rename the parameter ",(0,o.kt)("inlineCode",{parentName:"p"},"observations")," in ",(0,o.kt)("inlineCode",{parentName:"p"},"EnvironmentSession.end(observations=observations)")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"final_observations"),".")),(0,o.kt)("p",null,"Further details can be found in the ",(0,o.kt)("a",{parentName:"p",href:"/docs/reference/python"},"python SDK documentation"),"."),(0,o.kt)("h2",{id:"javascript-sdk"},"Javascript SDK"),(0,o.kt)("p",null,"There has been a complete rework of the JS SDK we therefore recommend you to take a look at the dedicated ",(0,o.kt)("a",{parentName:"p",href:"/docs/reference/javascript"},"javascript SDK documentation"),". In more details:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"You can keep your actor function, as well as any logic dealing with the observation object, as its shape has remained the same,"),(0,o.kt)("li",{parentName:"ul"},"If you are using the ",(0,o.kt)("inlineCode",{parentName:"li"},"useActions")," React hook, there is a new version of that hook, which can be retrieved by running ",(0,o.kt)("inlineCode",{parentName:"li"},"cogment init")," with an updated version of the ",(0,o.kt)("a",{parentName:"li",href:"/docs/reference/cli/"},"Cogment CLI"),", and choosing ",(0,o.kt)("inlineCode",{parentName:"li"},"yes")," when prompted if you want a web client.")),(0,o.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,o.kt)("p",null,"Here we list a few error you are likely to see if something was not upgraded properly to Cogment 2.0:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},'AttributeError: module "cogment" has no attribute "delta_encoding"\n')),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"This would be logged while trying to run a Python script and may happen if you use ",(0,o.kt)("inlineCode",{parentName:"li"},"cogment generate")," instead of the ",(0,o.kt)("a",{parentName:"li",href:"#new-code-generation-workflow"},"new generation workflow"),"."),(0,o.kt)("li",{parentName:"ul"},"This is caused by the discontinuation of ",(0,o.kt)("a",{parentName:"li",href:"#support-for-delta-observations-discontinued"},(0,o.kt)("inlineCode",{parentName:"a"},"delta")," encoding")," for observations."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"Failure: [Problem rebuilding trial params [INVALID_ARGUMENT:(environment.config) some_message: Cannot find field.]]\n")),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"When starting the Orchestrator with --config or --params."),(0,o.kt)("li",{parentName:"ul"},"This may happen when using an older version of the default parameters in a params or spec file."),(0,o.kt)("li",{parentName:"ul"},'It will happen when the default parameters contain an unknown field; In this particular case, the field config (i.e.from environment.config) is "unknown" because it is not accepted anymore in the Cogment 2.0 default parameters.')))))}d.isMDXComponent=!0}}]);