"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[8687],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>m});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},d=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),h=c(r),m=i,u=h["".concat(s,".").concat(m)]||h[m]||p[m]||a;return r?n.createElement(u,o(o({ref:t},d),{},{components:r})):n.createElement(u,o({ref:t},d))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var c=2;c<a;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},9772:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=r(7462),i=(r(7294),r(3905));const a={title:"Server",sidebar_position:1},o="Directory Server",l={unversionedId:"reference/cli/directory/directory-server",id:"reference/cli/directory/directory-server",title:"Server",description:"The Directory is an implementation of the directory gRPC service. It is the service to find other services. Typically, every other Cogment service only needs to know the address of the Directory to access anything in Cogment.",source:"@site/docs/reference/cli/directory/directory-server.md",sourceDirName:"reference/cli/directory",slug:"/reference/cli/directory/directory-server",permalink:"/docs/reference/cli/directory/directory-server",draft:!1,tags:[],version:"current",lastUpdatedAt:1695507333,formattedLastUpdatedAt:"Sep 23, 2023",sidebarPosition:1,frontMatter:{title:"Server",sidebar_position:1},sidebar:"docSidebar",previous:{title:"Orchestrator",permalink:"/docs/reference/cli/orchestrator"},next:{title:"Client",permalink:"/docs/reference/cli/directory/directory-client"}},s={},c=[{value:"Command line",id:"command-line",level:2},{value:"Options",id:"options",level:2},{value:"<code>port</code>",id:"port",level:3},{value:"<code>grpc_reflection</code>",id:"grpc_reflection",level:3},{value:"<code>log_level</code>",id:"log_level",level:3},{value:"<code>log_file</code>",id:"log_file",level:3},{value:"<code>registration_lag</code>",id:"registration_lag",level:3},{value:"<code>persistence_file</code>",id:"persistence_file",level:3},{value:"<code>load_balancing</code>",id:"load_balancing",level:3},{value:"<code>check_on_inquire</code>",id:"check_on_inquire",level:3},{value:"Operation",id:"operation",level:2},{value:"Health Checking",id:"health-checking",level:3},{value:"Load Balancing",id:"load-balancing",level:3},{value:"Data",id:"data",level:3}],d={toc:c};function p(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"directory-server"},"Directory Server"),(0,i.kt)("p",null,"The Directory is an implementation of the ",(0,i.kt)("a",{parentName:"p",href:"/docs/reference/grpc#directory-api"},"directory gRPC service"),". It is the service to find other services. Typically, every other Cogment service only needs to know the address of the Directory to access anything in Cogment."),(0,i.kt)("p",null,"A regular health check is done on non-permanent network services to make sure they remain available (i.e. network reachable).\nIf a service fails the health check, it is automatically removed from the Directory."),(0,i.kt)("p",null,"The Directory works in tandem with the Cogment ",(0,i.kt)("a",{parentName:"p",href:"/docs/reference/parameters#cogment-endpoints"},"endpoints"),", in particular the ones with a ",(0,i.kt)("a",{parentName:"p",href:"/docs/reference/parameters#discover-host"},"discover")," host (referred as ",(0,i.kt)("strong",{parentName:"p"},"discovery endpoints"),")."),(0,i.kt)("p",null,"A ",(0,i.kt)("a",{parentName:"p",href:"/docs/reference/cli/directory/directory-client"},"Directory Client")," is also part of the Cogment CLI to access the Directory from the command line."),(0,i.kt)("h2",{id:"command-line"},"Command line"),(0,i.kt)("p",null,"The Directory is a Cogment CLI service:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"$ cogment services directory --port=9005\n")),(0,i.kt)("h2",{id:"options"},"Options"),(0,i.kt)("h3",{id:"port"},(0,i.kt)("inlineCode",{parentName:"h3"},"port")),(0,i.kt)("p",null,"The TCP port where to serve the ",(0,i.kt)("a",{parentName:"p",href:"/docs/reference/grpc#directory-api"},"directory gRPC service"),". This is where the users of the Directory connect to."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--port"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_DIRECTORY_PORT"),","),(0,i.kt)("li",{parentName:"ul"},"default value is 9005.")),(0,i.kt)("h3",{id:"grpc_reflection"},(0,i.kt)("inlineCode",{parentName:"h3"},"grpc_reflection")),(0,i.kt)("p",null,"Whether or not to enable ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/grpc/grpc/blob/master/doc/server-reflection.md"},"gRPC reflection")," on the served directory endpoint."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--grpc_reflection"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_DIRECTORY_GRPC_REFLECTION=1"),","),(0,i.kt)("li",{parentName:"ul"},"by default, it is disabled.")),(0,i.kt)("h3",{id:"log_level"},(0,i.kt)("inlineCode",{parentName:"h3"},"log_level")),(0,i.kt)("p",null,"Set to define the minimum level for logging. Possible values are: ",(0,i.kt)("inlineCode",{parentName:"p"},"off"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"error"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"warning"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"info"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"debug"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"trace"),"."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--log_level=debug"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_LOG_LEVEL=info"),","),(0,i.kt)("li",{parentName:"ul"},"default value is info.")),(0,i.kt)("h3",{id:"log_file"},(0,i.kt)("inlineCode",{parentName:"h3"},"log_file")),(0,i.kt)("p",null,"Base file name for daily log output. The name will be suffixed with the date and a new file will be made every day. If not provided, the logs go to stdout."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--log_file=./path/to/cogment.log"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_LOG_FILE=./path/to/cogment.log"),","),(0,i.kt)("li",{parentName:"ul"},"default value is info.")),(0,i.kt)("h3",{id:"registration_lag"},(0,i.kt)("inlineCode",{parentName:"h3"},"registration_lag")),(0,i.kt)("p",null,"The maximum number of seconds to wait before responding with no result (either due to a service not registered, or that has failed a health check).\nThis can be used when components may start at slightly different time, and some components may inquire about a component that did not have time to register yet.\nIt may also help when services sometimes go temporarily offline."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--registration_lag"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_DIRECTORY_REGISTRATION_LAG"),","),(0,i.kt)("li",{parentName:"ul"},"default value is 0.")),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{parentName:"p",href:"#load-balancing"},"Unserviceable"),' services are not considered for this lag.\nI.e. the directory will not wait for a service to become "serviceable".')),(0,i.kt)("h3",{id:"persistence_file"},(0,i.kt)("inlineCode",{parentName:"h3"},"persistence_file")),(0,i.kt)("p",null,"The file name where persistence data will be read from on start-up and stored afterward.\nThe file will be created if it does not already exist.\nIf set to an empty string, persistence will be disabled."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--persistence_file"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_DIRECTORY_PERSISTENCE_FILE"),","),(0,i.kt)("li",{parentName:"ul"},'default value is ".cogment-directory-data".')),(0,i.kt)("h3",{id:"load_balancing"},(0,i.kt)("inlineCode",{parentName:"h3"},"load_balancing")),(0,i.kt)("p",null,"Whether or not to enable ",(0,i.kt)("a",{parentName:"p",href:"#load-balancing"},"load balancing")," when services are inquired."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--load_balancing"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_DIRECTORY_LOAD_BALANCING=1"),","),(0,i.kt)("li",{parentName:"ul"},"by default, it is disabled.")),(0,i.kt)("h3",{id:"check_on_inquire"},(0,i.kt)("inlineCode",{parentName:"h3"},"check_on_inquire")),(0,i.kt)("p",null,"Whether or not to enable ",(0,i.kt)("a",{parentName:"p",href:"#health-checking"},"health checking")," when a service is matched by an inquiry (in addition to being checked periodically).\nThis can prevent unavailable services from being returned (before the periodic health check has time to run).\nIt can also allow load balancing to use more recent/dynamic values.\nBut it can significantly slow down directory inquiries, especially when a health check fails."),(0,i.kt)("p",null,"Can be specified as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a command line option, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"--check_on_inquire"),","),(0,i.kt)("li",{parentName:"ul"},"an environment variable, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"COGMENT_DIRECTORY_CHECK_ON_INQUIRE=1"),","),(0,i.kt)("li",{parentName:"ul"},"by default, it is disabled.")),(0,i.kt)("h2",{id:"operation"},"Operation"),(0,i.kt)("p",null,"At its most basic, the Directory contains services searchable by type and property, and returns endpoints where to reach the matched services."),(0,i.kt)("p",null,'Every registered service has a unique ID (it is unique among currently registered services). When registering a service, the ID of the new service is provided with a "secret" key (a string).\nThis "secret" (in combination with the ID) is required to deregister the service.\nIf a new service matches an existing one (i.e. an inquiry would match them), it is considered a duplicate.\nDuplicates are acceptable for non-permanent services.\nFor permanent services (both the old and new services must be permanent), duplicates are not allowed; instead, an update of the old service is performed (i.e. the ID and secret are kept the same).'),(0,i.kt)("p",null,"Every service is also associated with an authentication token.\nThis token is provided by users when registering a new service, and it must be provided to inquire or deregister that service.\nFor example, any inquiry can only find services that have the same authentication token as the one provided to the inquiry.\nSimilarly for deregistering: a service cannot be deregistered without the appropriate authentication token.\nIn closed environments, the authentication token can be left empty to facilitate directory management."),(0,i.kt)("h3",{id:"health-checking"},"Health Checking"),(0,i.kt)("p",null,"Each entry is normally checked for connectivity on a regular basis (every 60 seconds), but can also be checked when an entry matches an inquiry (see ",(0,i.kt)("a",{parentName:"p",href:"#check_on_inquire"},"check_on_inquire"),")."),(0,i.kt)("p",null,"The type of the entry determines the extent of the health check.\nFor Cogment services, the ",(0,i.kt)("inlineCode",{parentName:"p"},"Status")," procedure will be called and a response expected.\nFor non-Cogment services, a simple tcp connection will be attempted, and if successful, the service will be considered healthy."),(0,i.kt)("p",null,"If a service fails the health check multiple times, it will be removed from the directory.\nBut after the first failure, the service will not be reported on inquiries until and unless it succeeds a health check."),(0,i.kt)("p",null,"When services are recovered from a persistence file, they will immediately be subjected to a health check."),(0,i.kt)("h3",{id:"load-balancing"},"Load Balancing"),(0,i.kt)("p",null,"By default load balancing is disabled, and thus when inquiring, the services returned are in increasing order of age (since registration).\nSo the first is always the most recently registered service."),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Permanent services do not change their registration timestamp when updated.")),(0,i.kt)("p",null,"When load balancing is enabled, and an inquiry is made, the order of services returned is different:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},'For each service that match the inquiry, the last read "overall_load" ',(0,i.kt)("inlineCode",{parentName:"li"},"Status")," (see below) is used. If ",(0,i.kt)("a",{parentName:"li",href:"#check_on_inquire"},"check_on_inquire"),' is enabled, then the service\'s current "overall_load" is read at this point.'),(0,i.kt)("li",{parentName:"ol"},"Services with a load of 255 are considered unserviceable and removed from the list of potential candidates."),(0,i.kt)("li",{parentName:"ol"},"The service with the lowest load is found. That service, and services with a load close to that one, are retained."),(0,i.kt)("li",{parentName:"ol"},"The retained services are shuffled randomly, and returned as a reply to the inquiry.")),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Non-Cogment services (with no ",(0,i.kt)("inlineCode",{parentName:"p"},"Status")," gRPC procedure) are always considered fully available (with a load of 0).\nAnd thus will always be returned, but in random order, when load balancing is enabled.")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Status"),' gRPC procedure\'s "overall_load" status is expected to be a string representation of an integer from 0 to 255 (8 bit unsigned integer).\nIf the string cannot be converted to such an integer, a load of 0 is assumed (e.g. "256" will result in a load of 0).\nA normal value is between 0 and 100, representing the load on the machine where the service is running.\nA value of 0 means that there is no load, and a value of 100 means that the machine is very loaded (and may not be able to do processing in a timely manner).\nThe exact meaning of the value is dependent on the service reporting.\nA value of 255 indicates that the machine is not fit to run any new service (and thus it is "unserviceable").'),(0,i.kt)("h3",{id:"data"},"Data"),(0,i.kt)("p",null,"The Directory maintains the following data for each service:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"service ID"),": This is a numerical (64 bits unsigned integer) value generated by the Directory and assigned to the service on registration. It is unique to that service as long as it is in the Directory. Although very unlikely, it is possible for this ID to be re-used after the service is deregistered. Zero (0) is not a valid ID."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"endpoint"),": It consists of four distinct information:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"protocol: The protocol (URL scheme) for the endpoint (",(0,i.kt)("inlineCode",{parentName:"li"},"grpc")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"cogment"),"). The ",(0,i.kt)("inlineCode",{parentName:"li"},"cogment"),' protocol is not considered a "network" protocol and thus will not be checked for health (network connectivity).'),(0,i.kt)("li",{parentName:"ul"},"host: The host for the endpoint (e.g. somewhere.com). For the ",(0,i.kt)("inlineCode",{parentName:"li"},"grpc")," protocol this represents a TCP/IP network resource; it can be a network hostname or an IP address. For the ",(0,i.kt)("inlineCode",{parentName:"li"},"cogment")," protocol it must be a registered name (see ",(0,i.kt)("a",{parentName:"li",href:"/docs/reference/parameters#cogment-endpoints"},"cogment endpoints"),") and typically does not represent a network resource."),(0,i.kt)("li",{parentName:"ul"},"port: The TCP port where the registered service is providing its services. This is required for ",(0,i.kt)("inlineCode",{parentName:"li"},"grpc")," protocol hosts."),(0,i.kt)("li",{parentName:"ul"},"ssl requirement: Whether the service requires an encrypted SSL connection."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"type"),": The type of service. This also determines how health checks are performed on the service (i.e. which gRPC service should be used to check the health of the service).",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"client actor connection: Provides ",(0,i.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-clientactorsp"},"client actor")," gRPC API service"),(0,i.kt)("li",{parentName:"ul"},"trial lifecycle management: Provides ",(0,i.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-triallifecyclesp"},"lifecycle")," gRPC API service"),(0,i.kt)("li",{parentName:"ul"},"actor: Provides ",(0,i.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-actor-api"},"actor")," gRPC API service"),(0,i.kt)("li",{parentName:"ul"},"environment: Provides ",(0,i.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-environmentsp"},"environment")," gRPC API service"),(0,i.kt)("li",{parentName:"ul"},"pre-hook: Provides ",(0,i.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-trialhookssp"},"pre-hook")," gRPC API service"),(0,i.kt)("li",{parentName:"ul"},"datalog: Provides ",(0,i.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-logexportersp"},"datalog")," gRPC API service"),(0,i.kt)("li",{parentName:"ul"},"datastore: Provides ",(0,i.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-trialdatastoresp"},"datastore")," gRPC API service"),(0,i.kt)("li",{parentName:"ul"},"model registry: Provides ",(0,i.kt)("a",{parentName:"li",href:"/docs/reference/grpc#service-modelregistrysp"},"model registry")," gRPC API service"),(0,i.kt)("li",{parentName:"ul"},"other: This type of service does not provide a gRPC API service or it is not a type of service known to Cogment. Only the ability to perform a tcp connection will be tested for health checking."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"permanent"),": This determines if the service should be kept in the directory regardless of health (network connectivity). It also prevents duplication of the service in the directory (i.e. if a duplicate is registered, the service will just be updated with the new information, and keep the same ID and secret)."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"properties"),": This is a free form mapping of name and value strings. But Cogment may require properties of specific names for its operation, in particular for endpoint ",(0,i.kt)("a",{parentName:"li",href:"/docs/reference/parameters#cogment-endpoints"},"discovery"),". These special property names are prefixed with a double underscore (","_","_","), e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"__implementation"),". Also, for proper use in Cogment, property names and values should be restricted to a limited character set (see ",(0,i.kt)("a",{parentName:"li",href:"/docs/reference/parameters#discovery-query"}),")."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"secret"),": This is a secret string that is generated by the Directory on registering a new service. It must be provided to deregister a service. There is no way to recover this value, so it must be recorded after registration."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"authentication token"),": A string to authenticate users of the registered service. It is provided by the user for registration of a new service, and the same token must be provided to access (deregister or inquire) that service.")))}p.isMDXComponent=!0}}]);