"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[953],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),d=o,f=u["".concat(l,".").concat(d)]||u[d]||m[d]||r;return n?a.createElement(f,i(i({ref:t},p),{},{components:n})):a.createElement(f,i({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<r;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3031:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var a=n(7462),o=(n(7294),n(3905));const r={sidebar_position:1},i="Spec File",s={unversionedId:"reference/cogment-yaml",id:"reference/cogment-yaml",title:"Spec File",description:"The spec file (typically named cogment.yaml) is central to every Cogment project that use a Cogment SDK. This file is used to define the specifics of a type of trials. It can also contain data (the commands section) used by the Cogment CLI tool. A generator tool specific to each SDK takes this file as its main input to, among other things, configure the SDK.",source:"@site/docs/reference/cogment-yaml.md",sourceDirName:"reference",slug:"/reference/cogment-yaml",permalink:"/docs/reference/cogment-yaml",draft:!1,tags:[],version:"current",lastUpdatedAt:1656967097,formattedLastUpdatedAt:"Jul 4, 2022",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docSidebar",previous:{title:"Migrate from Cogment v1 to v2",permalink:"/docs/guide/implementation-recipes/v2-migration-guide"},next:{title:"Trial Parameters",permalink:"/docs/reference/parameters"}},l={},c=[{value:"Import",id:"import",level:2},{value:"Commands",id:"commands",level:2},{value:"Trial",id:"trial",level:2},{value:"Environment",id:"environment",level:2},{value:"Actor Classes",id:"actor-classes",level:2}],p={toc:c};function m(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"spec-file"},"Spec File"),(0,o.kt)("p",null,"The spec file (typically named ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment.yaml"),") is central to every Cogment project that use a Cogment SDK. This file is used to define the specifics of a type of trials. It can also contain data (the ",(0,o.kt)("inlineCode",{parentName:"p"},"commands")," section) used by the Cogment CLI tool. A generator tool specific to each SDK takes this file as its main input to, among other things, configure the SDK."),(0,o.kt)("p",null,"The top level sections in the file are:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#import"},"import"),": Used to import other proto files into the definition of the project"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#commands"},"commands"),": Optional. Defines commands that can be run by the Cogment CLI"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#trial"},"trial"),": Define trial speficic properties"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#environment"},"environment"),": Define environment specific properties"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#actor-classes"},"actor_classes"),": Define actor specific properties (for each actor class)")),(0,o.kt)("p",null,'In this document, "section" refers to YAML mappings.'),(0,o.kt)("h2",{id:"import"},"Import"),(0,o.kt)("p",null,"The import section is used to specify external data structures, and optionally code, that is referenced in other parts of the file. The referenced files must be in the same folder as the spec file. The import sections are:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"proto"),": List of protobuf definition files. Message types defined in these files are used to communicate between the various components")),(0,o.kt)("p",null,"All Cogment projects will need at least one ",(0,o.kt)("inlineCode",{parentName:"p"},"proto")," import to define the data structures exchanged between the various components."),(0,o.kt)("p",null,"E.g.:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"import:\n    proto:\n        - filename1.proto\n        - filename2.proto\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u26a0\ufe0f ",(0,o.kt)("strong",{parentName:"p"},"N.B.")," When using message types imported from a ",(0,o.kt)("inlineCode",{parentName:"p"},".proto")," file, types need to be referred through their ",(0,o.kt)("em",{parentName:"p"},"package")," namespace, not the filename containing them.")),(0,o.kt)("h2",{id:"commands"},"Commands"),(0,o.kt)("p",null,"This section is optional and defines commands that can then be executed using the Cogment CLI ",(0,o.kt)("inlineCode",{parentName:"p"},"run")," command. The commands will be executed by a sub-shell and thus can be any shell command. The commands can also recursively call Cogment, either built-in CLI commands, or other commands defined here. But care should be taken not to create infinite recursive calls."),(0,o.kt)("p",null,"E.g.:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"commands:\n    generate: |\n        cd client && python -m cogment.generate --spec cogment.yaml && cd ..\n        cd environment && python -m cogment.generate --spec cogment.yaml && cd ..\n    copy: cogment copy cogment.yaml *.proto params.yaml client environment\n    start: docker-compose up orchestrator agent env\n    play: cogment run start && docker-compose run launcher\n")),(0,o.kt)("p",null,"To run one of these commands, the Cogment CLI command ",(0,o.kt)("inlineCode",{parentName:"p"},"run")," must be used, e.g.: ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment run start"),". And as such there is no problem differentiating between ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment run copy")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment copy")," (the latter is the builtin CLI command, and the former is the command defined in the ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment.yaml")," file)."),(0,o.kt)("p",null,"The cogment command section exists so that commands can be executed in a platform independant manner."),(0,o.kt)("h2",{id:"trial"},"Trial"),(0,o.kt)("p",null,"This section defines properties related to the trial and trial management. It has the properties:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"config_type"),": (optional) The protobuf message type (data structure) that will be passed on to the pre-trial hooks.")),(0,o.kt)("p",null,"E.g.:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"trial:\n    config_type: namespace.DataType\n")),(0,o.kt)("h2",{id:"environment"},"Environment"),(0,o.kt)("p",null,"This section defines properties related to the environment. It has the properties:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"config_type"),": (optional) The protobuf message type used to configure the environment")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"environment:\n    config_type: namespace.DataType\n")),(0,o.kt)("h2",{id:"actor-classes"},"Actor Classes"),(0,o.kt)("p",null,"Arguably the most important section of the spec file, the actor classes section describes the actor types that can be present in the project's trials."),(0,o.kt)("p",null,"The content of this section is a list of actor classes, each containing the necessary properties to define an actor class. These properties are:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"name"),": The name by which this actor class is known"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"action"),": Mapping of properties- ",(0,o.kt)("inlineCode",{parentName:"li"},"space"),": The protobuf message type that represents all the possible actions that this actor class can perform (its action space)"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"observation"),": Mapping of properties",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"space"),": The protobuf message type that represents a snapshot of the data that this actor class has access to (its observation space)"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"config_type"),": (optional) Defines the protobuf message type used to configure this actor class")),(0,o.kt)("p",null,"Each actor class should define both an observation and action space as protobuf message types."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"actor_classes:\n    - name: BigPlayer\n      action:\n          space: namespace.PlayerAction\n      observation:\n          space: namespace.PlayerObservation\n      config_type: namespace.PlayerConfig\n\n    - name: SmallPlayer\n      action:\n          space: namespace.PlayerAction\n      observation:\n          space: namespace.PlayerObservation\n      config_type: namespace.PlayerConfig\n\n    - name: Referee\n      action:\n          space: namespace.RefereeAction\n      observation:\n          space: namespace.RefereeObservation\n      config_type: namespace.RefereeConfig\n")))}m.isMDXComponent=!0}}]);