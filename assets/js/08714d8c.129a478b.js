"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[922],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),p=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=p(n),h=a,u=m["".concat(s,".").concat(h)]||m[h]||c[h]||r;return n?i.createElement(u,o(o({ref:t},d),{},{components:n})):i.createElement(u,o({ref:t},d))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<r;p++)o[p]=n[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1597:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var i=n(3117),a=(n(7294),n(3905));const r={sidebar_position:2},o="Trial Parameters",l={unversionedId:"reference/parameters",id:"reference/parameters",title:"Trial Parameters",description:"The trial parameters are a set of parameters that define the details of a trial.",source:"@site/docs/reference/parameters.md",sourceDirName:"reference",slug:"/reference/parameters",permalink:"/docs/reference/parameters",draft:!1,tags:[],version:"current",lastUpdatedAt:1678740357,formattedLastUpdatedAt:"3/13/2023",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docSidebar",previous:{title:"Spec File",permalink:"/docs/reference/cogment-yaml"},next:{title:"CLI",permalink:"/docs/reference/cli/"}},s={},p=[{value:"Parameters reference",id:"parameters-reference",level:2},{value:"Parameter file",id:"parameter-file",level:2},{value:"Parameters and pre-trial hooks",id:"parameters-and-pre-trial-hooks",level:2},{value:"Cogment endpoints",id:"cogment-endpoints",level:2},{value:"<code>grpc</code> scheme",id:"grpc-scheme",level:3},{value:"<code>cogment</code> scheme",id:"cogment-scheme",level:3},{value:"<code>client</code> host",id:"client-host",level:4},{value:"<code>discover</code> host",id:"discover-host",level:4},{value:"Discovery path",id:"discovery-path",level:5},{value:"Discovery query",id:"discovery-query",level:5},{value:"Reserved query properties",id:"reserved-query-properties",level:5}],d={toc:p};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"trial-parameters"},"Trial Parameters"),(0,a.kt)("p",null,"The trial parameters are a set of parameters that define the details of a trial.\nThey may be generated from the default parameters provided to the Orchestrator (see ",(0,a.kt)("a",{parentName:"p",href:"#parameter-file"},"Parameter File"),"), and updated by the pre-trial hooks (see ",(0,a.kt)("a",{parentName:"p",href:"/docs/reference/python#class-cogmenttrialparameters"},"TrialParameters")," and ",(0,a.kt)("a",{parentName:"p",href:"/docs/reference/python#registerpretrialhookself-impl"},"register_pre_trial_hook"),").\nOr they can be provided whole to the trial start call (see ",(0,a.kt)("a",{parentName:"p",href:"/docs/reference/python#async-starttrialself-trialconfignone-trialidrequestednone-trialparamsnone"},"start_trial"),")."),(0,a.kt)("p",null,"In the parameters, are optional config messages for the trial, environment and actors.\nThe trial config is only used by the pre-trial hooks, whereas the other configs are sent to their respective destination at the start of the trial.\nThe config protobuf messages are defined in the spec file."),(0,a.kt)("p",null,"The pre-trial hooks exist to allow dynamic parameter setting at the start of a trial, with the use of the trial config.\nAnother way to set the parameters dynamically is by providing them to the start trial call.\nThe parameters of the trial start call take priority over all others, and thus when provided, the default parameters will be ignored and the pre-trial hooks will not be called."),(0,a.kt)("h2",{id:"parameters-reference"},"Parameters reference"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"config"),": User defined configuration sent to the first trial pre-hook before the start of the trial. The type is defined in the spec file under section ",(0,a.kt)("inlineCode",{parentName:"li"},"trial:config_type"),". DEFAULT: not set."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"properties"),": User defined key/value properties in a map/dictionary style. Key names starting with a double underscore (__) are reserved for Cogment internal use. DEFAULT: empty."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"max_steps"),": The maximum number of time steps (ticks) that the trial will run before requesting a ",(0,a.kt)("a",{parentName:"li",href:"/docs/guide/development-guide#soft-termination"},(0,a.kt)("em",{parentName:"a"},"soft")," termination")," at the next step. DEFAULT: 0 (infinite nb steps)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"max_inactivity"),": The number of seconds of inactivity after which a trial will be ",(0,a.kt)("a",{parentName:"li",href:"/docs/guide/development-guide#hard-termination"},(0,a.kt)("em",{parentName:"a"},"hard")," terminated"),'. "Activity" is defined as a message received by the Orchestrator from a user component. If 0, the trial will not be terminated because of inactivity. DEFAULT: 30 seconds.'),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"nb_buffered_ticks"),": The number of ticks (steps) to buffer in the Orchestrator before sending the data to the datalog. This is in effect the delay between the currently running trial and the datalog data. It is also the time window for past data (e.g. rewards) to still make it in the correct normal sample of the datalog. If data is too far in the past (the tick ID is more in the past than ",(0,a.kt)("inlineCode",{parentName:"li"},"nb_buffered_ticks"),") then a special ",(0,a.kt)("inlineCode",{parentName:"li"},"out-of-sync")," ",(0,a.kt)("a",{parentName:"li",href:"/docs/reference/python#class-cogmentlogsample"},"sample")," will be sent to the datalog. This value must be larger than 1. DEFAULT: 2."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"datalog_endpoint"),": Endpoint of the datalog service. DEFAULT: not set (data logging is disabled)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"datalog_exclude_fields"),": List of fields to exclude from the data samples sent to the datalog service."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"environment_config"),": User defined configuration sent to the environment at the start of the trial. The type is defined in spec file under section ",(0,a.kt)("inlineCode",{parentName:"li"},"environment:config_type"),". DEFAULT: not set."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"environment_name"),': The name of the environment. DEFAULT: "env".'),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"environment_endpoint"),": Endpoint of the environment service. DEFAULT: context discovery endpoint (the Directory will be inquired)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"environment_implementation"),": The name of the implementation to run the environment. This must match an implementation that is defined at the endpoint. DEFAULT: not set (an arbitrary implementation will be chosen at runtime)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"actors"),": List of actor parameter sets.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"config"),": User defined configuration sent to the actor at the start of the trial. The type is defined in the spec file under section ",(0,a.kt)("inlineCode",{parentName:"li"},"actor_classes:config_type")," for the appropriate actor class. DEFAULT: not set."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"name"),": The name of the actor (must be unique in the trial). DEFAULT: none (required parameter)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"class_name"),": The name of the actor class. This must match a value in the spec file under section ",(0,a.kt)("inlineCode",{parentName:"li"},"actor_classes:name"),". DEFAULT: none (required parameter)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"endpoint"),': Endpoint of the actor. This can be "cogment://client", which indicates a client actor. DEFAULT: context discovery endpoint (the Directory will be inquired).'),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"implementation"),": The name of the implementation to run this actor. This must match an implementation that is defined at the endpoint. DEFAULT: not set (an arbitrary implementation will be chosen at runtime)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"initial_connection_timeout"),": Maximum amount of time (in seconds) to wait for an actor to connect to a new trial, after which it is considered unavailable for the trial duration. If the wait is too long (see ",(0,a.kt)("inlineCode",{parentName:"li"},"max_inactivity"),"), the trial may be terminated. The trial may wait longer than the requested timeout. DEFAULT: 0.0 (no timeout; indefinite wait)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"response_timeout"),": Maximum amount of time (in seconds) to wait for an actor to respond with an action after an observation is sent, after which it is considered unavailable. If the wait is too long, the trial may be terminated (see ",(0,a.kt)("inlineCode",{parentName:"li"},"max_inactivity"),"). The trial may wait longer than the requested timeout. DEFAULT: 0.0 (no timeout; indefinite wait)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"optional"),": If set (true), the actor is optional. An optional actor is not necessary for a trial to continue. If an actor is required (i.e not optional), the trial will be terminated if the actor is not available. DEFAULT: false."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"default_action"),": This is only relevant for optional actors (see ",(0,a.kt)("inlineCode",{parentName:"li"},"optional"),"). If set, and the actor is not available, the environment will receive this action (the environment will not be informed that the actor is unavailable). If not set, the environment will be informed that the actor is unavailable (the environment will not receive an action). The type is defined in the spec file under section ",(0,a.kt)("inlineCode",{parentName:"li"},"actor_classes:action:space")," for the appropriate actor class. DEFAULT: not set.")))),(0,a.kt)("h2",{id:"parameter-file"},"Parameter file"),(0,a.kt)("p",null,"The parameter file serves to initialize the Orchestrator default parameters.\nIt is able to set all parameters except for the configs and actor default actions."),(0,a.kt)("p",null,"The file uses the YAML configuration language. It consists of one top level YAML section called ",(0,a.kt)("inlineCode",{parentName:"p"},"trial_params"),".\nAny other top level section will be ignored."),(0,a.kt)("p",null,"The layout is hierarchical, so the name of the parameters may be different than the parameter description above:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"properties"),": Dictionary of user defined key/value pairs."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"max_steps")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"max_inactivity")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"nb_buffered_ticks")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"datalog"),": List of parameters related to the data logger. If this section is not present, data logging is disabled.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"endpoint")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"exclude_fields")))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"environment"),": List of parameters for the environment",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"name")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"endpoint")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"implementation")))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"actors"),": List of actor parameter sets. Note that as defaults, the number of actors may not be suited for all trials.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"name")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"actor_class")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"endpoint")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"implementation")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"initial_connection_timeout")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"response_timeout")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"optional"))))),(0,a.kt)("p",null,"E.g.:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'trial_params:\n    properties:\n        days_to_retain: 10\n        training: no\n        with_humans: yes\n        params_source: default\n        processor: "Alpha-67+"\n\n    max_steps: 1000\n    max_inactivity: 30\n    nb_buffered_ticks: 5\n\n    datalog:\n        endpoint: grpc://logserver:9000\n        exclude_fields: [messages, actions]\n\n    environment:\n        name: Arena\n        endpoint: grpc://env:9000\n        implementation: simple\n\n    actors:\n        - name: Alice\n          actor_class: BigPlayer\n          endpoint: cogment://discover\n          implementation:\n        - name: Bob\n          actor_class: BigPlayer\n          endpoint: grpc://bp2:9000\n          implementation: Test\n          initial_connection_timeout: 10.0\n        - name: Carol\n          actor_class: SmallPlayer\n          endpoint: grpc://sp:9000\n          implementation: DQN_Hotel3\n          initial_connection_timeout: 5.0\n          optional: True\n        - name: Dave\n          actor_class: SmallPlayer\n          endpoint: cogment://discover/service?id=8390256\n          implementation: DNN_Karma3.1.17\n          initial_connection_timeout: 3.0\n          optional: True\n        - name: Olivia\n          actor_class: Referee\n          endpoint: cogment://client\n          implementation: Standard\n          response_timeout: 20.0\n')),(0,a.kt)("h2",{id:"parameters-and-pre-trial-hooks"},"Parameters and pre-trial hooks"),(0,a.kt)("p",null,"If no parameters were given to the trial start call, the default parameters and pre-trial hooks are used.\nAnd if no pre-trial hooks are defined, the default parameters will be used directly to start the trial."),(0,a.kt)("p",null,"Pre-trial hooks are gRPC services that may be called to set up the parameters for a new trial. Multiple hooks can be defined and they will all be called in order, in a pipeline fashion (i.e. the output of one becomes the input of the next). The first hook service to be called will receive the default parameters (augmented by the trial config that may be given to the trial start call). The output of the last hook is used as final parameters to start the new trial. The response of the last hook will be waited on before the trial starts."),(0,a.kt)("p",null,"The hooks will be called to update or generate all the parameter data (presented here) in addition to the configurations for the environment and the actors (if needed)."),(0,a.kt)("p",null,"Pre-trial hooks are defined on the command line (or an environment variable) when starting the Orchestrator."),(0,a.kt)("h2",{id:"cogment-endpoints"},"Cogment endpoints"),(0,a.kt)("p",null,"Cogment endpoints are basic URLs (",(0,a.kt)("inlineCode",{parentName:"p"},"scheme://host/path?query"),") that can have one of two schemes: ",(0,a.kt)("inlineCode",{parentName:"p"},"grpc")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"cogment"),".\nThe path and query are optional, but a valid endpoint must have a scheme and a host."),(0,a.kt)("p",null,"The context is used to determine what API service will be used to connect to the endpoint; e.g. if this is the endpoint for an environment, then the ",(0,a.kt)("inlineCode",{parentName:"p"},"EnvironmentSP")," gRPC API will be used."),(0,a.kt)("h3",{id:"grpc-scheme"},(0,a.kt)("inlineCode",{parentName:"h3"},"grpc")," scheme"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"grpc")," scheme is used to access a network resource using one of the Cogment gRPC API directly, without the need of a Directory.\nAn endpoint with this scheme is also called a ",(0,a.kt)("strong",{parentName:"p"},"grpc endpoint"),".\nThe rest of the URL is a standard HTTP address (with port) and points to the gRPC server waiting for connection. E.g.:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"grpc://10.0.123.5:9000\ngrpc://SomeServer:9011\ngrpc://second.actors.base.com:9050\n")),(0,a.kt)("h3",{id:"cogment-scheme"},(0,a.kt)("inlineCode",{parentName:"h3"},"cogment")," scheme"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"cogment")," scheme is specific to Cogment and has two possible hosts: ",(0,a.kt)("inlineCode",{parentName:"p"},"client")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"discover"),"."),(0,a.kt)("h4",{id:"client-host"},(0,a.kt)("inlineCode",{parentName:"h4"},"client")," host"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"client")," host is used in the very specific case of an ",(0,a.kt)("em",{parentName:"p"},"actor"),' being a "client actor".\nThis endpoint (i.e. exactly "cogment://client") is a ',(0,a.kt)("strong",{parentName:"p"},"special endpoint"),".\nOnly actors can use this endpoint.\nIn this case, the actor with such an endpoint will connect as a client, the Orchestrator being the server.\nThe client will connect to the actor port of the ","[Orchestrator][../reference/cli/orchestrator.md]","."),(0,a.kt)("h4",{id:"discover-host"},(0,a.kt)("inlineCode",{parentName:"h4"},"discover")," host"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"discover")," host is to indicate that a ",(0,a.kt)("a",{parentName:"p",href:"/docs/reference/cli/directory/directory-server"},"Directory"),' needs to be inquired.\nAn endpoint with this host (i.e. starting with "cogment://discover") is also called a ',(0,a.kt)("strong",{parentName:"p"},"discovery endpoint"),"."),(0,a.kt)("p",null,"The directory returns an actual endpoint where to reach the service; either a grpc endpoint (e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},"grpc://10.5.134.2:9000"),"), or for an actor, it can also be a special endpoint (e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},"cogment://client"),").\nThe result should not be another discovery endpoint."),(0,a.kt)("p",null,"The endpoint for the directory must be a grpc endpoint and is provided beforehand (e.g. for the ","[Orchestrator][../reference/cli/orchestrator.md]",", it is an option on start)."),(0,a.kt)("p",null,"With a ",(0,a.kt)("strong",{parentName:"p"},"context discovery endpoint")," there is no path in the URL, and some of the details of the service will be obtained from the context of the endpoint (i.e. where the endpoint was provided and for what).\nThis type of endpoint is the simple form of discovery endpoints."),(0,a.kt)("p",null,"When there is no query, it is in its simplest form and referred as a ",(0,a.kt)("strong",{parentName:"p"},"pure context discovery endpoint"),': "cogment://discover".\nIt is the default in Cogment when no endpoint is provided by the user (where discovery endpoints are valid).'),(0,a.kt)("p",null,"Example of context discovery endpoints:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"cogment://discover\ncogment://discover?tag=blue\ncogment://discover?tag=red&zone=1\n")),(0,a.kt)("p",null,"If these endpoints were provided for actors, they would be equivalent to these ",(0,a.kt)("strong",{parentName:"p"},"explicit discovery endpoints"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"cogment://discover/actor?__actor_class=xxx&__implementation=yyy\ncogment://discover/actor?__actor_class=xxx&__implementation=yyy&tag=blue\ncogment://discover/actor?__actor_class=xxx&__implementation=yyy&tag=red&zone=1\n")),(0,a.kt)("p",null,'Where "xxx" and "yyy" are values taken from the context (typically the trial start parameters). For each type of endpoint, the context provides the path as described ',(0,a.kt)("a",{parentName:"p",href:"#discovery-path"},"below"),", and these properties (if available):"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"For actor contexts: properties are ",(0,a.kt)("inlineCode",{parentName:"li"},"__actor_class")," and ",(0,a.kt)("inlineCode",{parentName:"li"},"__implementation")),(0,a.kt)("li",{parentName:"ul"},"For environment contexts: property is ",(0,a.kt)("inlineCode",{parentName:"li"},"__implementation")),(0,a.kt)("li",{parentName:"ul"},"For all other contexts, no properties are provided by the context")),(0,a.kt)("p",null,"These properties are implicitly registered in the directory when starting an actor or environment service from a SDK.\nBut if explicitly registering the services to the directory, these properties must be provided if a context discovery endpoint is used (otherwise the service will not be found)."),(0,a.kt)("p",null,"An ",(0,a.kt)("strong",{parentName:"p"},"explicit discovery endpoint"),", as opposed to a context discovery endpoint, is a URL with a path, and needs to explicitly provide all the necessary information in the URL (the context of the endpoint will be ignored).\nIn other words, no context property will be implicitly added to the URL query sent to the directory, the user is fully responsible to match the URL to the need (and match the properties)."),(0,a.kt)("h5",{id:"discovery-path"},"Discovery path"),(0,a.kt)("p",null,"There are two categories of path for discovery endpoints, one for generic service types and the other for specific service types."),(0,a.kt)("p",null,"The generic path ",(0,a.kt)("inlineCode",{parentName:"p"},"service")," is used to find services of any type.\nIn this case, the query is ",(0,a.kt)("inlineCode",{parentName:"p"},"__id=XXX")," where XXX is a 64 bit unsigned integer representing the ID of a service registered in the directory, e.g.:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"cogment://discover/service?__id=67834892\ncogment://discover/service?__id=42\n")),(0,a.kt)("p",null,"The specific paths are used to find a specific type of service:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"actor"),": To find an actor service"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"environment"),": To find an environment service"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"datalog"),": To find a data logger service"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"prehook"),": To find a pre-trial hook service"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"lifecycle"),": To find a service offering trial life cycle management"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"actservice"),": To find a service offering client actor connection"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"datastore"),": To find a data store service"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"modelregistry"),": To find a model registry service")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"actor"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"environment")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"datalog")," paths will normally be used in the trial parameters to start a new trial.\nThey will be interpreted and managed by the Orchestrator, which will inquire the Directory."),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"prehook")," path is for use on the command line of the Orchestrator."),(0,a.kt)("p",null,"The others are for use by services themselves, e.g. to find an Orchestrator to connect to."),(0,a.kt)("h5",{id:"discovery-query"},"Discovery query"),(0,a.kt)("p",null,"Following the path in the discovery endpoint, is the optional query; properties to find a suitable service.\nAll the properties provided in the query must match properties registered in the directory (with some exceptions, see ",(0,a.kt)("a",{parentName:"p",href:"#reserved-query-properties"},"below"),").\nWhich properties are acceptable depends on the directory (and how the services are registered in the directory)."),(0,a.kt)("p",null,"The query in the discovery endpoint must follow these guidelines:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Entries are separated by the ampersand (&)"),(0,a.kt)("li",{parentName:"ul"},"Property name and associated value are separated by an equal sign (=)"),(0,a.kt)("li",{parentName:"ul"},"Property names and values must be composed of only these characters: A-Z, a-z, 0-9, underscore (","_","), dash (-)"),(0,a.kt)("li",{parentName:"ul"},"Property values are optional"),(0,a.kt)("li",{parentName:"ul"},"Property names starting with a double underscore (","_","_",") are reserved. E.g ",(0,a.kt)("inlineCode",{parentName:"li"},"__authentication-token"))),(0,a.kt)("p",null,"E.g.:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"cogment://discover/actor?__implementation=d3qn\ncogment://discover/environment?__implementation=fqdn3&type=fast-2x&ping=low\ncogment://discover/datalog?name=high&open&color=green_blue\n")),(0,a.kt)("h5",{id:"reserved-query-properties"},"Reserved query properties"),(0,a.kt)("p",null,"Some endpoint query properties are reserved for Cogment use. They may be interpreted by other services than the directory, and thus may not correspond to directory properties that participate in service discovery.\nSome of these names may not be used as properties to inquire from (or register in) the directory.\nThey may be used for special purposes that differ for each name."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"__actor_class"),": This is a property name implicitly used by Cogment. It is registered in the Directory for services that were implicitly registered by Cogment or a Cogment SDK. It is also used by Cogment to inquire for context discovery endpoints."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"__authentication-token"),": This query property is ",(0,a.kt)("em",{parentName:"li"},"not")," a directory property. It is used to provide authentication to the directory. The value (and need) depends on the directory implementation and/or how the registration of the service is made in the directory. This is not registered as a property in the Directory."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"__id"),": This query property is not a directory property. It is used to provide a service ID for inquiry to the directory for a specific service. This is not registered as a property in the Directory."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"__implementation"),": This is a property name implicitly used by Cogment. It is registered in the Directory for services that were implicitly registered by Cogment or a Cogment SDK. It is also used by Cogment to inquire for context discovery endpoints.")))}c.isMDXComponent=!0}}]);