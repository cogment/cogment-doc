"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[916],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>u});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),d=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},m=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),p=d(n),u=o,v=p["".concat(s,".").concat(u)]||p[u]||c[u]||i;return n?r.createElement(v,a(a({ref:t},m),{},{components:n})):r.createElement(v,a({ref:t},m))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var d=2;d<i;d++)a[d]=n[d];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},5676:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var r=n(3117),o=(n(7294),n(3905));const i={title:"Model Registry",sidebar_position:4},a="Model Registry",l={unversionedId:"reference/cli/model-registry",id:"reference/cli/model-registry",title:"Model Registry",description:"This module is still in active development and should be considered a prerelease version.",source:"@site/docs/reference/cli/model-registry.md",sourceDirName:"reference/cli",slug:"/reference/cli/model-registry",permalink:"/docs/reference/cli/model-registry",draft:!1,tags:[],version:"current",lastUpdatedAt:1657553723,formattedLastUpdatedAt:"7/11/2022",sidebarPosition:4,frontMatter:{title:"Model Registry",sidebar_position:4},sidebar:"docSidebar",previous:{title:"Client",permalink:"/docs/reference/cli/trial-datastore/trial-datastore-client"},next:{title:"Launch",permalink:"/docs/reference/cli/launch"}},s={},d=[{value:"Command line",id:"command-line",level:2},{value:"Configuration",id:"configuration",level:2},{value:"<code>port</code>",id:"port",level:3},{value:"<code>grpc_reflection</code>",id:"grpc_reflection",level:3},{value:"<code>archive_dir</code>",id:"archive_dir",level:3},{value:"<code>cache_max_items</code>",id:"cache_max_items",level:3},{value:"<code>sent_version_chunk_size</code>",id:"sent_version_chunk_size",level:3},{value:"<code>log_level</code>",id:"log_level",level:3},{value:"<code>log_file</code>",id:"log_file",level:3},{value:"API usage examples",id:"api-usage-examples",level:2},{value:"Create or update a model - <code>cogmentAPI.ModelRegistrySP/CreateOrUpdateModel( .cogmentAPI.CreateOrUpdateModelRequest ) returns ( .cogmentAPI.CreateOrUpdateModelReply );</code>",id:"create-or-update-a-model---cogmentapimodelregistryspcreateorupdatemodel-cogmentapicreateorupdatemodelrequest--returns--cogmentapicreateorupdatemodelreply-",level:3},{value:"Delete a model - <code>cogmentAPI.ModelRegistrySP/DeleteModel( .cogmentAPI.DeleteModelRequest ) returns ( .cogmentAPI.DeleteModelReply );</code>",id:"delete-a-model---cogmentapimodelregistryspdeletemodel-cogmentapideletemodelrequest--returns--cogmentapideletemodelreply-",level:3},{value:"Retrieve models - <code>cogmentAPI.ModelRegistrySP/RetrieveModels( .cogmentAPI.RetrieveModelsRequest ) returns ( .cogmentAPI.RetrieveModelsReply );</code>",id:"retrieve-models---cogmentapimodelregistryspretrievemodels-cogmentapiretrievemodelsrequest--returns--cogmentapiretrievemodelsreply-",level:3},{value:"List the models",id:"list-the-models",level:4},{value:"Retrieve specific model(s)",id:"retrieve-specific-models",level:4},{value:"Create a model version - <code>cogmentAPI.ModelRegistrySP/CreateVersion( stream .cogmentAPI.CreateVersionRequestChunk ) returns ( .cogmentAPI.CreateVersionReply );</code>",id:"create-a-model-version---cogmentapimodelregistryspcreateversion-stream-cogmentapicreateversionrequestchunk--returns--cogmentapicreateversionreply-",level:3},{value:"Retrieve model versions infos - <code>cogmentAPI.ModelRegistrySP/RetrieveVersionInfos ( .cogmentAPI.RetrieveVersionInfosRequest ) returns ( .cogmentAPI.RetrieveVersionInfosReply );</code>",id:"retrieve-model-versions-infos---cogmentapimodelregistryspretrieveversioninfos--cogmentapiretrieveversioninfosrequest--returns--cogmentapiretrieveversioninfosreply-",level:3},{value:"List the versions of a model",id:"list-the-versions-of-a-model",level:4},{value:"Retrieve specific versions of a model",id:"retrieve-specific-versions-of-a-model",level:4},{value:"Retrieve the n-th to last version of a model",id:"retrieve-the-n-th-to-last-version-of-a-model",level:4},{value:"Retrieve given version data - <code>cogmentAPI.ModelRegistrySP/RetrieveVersionData ( .cogmentAPI.RetrieveVersionDataRequest ) returns ( stream .cogmentAPI.RetrieveVersionDataReplyChunk );</code>",id:"retrieve-given-version-data---cogmentapimodelregistryspretrieveversiondata--cogmentapiretrieveversiondatarequest--returns--stream-cogmentapiretrieveversiondatareplychunk-",level:3}],m={toc:d};function c(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"model-registry"},"Model Registry"),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This module is still in active development and should be considered a prerelease version."))),(0,o.kt)("p",null,"Cogment Model Registy is designed to store, version and make available AI models to be used by Cogment actors."),(0,o.kt)("p",null,"The Model Registry stores model versions in two ways:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Transient")," (non-archived) model versions can be used to broadcast an updated version of a model to its users, e.g. during training. Transient model versions are stored in memory and can be evicted, in particular once the memory limit is reached."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Archived")," model versions are stored on the filesystem, they are slower to create and to retrieve and should be used for long-term storage of specific versions, e.g. for validation or deployment purposes.")),(0,o.kt)("h2",{id:"command-line"},"Command line"),(0,o.kt)("p",null,"The Model Registry is simply called this way"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ cogment services model_registry --port=9000 --archive_dir=./models/\n")),(0,o.kt)("h2",{id:"configuration"},"Configuration"),(0,o.kt)("p",null,"The Model Registry configuration can be specified either through the command line or environment variables."),(0,o.kt)("h3",{id:"port"},(0,o.kt)("inlineCode",{parentName:"h3"},"port")),(0,o.kt)("p",null,"The TCP port where to serve the ",(0,o.kt)("a",{parentName:"p",href:"/docs/reference/grpc#model-registry-api"},"The Model Registry API"),"."),(0,o.kt)("p",null,"Can be specified as:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"--port=12000"),","),(0,o.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"COGMENT_MODEL_REGISTRY_PORT=12000"),","),(0,o.kt)("li",{parentName:"ul"},"its default value is 9002.")),(0,o.kt)("h3",{id:"grpc_reflection"},(0,o.kt)("inlineCode",{parentName:"h3"},"grpc_reflection")),(0,o.kt)("p",null,"Whether or not to enable ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/grpc/grpc/blob/master/doc/server-reflection.md"},"gRPC reflection")," on the served endpoints."),(0,o.kt)("p",null,"Can be specified as:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"a command line flag, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"--grpc_reflection"),","),(0,o.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"COGMENT_MODEL_REGISTRY_GRPC_REFLECTION=1"),","),(0,o.kt)("li",{parentName:"ul"},"by default, it is disabled.")),(0,o.kt)("h3",{id:"archive_dir"},(0,o.kt)("inlineCode",{parentName:"h3"},"archive_dir")),(0,o.kt)("p",null,"Path to the directory to store archived model versions and model metadata."),(0,o.kt)("p",null,"Can be specified as:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"--archive_dir=./path/to/models/"),","),(0,o.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"COGMENT_MODEL_REGISTRY_ARCHIVE_DIR=./path/to/models/"),","),(0,o.kt)("li",{parentName:"ul"},"its default value is ",(0,o.kt)("inlineCode",{parentName:"li"},".cogment/model_registry"))),(0,o.kt)("h3",{id:"cache_max_items"},(0,o.kt)("inlineCode",{parentName:"h3"},"cache_max_items")),(0,o.kt)("p",null,"This defines the maximum number of model versions that can be stored in the transient cache."),(0,o.kt)("p",null,"Can be specified as:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"--cache_max_items=500"),","),(0,o.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"COGMENT_MODEL_REGISTRY_VERSION_CACHE_MAX_ITEMS=500"),","),(0,o.kt)("li",{parentName:"ul"},"its default value is 100.")),(0,o.kt)("h3",{id:"sent_version_chunk_size"},(0,o.kt)("inlineCode",{parentName:"h3"},"sent_version_chunk_size")),(0,o.kt)("p",null,"The maximum size for model version data chunk sent by the server. It is defined in bytes."),(0,o.kt)("p",null,"Can be specified as:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"--sent_version_chunk_size=10000000"),","),(0,o.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"COGMENT_MODEL_REGISTRY_SENT_MODEL_VERSION_DATA_CHUNK_SIZE=10000000"),","),(0,o.kt)("li",{parentName:"ul"},"its default value is 5242880 Bytes, i.e. 5MB.")),(0,o.kt)("h3",{id:"log_level"},(0,o.kt)("inlineCode",{parentName:"h3"},"log_level")),(0,o.kt)("p",null,"Set to define the minimum level for logging. Possible values are: ",(0,o.kt)("inlineCode",{parentName:"p"},"off"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"error"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"warning"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"info"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"debug"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"trace"),". Note however that all trace and most debug level logs will only output if running the debug compiled version of the Orchestrator."),(0,o.kt)("p",null,"Can be specified as:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"--log_level=debug"),","),(0,o.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"COGMENT_LOG_LEVEL=5"),","),(0,o.kt)("li",{parentName:"ul"},"default value is info.")),(0,o.kt)("h3",{id:"log_file"},(0,o.kt)("inlineCode",{parentName:"h3"},"log_file")),(0,o.kt)("p",null,"Base file name for daily log output. The name will be suffixed with the date and a new file will be made every day. If not provided the logs go to stdout."),(0,o.kt)("p",null,"Can be specified as:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"--log_file=./path/to/cogment.log"),","),(0,o.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"COGMENT_LOG_FILE=./path/to/cogment.log"),","),(0,o.kt)("li",{parentName:"ul"},"default value is info.")),(0,o.kt)("h2",{id:"api-usage-examples"},"API usage examples"),(0,o.kt)("p",null,"::: tip"),(0,o.kt)("p",null,"The following examples require ",(0,o.kt)("inlineCode",{parentName:"p"},"COGMENT_MODEL_REGISTRY_GRPC_REFLECTION")," to be enabled as well as ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/fullstorydev/grpcurl"},"grpcurl"),"_"),(0,o.kt)("p",null,":::"),(0,o.kt)("h3",{id:"create-or-update-a-model---cogmentapimodelregistryspcreateorupdatemodel-cogmentapicreateorupdatemodelrequest--returns--cogmentapicreateorupdatemodelreply-"},"Create or update a model - ",(0,o.kt)("inlineCode",{parentName:"h3"},"cogmentAPI.ModelRegistrySP/CreateOrUpdateModel( .cogmentAPI.CreateOrUpdateModelRequest ) returns ( .cogmentAPI.CreateOrUpdateModelReply );")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_info\\":{\\"model_id\\":\\"my_model\\",\\"user_data\\":{\\"type\\":\\"my_model_type\\"}}}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/CreateOrUpdateModel\n{\n\n}\n')),(0,o.kt)("h3",{id:"delete-a-model---cogmentapimodelregistryspdeletemodel-cogmentapideletemodelrequest--returns--cogmentapideletemodelreply-"},"Delete a model - ",(0,o.kt)("inlineCode",{parentName:"h3"},"cogmentAPI.ModelRegistrySP/DeleteModel( .cogmentAPI.DeleteModelRequest ) returns ( .cogmentAPI.DeleteModelReply );")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_id\\":\\"my_model\\"}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/DeleteModel\n{\n\n}\n')),(0,o.kt)("h3",{id:"retrieve-models---cogmentapimodelregistryspretrievemodels-cogmentapiretrievemodelsrequest--returns--cogmentapiretrievemodelsreply-"},"Retrieve models - ",(0,o.kt)("inlineCode",{parentName:"h3"},"cogmentAPI.ModelRegistrySP/RetrieveModels( .cogmentAPI.RetrieveModelsRequest ) returns ( .cogmentAPI.RetrieveModelsReply );")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"These examples require ",(0,o.kt)("inlineCode",{parentName:"em"},"COGMENT_MODEL_REGISTRY_GRPC_REFLECTION")," to be enabled as well as ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/fullstorydev/grpcurl"},"grpcurl"))),(0,o.kt)("h4",{id:"list-the-models"},"List the models"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/RetrieveModels\n{\n  "modelInfos": [\n    {\n      "modelId": "my_model",\n      "userData": {\n        "type": "my_model_type"\n      }\n    },\n    {\n      "modelId": "my_other_model",\n      "userData": {\n        "type": "my_model_type"\n      }\n    }\n  ],\n  "nextModelHandle": "2"\n}\n')),(0,o.kt)("h4",{id:"retrieve-specific-models"},"Retrieve specific model(s)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_ids\\":[\\"my_other_model\\"]}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/RetrieveModels\n{\n  "modelInfos": [\n    {\n      "modelId": "my_other_model",\n      "userData": {\n        "type": "my_model_type"\n      }\n    }\n  ],\n  "nextModelHandle": "1"\n}\n')),(0,o.kt)("h3",{id:"create-a-model-version---cogmentapimodelregistryspcreateversion-stream-cogmentapicreateversionrequestchunk--returns--cogmentapicreateversionreply-"},"Create a model version - ",(0,o.kt)("inlineCode",{parentName:"h3"},"cogmentAPI.ModelRegistrySP/CreateVersion( stream .cogmentAPI.CreateVersionRequestChunk ) returns ( .cogmentAPI.CreateVersionReply );")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"header\\":{\\"version_info\\":{\n    \\"model_id\\":\\"my_model\\",\\\n    \\"archived\\":true,\\\n    \\"data_size\\":$(printf chunk_1chunk_2 | wc -c)\\\n  }}}\\\n  {\\"body\\":{\\\n    \\"data_chunk\\":\\"$(printf chunk_1 | base64)\\"\\\n  }}\\\n  {\\"body\\":{\\\n    \\"data_chunk\\":\\"$(printf chunk_2 | base64)\\"\\\n  }}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/CreateVersion\n{\n  "versionInfo": {\n    "modelId": "my_model",\n    "versionNumber": 2,\n    "creationTimestamp": "907957639",\n    "archived": true,\n    "dataHash": "jY0g3VkUK62ILPr2JuaW5g7uQi0EcJVZJu8IYp3yfhI=",\n    "dataSize": "14"\n  }\n}\n')),(0,o.kt)("h3",{id:"retrieve-model-versions-infos---cogmentapimodelregistryspretrieveversioninfos--cogmentapiretrieveversioninfosrequest--returns--cogmentapiretrieveversioninfosreply-"},"Retrieve model versions infos - ",(0,o.kt)("inlineCode",{parentName:"h3"},"cogmentAPI.ModelRegistrySP/RetrieveVersionInfos ( .cogmentAPI.RetrieveVersionInfosRequest ) returns ( .cogmentAPI.RetrieveVersionInfosReply );")),(0,o.kt)("h4",{id:"list-the-versions-of-a-model"},"List the versions of a model"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_id\\":\\"my_model\\"}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/RetrieveVersionInfos\n{\n  "versionInfos": [\n    {\n      "modelId": "my_model",\n      "versionNumber": 1,\n      "creationTimestamp": "1633119005107454620",\n      "archived": true,\n      "dataHash": "jY0g3VkUK62ILPr2JuaW5g7uQi0EcJVZJu8IYp3yfhI=",\n      "dataSize": "14"\n    },\n    {\n      "modelId": "my_model",\n      "versionNumber": 2,\n      "creationTimestamp": "1633119625907957639",\n      "archived": true,\n      "dataHash": "jY0g3VkUK62ILPr2JuaW5g7uQi0EcJVZJu8IYp3yfhI=",\n      "dataSize": "14"\n    }\n  ],\n  "nextVersionHandle": "3"\n}\n')),(0,o.kt)("h4",{id:"retrieve-specific-versions-of-a-model"},"Retrieve specific versions of a model"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_id\\":\\"my_model\\", \\"version_numbers\\":[1]}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/RetrieveVersionInfos\n{\n  "versionInfos": [\n    {\n      "modelId": "my_model",\n      "versionNumber": 1,\n      "creationTimestamp": "1633119005107454620",\n      "archived": true,\n      "dataHash": "jY0g3VkUK62ILPr2JuaW5g7uQi0EcJVZJu8IYp3yfhI=",\n      "dataSize": "14"\n    }\n  ],\n  "nextVersionHandle": "2"\n}\n')),(0,o.kt)("h4",{id:"retrieve-the-n-th-to-last-version-of-a-model"},"Retrieve the n-th to last version of a model"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_id\\":\\"my_model\\", \\"version_numbers\\":[-2]}" | grpcurl -plaintext -d @ localhost:9000 cogmentAPI.ModelRegistrySP/RetrieveVersionInfos\n{\n  "versionInfos": [\n    {\n      "modelId": "my_model",\n      "versionNumber": 1,\n      "creationTimestamp": "1633119005107454620",\n      "archived": true,\n      "dataHash": "jY0g3VkUK62ILPr2JuaW5g7uQi0EcJVZJu8IYp3yfhI=",\n      "dataSize": "14"\n    }\n  ],\n  "nextVersionHandle": "2"\n}\n')),(0,o.kt)("h3",{id:"retrieve-given-version-data---cogmentapimodelregistryspretrieveversiondata--cogmentapiretrieveversiondatarequest--returns--stream-cogmentapiretrieveversiondatareplychunk-"},"Retrieve given version data - ",(0,o.kt)("inlineCode",{parentName:"h3"},"cogmentAPI.ModelRegistrySP/RetrieveVersionData ( .cogmentAPI.RetrieveVersionDataRequest ) returns ( stream .cogmentAPI.RetrieveVersionDataReplyChunk );")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},'$ echo "{\\"model_id\\":\\"my_model\\", \\"version_number\\":1}" | grpcurl -plaintext -d @ localhost:9000 cogment.ModelRegistrySP/RetrieveVersionData\n{\n  "dataChunk": "Y2h1bmtfMWNodW5rXzI="\n}\n')),(0,o.kt)("p",null,"To retrieve the n-th to last version, use ",(0,o.kt)("inlineCode",{parentName:"p"},"version_number:-n")," (e.g. ",(0,o.kt)("inlineCode",{parentName:"p"},"-1")," for the latest, ",(0,o.kt)("inlineCode",{parentName:"p"},"-2")," for the 2nd to last)."))}c.isMDXComponent=!0}}]);