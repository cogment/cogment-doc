"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[916],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>g});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var d=r.createContext({}),s=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},m=function(e){var t=s(e.components);return r.createElement(d.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,d=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=s(n),u=i,g=c["".concat(d,".").concat(u)]||c[u]||p[u]||o;return n?r.createElement(g,a(a({ref:t},m),{},{components:n})):r.createElement(g,a({ref:t},m))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=u;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l[c]="string"==typeof e?e:i,a[1]=l;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5676:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=n(7462),i=(n(7294),n(3905));const o={title:"Model Registry",sidebar_position:4},a="Model Registry",l={unversionedId:"reference/cli/model-registry",id:"reference/cli/model-registry",title:"Model Registry",description:"Cogment Model Registry is designed to store and make available AI models to be used by Cogment actors.",source:"@site/docs/reference/cli/model-registry.md",sourceDirName:"reference/cli",slug:"/reference/cli/model-registry",permalink:"/docs/reference/cli/model-registry",draft:!1,tags:[],version:"current",lastUpdatedAt:1691703005,formattedLastUpdatedAt:"Aug 10, 2023",sidebarPosition:4,frontMatter:{title:"Model Registry",sidebar_position:4},sidebar:"docSidebar",previous:{title:"Client",permalink:"/docs/reference/cli/trial-datastore/trial-datastore-client"},next:{title:"Web Proxy",permalink:"/docs/reference/cli/web-proxy"}},d={},s=[{value:"Command line",id:"command-line",level:2},{value:"Configuration",id:"configuration",level:2},{value:"<code>port</code>",id:"port",level:3},{value:"<code>grpc_reflection</code>",id:"grpc_reflection",level:3},{value:"<code>archive_dir</code>",id:"archive_dir",level:3},{value:"<code>cache_max_items</code>",id:"cache_max_items",level:3},{value:"<code>sent_version_chunk_size</code>",id:"sent_version_chunk_size",level:3},{value:"<code>log_level</code>",id:"log_level",level:3},{value:"<code>log_file</code>",id:"log_file",level:3},{value:"<code>directory_endpoint</code>",id:"directory_endpoint",level:3},{value:"<code>directory_authentication_token</code>",id:"directory_authentication_token",level:3},{value:"<code>directory_registration_host</code>",id:"directory_registration_host",level:3},{value:"<code>directory_registration_properties</code>",id:"directory_registration_properties",level:3},{value:"API usage examples",id:"api-usage-examples",level:2},{value:"Create or update a model - <code>cogmentAPI.ModelRegistrySP/CreateOrUpdateModel( .cogmentAPI.CreateOrUpdateModelRequest ) returns ( .cogmentAPI.CreateOrUpdateModelReply );</code>",id:"create-or-update-a-model---cogmentapimodelregistryspcreateorupdatemodel-cogmentapicreateorupdatemodelrequest--returns--cogmentapicreateorupdatemodelreply-",level:3},{value:"Delete a model - <code>cogmentAPI.ModelRegistrySP/DeleteModel( .cogmentAPI.DeleteModelRequest ) returns ( .cogmentAPI.DeleteModelReply );</code>",id:"delete-a-model---cogmentapimodelregistryspdeletemodel-cogmentapideletemodelrequest--returns--cogmentapideletemodelreply-",level:3},{value:"Retrieve models - <code>cogmentAPI.ModelRegistrySP/RetrieveModels( .cogmentAPI.RetrieveModelsRequest ) returns ( .cogmentAPI.RetrieveModelsReply );</code>",id:"retrieve-models---cogmentapimodelregistryspretrievemodels-cogmentapiretrievemodelsrequest--returns--cogmentapiretrievemodelsreply-",level:3},{value:"List the models",id:"list-the-models",level:4},{value:"Retrieve specific model(s)",id:"retrieve-specific-models",level:4},{value:"Create a model iteration - <code>cogmentAPI.ModelRegistrySP/CreateVersion( stream .cogmentAPI.CreateVersionRequestChunk ) returns ( .cogmentAPI.CreateVersionReply );</code>",id:"create-a-model-iteration---cogmentapimodelregistryspcreateversion-stream-cogmentapicreateversionrequestchunk--returns--cogmentapicreateversionreply-",level:3},{value:"Retrieve model iteration infos - <code>cogmentAPI.ModelRegistrySP/RetrieveVersionInfos ( .cogmentAPI.RetrieveVersionInfosRequest ) returns ( .cogmentAPI.RetrieveVersionInfosReply );</code>",id:"retrieve-model-iteration-infos---cogmentapimodelregistryspretrieveversioninfos--cogmentapiretrieveversioninfosrequest--returns--cogmentapiretrieveversioninfosreply-",level:3},{value:"List the iterations of a model",id:"list-the-iterations-of-a-model",level:4},{value:"Retrieve specific iterations of a model",id:"retrieve-specific-iterations-of-a-model",level:4},{value:"Retrieve the n-th to last iterations of a model",id:"retrieve-the-n-th-to-last-iterations-of-a-model",level:4},{value:"Retrieve given iteration data - <code>cogmentAPI.ModelRegistrySP/RetrieveVersionData ( .cogmentAPI.RetrieveVersionDataRequest ) returns ( stream .cogmentAPI.RetrieveVersionDataReplyChunk );</code>",id:"retrieve-given-iteration-data---cogmentapimodelregistryspretrieveversiondata--cogmentapiretrieveversiondatarequest--returns--stream-cogmentapiretrieveversiondatareplychunk-",level:3}],m={toc:s},c="wrapper";function p(e){let{components:t,...n}=e;return(0,i.kt)(c,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"model-registry"},"Model Registry"),(0,i.kt)("p",null,"Cogment Model Registry is designed to store and make available AI models to be used by Cogment actors."),(0,i.kt)("p",null,"The Model Registry manages models in two ways:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Transient")," (non-archived) model iterations can be used to publish an updated model to users, e.g. during training. Transient model iterations are stored in memory and can be evicted, in particular once the memory limit is reached."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Stored")," model iterations are stored on the filesystem and should be used for long-term storage of specific iterations, e.g. for validation or deployment purposes.")),(0,i.kt)("h2",{id:"command-line"},"Command line"),(0,i.kt)("p",null,"The Model Registry is simply called this way"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"$ cogment services model_registry --port=9000 --archive_dir=./models/\n")),(0,i.kt)("h2",{id:"configuration"},"Configuration"),(0,i.kt)("p",null,"The Model Registry configuration can be specified either through the command line or environment variables."),(0,i.kt)("h3",{id:"port"},(0,i.kt)("inlineCode",{parentName:"h3"},"port")),(0,i.kt)("p",null,"The TCP port where to serve the ",(0,i.kt)("a",{parentName:"p",href:"/docs/reference/grpc#model-registry-api"},"The Model Registry API"),"."),(0,i.kt)("p",null,"If set to 0, then the system will automatically choose a free port.\nThis is normally used in combination with a ",(0,i.kt)("a",{parentName:"p",href:"#directory_endpoint"},"Directory"),"."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--port=12000"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_MODEL_REGISTRY_PORT=12000"),","),(0,i.kt)("li",{parentName:"ul"},"its default value is 9002.")),(0,i.kt)("h3",{id:"grpc_reflection"},(0,i.kt)("inlineCode",{parentName:"h3"},"grpc_reflection")),(0,i.kt)("p",null,"Whether or not to enable ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/grpc/grpc/blob/master/doc/server-reflection.md"},"gRPC reflection")," on the served endpoints."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line flag, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--grpc_reflection"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_MODEL_REGISTRY_GRPC_REFLECTION=1"),","),(0,i.kt)("li",{parentName:"ul"},"by default, it is disabled.")),(0,i.kt)("h3",{id:"archive_dir"},(0,i.kt)("inlineCode",{parentName:"h3"},"archive_dir")),(0,i.kt)("p",null,"Path to the directory to store archived model iterations and model metadata."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--archive_dir=./path/to/models/"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_MODEL_REGISTRY_ARCHIVE_DIR=./path/to/models/"),","),(0,i.kt)("li",{parentName:"ul"},"its default value is ",(0,i.kt)("inlineCode",{parentName:"li"},".cogment/model_registry"))),(0,i.kt)("h3",{id:"cache_max_items"},(0,i.kt)("inlineCode",{parentName:"h3"},"cache_max_items")),(0,i.kt)("p",null,"This defines the maximum number of model iterations that can be stored in the transient cache."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--cache_max_items=500"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_MODEL_REGISTRY_VERSION_CACHE_MAX_ITEMS=500"),","),(0,i.kt)("li",{parentName:"ul"},"its default value is 100.")),(0,i.kt)("h3",{id:"sent_version_chunk_size"},(0,i.kt)("inlineCode",{parentName:"h3"},"sent_version_chunk_size")),(0,i.kt)("p",null,"The maximum size for model iteration data chunk sent by the server. It is defined in bytes."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--sent_version_chunk_size=100000"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_MODEL_REGISTRY_SENT_MODEL_VERSION_DATA_CHUNK_SIZE=100000"),","),(0,i.kt)("li",{parentName:"ul"},"its default value is 2097152 Bytes, i.e. 2MB.")),(0,i.kt)("h3",{id:"log_level"},(0,i.kt)("inlineCode",{parentName:"h3"},"log_level")),(0,i.kt)("p",null,"Set to define the minimum level for logging. Possible values are: ",(0,i.kt)("inlineCode",{parentName:"p"},"off"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"error"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"warning"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"info"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"debug"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"trace"),". Note however that all trace and most debug level logs will only output if running the debug compiled version of the Orchestrator."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--log_level=debug"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_LOG_LEVEL=5"),","),(0,i.kt)("li",{parentName:"ul"},"default value is info.")),(0,i.kt)("h3",{id:"log_file"},(0,i.kt)("inlineCode",{parentName:"h3"},"log_file")),(0,i.kt)("p",null,"Base file name for daily log output. The name will be suffixed with the date and a new file will be made every day. If not provided the logs go to stdout."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--log_file=./path/to/cogment.log"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_LOG_FILE=./path/to/cogment.log"),","),(0,i.kt)("li",{parentName:"ul"},"default value is info.")),(0,i.kt)("h3",{id:"directory_endpoint"},(0,i.kt)("inlineCode",{parentName:"h3"},"directory_endpoint")),(0,i.kt)("p",null,"Cogment endpoint of the directory service. It must be a ",(0,i.kt)("a",{parentName:"p",href:"/docs/reference/parameters#grpc-scheme"},"gRPC endpoint"),". The directory will be used to register the model registry service for discovery by other services. If not provided, the model registry will not auto register, in which case manual registration to the directory must be done, or an explicit address must be provided to access the model registry."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--directory_endpoint=grpc://foo:9005"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_DIRECTORY_ENDPOINT=grpc://foo:9005"),","),(0,i.kt)("li",{parentName:"ul"},"it has no default value.")),(0,i.kt)("h3",{id:"directory_authentication_token"},(0,i.kt)("inlineCode",{parentName:"h3"},"directory_authentication_token")),(0,i.kt)("p",null,"Authentication token for services registered in the Directory. It is recorded in the Directory when registering a service. And a matching token must be provided to inquire for the service. An empty token is the same as no token."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--directory_authentication_token=GH670ploT"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_DIRECTORY_AUTHENTICATION_TOKEN=GH670ploT"),","),(0,i.kt)("li",{parentName:"ul"},"it has no default value.")),(0,i.kt)("h3",{id:"directory_registration_host"},(0,i.kt)("inlineCode",{parentName:"h3"},"directory_registration_host")),(0,i.kt)("p",null,"This is the host that will be registered to the Directory for the Model Registry service. If not provided, the Model Registry will determine its own IP address and use that as the registration host."),(0,i.kt)("p",null,"In some circumstances, the IP address determined by Cogment may be wrong (e.g. multiple interfaces, load balancing, firewall), thus a host (hostname or IP address) must be explicitly provided."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--directory_registration_host=foo.bar"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_MODEL_REGISTRY_DIRECTORY_REGISTRATION_HOST=foo.bar"),","),(0,i.kt)("li",{parentName:"ul"},"it has no default value (i.e. self determined IP address is used).")),(0,i.kt)("h3",{id:"directory_registration_properties"},(0,i.kt)("inlineCode",{parentName:"h3"},"directory_registration_properties")),(0,i.kt)("p",null,'These are the properties that will be registered to the Directory for the Model Registry service. When inquiring the Directory, the properties inquired must match the properties registered. This is a string representing multiple properties in the form "name=value,name=value,name=value" where the values are optional.'),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},'--directory_registration_properties="Sim=20,hpp,mem=HIGH"'),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},'COGMENT_MODEL_REGISTRY_DIRECTORY_REGISTRATION_PROPERTIES="Sim=20,hpp,mem=HIGH"'),","),(0,i.kt)("li",{parentName:"ul"},"it has no default value.")),(0,i.kt)("h2",{id:"api-usage-examples"},"API usage examples"),(0,i.kt)("p",null,"::: tip"),(0,i.kt)("p",null,"The following examples require ",(0,i.kt)("inlineCode",{parentName:"p"},"COGMENT_MODEL_REGISTRY_GRPC_REFLECTION")," to be enabled as well as ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/fullstorydev/grpcurl"},"grpcurl"),"_"),(0,i.kt)("p",null,":::"),(0,i.kt)("h3",{id:"create-or-update-a-model---cogmentapimodelregistryspcreateorupdatemodel-cogmentapicreateorupdatemodelrequest--returns--cogmentapicreateorupdatemodelreply-"},"Create or update a model - ",(0,i.kt)("inlineCode",{parentName:"h3"},"cogmentAPI.ModelRegistrySP/CreateOrUpdateModel( .cogmentAPI.CreateOrUpdateModelRequest ) returns ( .cogmentAPI.CreateOrUpdateModelReply );")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_info\\":{\\"model_id\\":\\"my_model\\",\\"user_data\\":{\\"type\\":\\"my_model_type\\"}}}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/CreateOrUpdateModel\n{\n\n}\n')),(0,i.kt)("h3",{id:"delete-a-model---cogmentapimodelregistryspdeletemodel-cogmentapideletemodelrequest--returns--cogmentapideletemodelreply-"},"Delete a model - ",(0,i.kt)("inlineCode",{parentName:"h3"},"cogmentAPI.ModelRegistrySP/DeleteModel( .cogmentAPI.DeleteModelRequest ) returns ( .cogmentAPI.DeleteModelReply );")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_id\\":\\"my_model\\"}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/DeleteModel\n{\n\n}\n')),(0,i.kt)("h3",{id:"retrieve-models---cogmentapimodelregistryspretrievemodels-cogmentapiretrievemodelsrequest--returns--cogmentapiretrievemodelsreply-"},"Retrieve models - ",(0,i.kt)("inlineCode",{parentName:"h3"},"cogmentAPI.ModelRegistrySP/RetrieveModels( .cogmentAPI.RetrieveModelsRequest ) returns ( .cogmentAPI.RetrieveModelsReply );")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"These examples require ",(0,i.kt)("inlineCode",{parentName:"em"},"COGMENT_MODEL_REGISTRY_GRPC_REFLECTION")," to be enabled as well as ",(0,i.kt)("a",{parentName:"em",href:"https://github.com/fullstorydev/grpcurl"},"grpcurl"))),(0,i.kt)("h4",{id:"list-the-models"},"List the models"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/RetrieveModels\n{\n  "modelInfos": [\n    {\n      "modelId": "my_model",\n      "userData": {\n        "type": "my_model_type"\n      }\n    },\n    {\n      "modelId": "my_other_model",\n      "userData": {\n        "type": "my_model_type"\n      }\n    }\n  ],\n  "nextModelHandle": "2"\n}\n')),(0,i.kt)("h4",{id:"retrieve-specific-models"},"Retrieve specific model(s)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_ids\\":[\\"my_other_model\\"]}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/RetrieveModels\n{\n  "modelInfos": [\n    {\n      "modelId": "my_other_model",\n      "userData": {\n        "type": "my_model_type"\n      }\n    }\n  ],\n  "nextModelHandle": "1"\n}\n')),(0,i.kt)("h3",{id:"create-a-model-iteration---cogmentapimodelregistryspcreateversion-stream-cogmentapicreateversionrequestchunk--returns--cogmentapicreateversionreply-"},"Create a model iteration - ",(0,i.kt)("inlineCode",{parentName:"h3"},"cogmentAPI.ModelRegistrySP/CreateVersion( stream .cogmentAPI.CreateVersionRequestChunk ) returns ( .cogmentAPI.CreateVersionReply );")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"header\\":{\\"version_info\\":{\n    \\"model_id\\":\\"my_model\\",\\\n    \\"archived\\":true,\\\n    \\"data_size\\":$(printf chunk_1chunk_2 | wc -c)\\\n  }}}\\\n  {\\"body\\":{\\\n    \\"data_chunk\\":\\"$(printf chunk_1 | base64)\\"\\\n  }}\\\n  {\\"body\\":{\\\n    \\"data_chunk\\":\\"$(printf chunk_2 | base64)\\"\\\n  }}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/CreateVersion\n{\n  "versionInfo": {\n    "modelId": "my_model",\n    "versionNumber": 2,\n    "creationTimestamp": "907957639",\n    "archived": true,\n    "dataHash": "jY0g3VkUK62ILPr2JuaW5g7uQi0EcJVZJu8IYp3yfhI=",\n    "dataSize": "14"\n  }\n}\n')),(0,i.kt)("h3",{id:"retrieve-model-iteration-infos---cogmentapimodelregistryspretrieveversioninfos--cogmentapiretrieveversioninfosrequest--returns--cogmentapiretrieveversioninfosreply-"},"Retrieve model iteration infos - ",(0,i.kt)("inlineCode",{parentName:"h3"},"cogmentAPI.ModelRegistrySP/RetrieveVersionInfos ( .cogmentAPI.RetrieveVersionInfosRequest ) returns ( .cogmentAPI.RetrieveVersionInfosReply );")),(0,i.kt)("h4",{id:"list-the-iterations-of-a-model"},"List the iterations of a model"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_id\\":\\"my_model\\"}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/RetrieveVersionInfos\n{\n  "versionInfos": [\n    {\n      "modelId": "my_model",\n      "versionNumber": 1,\n      "creationTimestamp": "1633119005107454620",\n      "archived": true,\n      "dataHash": "jY0g3VkUK62ILPr2JuaW5g7uQi0EcJVZJu8IYp3yfhI=",\n      "dataSize": "14"\n    },\n    {\n      "modelId": "my_model",\n      "versionNumber": 2,\n      "creationTimestamp": "1633119625907957639",\n      "archived": true,\n      "dataHash": "jY0g3VkUK62ILPr2JuaW5g7uQi0EcJVZJu8IYp3yfhI=",\n      "dataSize": "14"\n    }\n  ],\n  "nextVersionHandle": "3"\n}\n')),(0,i.kt)("h4",{id:"retrieve-specific-iterations-of-a-model"},"Retrieve specific iterations of a model"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_id\\":\\"my_model\\", \\"version_numbers\\":[1]}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/RetrieveVersionInfos\n{\n  "versionInfos": [\n    {\n      "modelId": "my_model",\n      "versionNumber": 1,\n      "creationTimestamp": "1633119005107454620",\n      "archived": true,\n      "dataHash": "jY0g3VkUK62ILPr2JuaW5g7uQi0EcJVZJu8IYp3yfhI=",\n      "dataSize": "14"\n    }\n  ],\n  "nextVersionHandle": "2"\n}\n')),(0,i.kt)("h4",{id:"retrieve-the-n-th-to-last-iterations-of-a-model"},"Retrieve the n-th to last iterations of a model"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_id\\":\\"my_model\\", \\"version_numbers\\":[-2]}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/RetrieveVersionInfos\n{\n  "versionInfos": [\n    {\n      "modelId": "my_model",\n      "versionNumber": 1,\n      "creationTimestamp": "1633119005107454620",\n      "archived": true,\n      "dataHash": "jY0g3VkUK62ILPr2JuaW5g7uQi0EcJVZJu8IYp3yfhI=",\n      "dataSize": "14"\n    }\n  ],\n  "nextVersionHandle": "2"\n}\n')),(0,i.kt)("h3",{id:"retrieve-given-iteration-data---cogmentapimodelregistryspretrieveversiondata--cogmentapiretrieveversiondatarequest--returns--stream-cogmentapiretrieveversiondatareplychunk-"},"Retrieve given iteration data - ",(0,i.kt)("inlineCode",{parentName:"h3"},"cogmentAPI.ModelRegistrySP/RetrieveVersionData ( .cogmentAPI.RetrieveVersionDataRequest ) returns ( stream .cogmentAPI.RetrieveVersionDataReplyChunk );")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_id\\":\\"my_model\\", \\"version_number\\":1}" | grpcurl -plaintext -d @ localhost:9000 cogment.ModelRegistrySP/RetrieveVersionData\n{\n  "dataChunk": "Y2h1bmtfMWNodW5rXzI="\n}\n')),(0,i.kt)("p",null,"To retrieve the n-th to last iteration, use ",(0,i.kt)("inlineCode",{parentName:"p"},"version_number:-n")," (e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"-1")," for the latest, ",(0,i.kt)("inlineCode",{parentName:"p"},"-2")," for the 2nd to last)."))}p.isMDXComponent=!0}}]);