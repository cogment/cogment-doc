"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[687],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var i=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,i,n=function(e,t){if(null==e)return{};var r,i,n={},a=Object.keys(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=i.createContext({}),c=function(e){var t=i.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=c(e.components);return i.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(r),h=n,u=m["".concat(s,".").concat(h)]||m[h]||d[h]||a;return r?i.createElement(u,o(o({ref:t},p),{},{components:r})):i.createElement(u,o({ref:t},p))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,o=new Array(a);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var c=2;c<a;c++)o[c]=r[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,r)}m.displayName="MDXCreateElement"},9772:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var i=r(7462),n=(r(7294),r(3905));const a={title:"Server",sidebar_position:1},o="Directory Server",l={unversionedId:"reference/cli/directory/directory-server",id:"reference/cli/directory/directory-server",title:"Server",description:"The Directory is an implementation of the directory gRPC service. It is the service to find other services. Typically, every other Cogment service only needs to know the address of the Directory to access anything in Cogment.",source:"@site/docs/reference/cli/directory/directory-server.md",sourceDirName:"reference/cli/directory",slug:"/reference/cli/directory/directory-server",permalink:"/docs/reference/cli/directory/directory-server",draft:!1,tags:[],version:"current",lastUpdatedAt:1685026544,formattedLastUpdatedAt:"May 25, 2023",sidebarPosition:1,frontMatter:{title:"Server",sidebar_position:1},sidebar:"docSidebar",previous:{title:"Orchestrator",permalink:"/docs/reference/cli/orchestrator"},next:{title:"Client",permalink:"/docs/reference/cli/directory/directory-client"}},s={},c=[{value:"Command line",id:"command-line",level:2},{value:"Options",id:"options",level:2},{value:"<code>port</code>",id:"port",level:3},{value:"<code>grpc_reflection</code>",id:"grpc_reflection",level:3},{value:"<code>log_level</code>",id:"log_level",level:3},{value:"<code>log_file</code>",id:"log_file",level:3},{value:"<code>registration_lag</code>",id:"registration_lag",level:3},{value:"<code>persistence_file</code>",id:"persistence_file",level:3},{value:"Operation",id:"operation",level:2},{value:"Data",id:"data",level:3}],p={toc:c};function d(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,i.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"directory-server"},"Directory Server"),(0,n.kt)("p",null,"The Directory is an implementation of the ",(0,n.kt)("a",{parentName:"p",href:"/docs/reference/grpc#directory-api"},"directory gRPC service"),". It is the service to find other services. Typically, every other Cogment service only needs to know the address of the Directory to access anything in Cogment."),(0,n.kt)("p",null,"A regular health check is done on non-permanent network services to make sure they remain available (i.e. network reachable).\nIf a service fails the health check, it is automatically removed from the Directory.\nNon-permanent services have a limited lifetime in the directory; after a week, they will be removed."),(0,n.kt)("p",null,"The Directory works in tandem with the Cogment ",(0,n.kt)("a",{parentName:"p",href:"/docs/reference/parameters#cogment-endpoints"},"endpoints"),", in particular the ones with a ",(0,n.kt)("a",{parentName:"p",href:"/docs/reference/parameters#discover-host"},"discover")," host (referred as ",(0,n.kt)("strong",{parentName:"p"},"discovery endpoints"),")."),(0,n.kt)("p",null,"A ",(0,n.kt)("a",{parentName:"p",href:"/docs/reference/cli/directory/directory-client"},"Directory Client")," is also part of the Cogment CLI to access the Directory from the command line."),(0,n.kt)("h2",{id:"command-line"},"Command line"),(0,n.kt)("p",null,"The Directory is a Cogment CLI service:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"$ cogment services directory --port=9005\n")),(0,n.kt)("h2",{id:"options"},"Options"),(0,n.kt)("h3",{id:"port"},(0,n.kt)("inlineCode",{parentName:"h3"},"port")),(0,n.kt)("p",null,"The TCP port where to serve the ",(0,n.kt)("a",{parentName:"p",href:"/docs/reference/grpc#directory-api"},"directory gRPC service"),". This is where the users of the Directory connect to."),(0,n.kt)("p",null,"Can be specified as:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"--port"),","),(0,n.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"COGMENT_DIRECTORY_PORT"),","),(0,n.kt)("li",{parentName:"ul"},"default value is 9005.")),(0,n.kt)("h3",{id:"grpc_reflection"},(0,n.kt)("inlineCode",{parentName:"h3"},"grpc_reflection")),(0,n.kt)("p",null,"Whether or not to enable ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/grpc/grpc/blob/master/doc/server-reflection.md"},"gRPC reflection")," on the served directory endpoint."),(0,n.kt)("p",null,"Can be specified as:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"--grpc_reflection"),","),(0,n.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"COGMENT_DIRECTORY_GRPC_REFLECTION=1"),","),(0,n.kt)("li",{parentName:"ul"},"by default, it is disabled.")),(0,n.kt)("h3",{id:"log_level"},(0,n.kt)("inlineCode",{parentName:"h3"},"log_level")),(0,n.kt)("p",null,"Set to define the minimum level for logging. Possible values are: ",(0,n.kt)("inlineCode",{parentName:"p"},"off"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"error"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"warning"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"info"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"debug"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"trace"),"."),(0,n.kt)("p",null,"Can be specified as:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"--log_level=debug"),","),(0,n.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"COGMENT_LOG_LEVEL=info"),","),(0,n.kt)("li",{parentName:"ul"},"default value is info.")),(0,n.kt)("h3",{id:"log_file"},(0,n.kt)("inlineCode",{parentName:"h3"},"log_file")),(0,n.kt)("p",null,"Base file name for daily log output. The name will be suffixed with the date and a new file will be made every day. If not provided, the logs go to stdout."),(0,n.kt)("p",null,"Can be specified as:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"--log_file=./path/to/cogment.log"),","),(0,n.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"COGMENT_LOG_FILE=./path/to/cogment.log"),","),(0,n.kt)("li",{parentName:"ul"},"default value is info.")),(0,n.kt)("h3",{id:"registration_lag"},(0,n.kt)("inlineCode",{parentName:"h3"},"registration_lag")),(0,n.kt)("p",null,"The maximum number of seconds to wait before responding with no result. This can be used when components may start at slightly different time, and some components may inquire about a component that did not have time to register yet."),(0,n.kt)("p",null,"Can be specified as:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"--registration_lag"),","),(0,n.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"COGMENT_DIRECTORY_REGISTRATION_LAG"),","),(0,n.kt)("li",{parentName:"ul"},"default value is 0.")),(0,n.kt)("h3",{id:"persistence_file"},(0,n.kt)("inlineCode",{parentName:"h3"},"persistence_file")),(0,n.kt)("p",null,"The file name where persistence data will be read from on start-up and stored afterward.\nThe file will be created if it does not already exist.\nIf set to an empty string, persistence will be disabled."),(0,n.kt)("p",null,"Can be specified as:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"--persistence_file"),","),(0,n.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"COGMENT_DIRECTORY_PERSISTENCE_FILE"),","),(0,n.kt)("li",{parentName:"ul"},'default value is ".cogment-directory-data".')),(0,n.kt)("h2",{id:"operation"},"Operation"),(0,n.kt)("p",null,"At its most basic, the Directory contains services searchable by type and property, and returns endpoints where to reach the matched services."),(0,n.kt)("p",null,'Every registered service has a unique ID (it is unique among currently registered services). When registering a service, the ID of the new service is provided with a "secret" key (a string).\nThis "secret" (in combination with the ID) is required to deregister the service.\nIf a new service matches an existing one (i.e. an inquiry would match them), it is considered a duplicate.\nDuplicates are acceptable for non-permanent services.\nFor permanent services (both the old and new services must be permanent), duplicates are not allowed; instead, an update of the old service is performed (i.e. the ID and secret are kept the same).'),(0,n.kt)("p",null,"Every service is also associated with an authentication token.\nThis token is provided by users when registering a new service, and it must be provided to inquire or deregister that service.\nFor example, any inquiry can only find services that have the same authentication token as the one provided to the inquiry.\nSimilarly for deregistering: a service cannot be deregistered without the appropriate authentication token.\nIn closed environments, the authentication token can be left empty to facilitate directory management."),(0,n.kt)("p",null,"When inquiring services, the services returned are in increasing order of age (since registration).\nSo the first is always the most recently registered service.\nPermanent services do not change their registration timestamp when updated."),(0,n.kt)("h3",{id:"data"},"Data"),(0,n.kt)("p",null,"The Directory maintains the following data for each service:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"service ID: This is a numerical (64 bits unsigned integer) value generated by the Directory and assigned to the service on registration. It is unique to that service as long as it is in the Directory. Although very unlikely, it is possible for this ID to be re-used after the service is deregistered."),(0,n.kt)("li",{parentName:"ul"},"endpoint: It consists of four distinct information:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"protocol: The protocol (URL scheme) for the endpoint (",(0,n.kt)("inlineCode",{parentName:"li"},"grpc")," or ",(0,n.kt)("inlineCode",{parentName:"li"},"cogment"),"). The ",(0,n.kt)("inlineCode",{parentName:"li"},"cogment"),' protocol is not considered a "network" protocol and thus will not be checked for health (network connectivity).'),(0,n.kt)("li",{parentName:"ul"},"host: The host for the endpoint (e.g. somewhere.com). For the ",(0,n.kt)("inlineCode",{parentName:"li"},"grpc")," protocol this represents a TCP/IP network resource; it can be a network hostname or an IP address. For the ",(0,n.kt)("inlineCode",{parentName:"li"},"cogment")," protocol it must be a registered name (see ",(0,n.kt)("a",{parentName:"li",href:"/docs/reference/parameters#cogment-endpoints"},"cogment endpoints"),") and typically does not represent a network resource."),(0,n.kt)("li",{parentName:"ul"},"port: The TCP port where the registered service is providing its services. This is required for ",(0,n.kt)("inlineCode",{parentName:"li"},"grpc")," protocol hosts."),(0,n.kt)("li",{parentName:"ul"},"ssl requirement: Whether the service requires an encrypted SSL connection."))),(0,n.kt)("li",{parentName:"ul"},"type: The type of service. This also determines how health checks are performed on the service (i.e. which gRPC service should be used to check the health of the service).",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"client actor connection: Provides ",(0,n.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-clientactorsp"},"client actor")," gRPC API service"),(0,n.kt)("li",{parentName:"ul"},"trial lifecycle management: Provides ",(0,n.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-triallifecyclesp"},"lifecycle")," gRPC API service"),(0,n.kt)("li",{parentName:"ul"},"actor: Provides ",(0,n.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-actor-api"},"actor")," gRPC API service"),(0,n.kt)("li",{parentName:"ul"},"environment: Provides ",(0,n.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-environmentsp"},"environment")," gRPC API service"),(0,n.kt)("li",{parentName:"ul"},"pre-hook: Provides ",(0,n.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-trialhookssp"},"pre-hook")," gRPC API service"),(0,n.kt)("li",{parentName:"ul"},"datalog: Provides ",(0,n.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-logexportersp"},"datalog")," gRPC API service"),(0,n.kt)("li",{parentName:"ul"},"datastore: Provides ",(0,n.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-trialdatastoresp"},"datastore")," gRPC API service"),(0,n.kt)("li",{parentName:"ul"},"model registry: Provides ",(0,n.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-modelregistrysp"},"model registry")," gRPC API service"),(0,n.kt)("li",{parentName:"ul"},"other: This type of service does not provide a gRPC API service or it is not a type of service known to Cogment. Only the ability to perform a tcp connection will be tested for health checking."))),(0,n.kt)("li",{parentName:"ul"},"permanent: This determines if the service should be kept in the directory regardless of health (network connectivity) or lifetime limits (a week). It also prevents duplication of the service in the directory (i.e. if a duplicate is registered, the service will just be updated with the new information, and keep the same ID and secret)."),(0,n.kt)("li",{parentName:"ul"},"properties: This is a free form mapping of name and value strings. But Cogment may require properties of specific names for its operation, in particular for endpoint ",(0,n.kt)("a",{parentName:"li",href:"/docs/reference/parameters#cogment-endpoints"},"discovery"),". These special property names are prefixed with a double underscore (","_","_","), e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"__implementation"),". Also, for proper use in Cogment, property names and values should be restricted to a limited character set (see ",(0,n.kt)("a",{parentName:"li",href:"/docs/reference/parameters#discovery-query"}),")."),(0,n.kt)("li",{parentName:"ul"},"secret: This is a secret string that is generated by the Directory on registering a new service. It must be provided to deregister a service. There is no way to recover this value, so it must be recorded after registration."),(0,n.kt)("li",{parentName:"ul"},"authentication token: A string to authenticate users of the registered service. It is provided by the user for registration of a new service, and the same token must be provided to access (deregister or inquire) that service.")))}d.isMDXComponent=!0}}]);