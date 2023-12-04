"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[1043],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(n),d=o,h=m["".concat(s,".").concat(d)]||m[d]||u[d]||r;return n?a.createElement(h,i(i({ref:t},p),{},{components:n})):a.createElement(h,i({ref:t},p))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3706:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var a=n(7462),o=(n(7294),n(3905));const r={title:"CLI",sidebar_position:1},i="Command Line Interface (CLI) executable",l={unversionedId:"reference/cli/index",id:"reference/cli/index",title:"CLI",description:"Repository Latest Release",source:"@site/docs/reference/cli/index.md",sourceDirName:"reference/cli",slug:"/reference/cli/",permalink:"/docs/reference/cli/",draft:!1,tags:[],version:"current",lastUpdatedAt:1696019767,formattedLastUpdatedAt:"Sep 29, 2023",sidebarPosition:1,frontMatter:{title:"CLI",sidebar_position:1},sidebar:"docSidebar",previous:{title:"Trial Parameters",permalink:"/docs/reference/parameters"},next:{title:"Orchestrator",permalink:"/docs/reference/cli/orchestrator"}},s={},c=[{value:"Compatibility",id:"compatibility",level:2},{value:"Installation",id:"installation",level:2},{value:"Installation script (compatible with linux and macOS)",id:"installation-script-compatible-with-linux-and-macos",level:3},{value:"Manual installation",id:"manual-installation",level:3},{value:"Docker",id:"docker",level:3},{value:"Unsupported platform",id:"unsupported-platform",level:3},{value:"Building from source",id:"building-from-source",level:3},{value:"Test your installation",id:"test-your-installation",level:2},{value:"Launching a Cogment app",id:"launching-a-cogment-app",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"<code>pipe creation failed (24): Too many open files</code> error on macOS",id:"pipe-creation-failed-24-too-many-open-files-error-on-macos",level:3}],p={toc:c},m="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(m,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"command-line-interface-cli-executable"},"Command Line Interface (CLI) executable"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/repository-cogment%2Fcogment-%235217b8?style=for-the-badge&logo=github",alt:"Repository"}))," ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment/releases"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/github/v/release/cogment/cogment?label=latest%20release&sort=semver&style=for-the-badge",alt:"Latest Release"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://hub.docker.com/r/cogment/cogment"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/docker/v/cogment/cogment?label=latest%20docker%20release&sort=semver&style=for-the-badge",alt:"Latest Docker Release"}))),(0,o.kt)("p",null,"The main Cogment module is a multi-platform standalone executable usable through a Command Line Interface, it is referred as the ",(0,o.kt)("strong",{parentName:"p"},"Cogment CLI"),"."),(0,o.kt)("p",null,"The Cogment CLI includes the following services:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("a",{parentName:"li",href:"/docs/reference/cli/orchestrator"},"Orchestrator"),", the heart of Cogment which executes the ",(0,o.kt)("a",{parentName:"li",href:"/docs/guide/core-concepts#trials"},"Trials")," by orchestrating the different user implemented services."),(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("a",{parentName:"li",href:"/docs/reference/cli/directory/directory-server"},"Directory"),' is the "directory" of services, where services register and can be found by clients and other services.'),(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("a",{parentName:"li",href:"/docs/reference/cli/trial-datastore/trial-datastore-server"},"Trial Datastore")," able to store and make available the data generated by the Trials."),(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("a",{parentName:"li",href:"/docs/reference/cli/model-registry"},"Model Registry")," which let's user store AI models and makes them available to actor implementations during training and in production.")),(0,o.kt)("h2",{id:"compatibility"},"Compatibility"),(0,o.kt)("p",null,"The Cogment CLI is available for the following OSes:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Linux")," with ",(0,o.kt)("inlineCode",{parentName:"li"},"amd64")," architecture (also known as ",(0,o.kt)("inlineCode",{parentName:"li"},"x86_64"),"), tested on Ubuntu 18.04 and 20.04, should be compatible with most recent distributions,"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"macOS")," with ",(0,o.kt)("inlineCode",{parentName:"li"},"amd64")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"arm64")," (Apple Silicon) architectures, tested on macOS 12, should be compatible with any macOS version >= 10.15,"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Windows")," with ",(0,o.kt)("inlineCode",{parentName:"li"},"amd64")," architecture, should be compatible with any Windows version >= Windows 10 version 1809.")),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Starting with ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment/releases/tag/v2.2.0"},"v2.2.0"),", the Cogment CLI is available for Linux, macOS and Windows on ",(0,o.kt)("inlineCode",{parentName:"p"},"x86_64"),"."),(0,o.kt)("p",{parentName:"admonition"},"Starting with ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment/releases/tag/v2.6.0"},"v2.6.0"),", the macOS ",(0,o.kt)("inlineCode",{parentName:"p"},"arm64")," version is also available.")),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("h3",{id:"installation-script-compatible-with-linux-and-macos"},"Installation script (compatible with linux and macOS)"),(0,o.kt)("p",null,"This installation method is compatible with virtually any Linux distribution, macOS and WSL2 on Windows. It only requires ",(0,o.kt)("inlineCode",{parentName:"p"},"bash")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"curl"),"."),(0,o.kt)("p",null,"First, download the install script and make sure you can run it using"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"curl --silent -L https://raw.githubusercontent.com/cogment/cogment/main/install.sh --output install-cogment.sh\nchmod +x install-cogment.sh\n")),(0,o.kt)("p",null,"You can then download and install the latest version to ",(0,o.kt)("inlineCode",{parentName:"p"},"/usr/local/bin")," using"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"sudo ./install-cogment.sh\n")),(0,o.kt)("p",null,"Other installation methods are available, for example:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Install version 2.2.0",(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-console"},"sudo ./install-cogment.sh --version 2.2.0\n"))),(0,o.kt)("li",{parentName:"ul"},"Install prereleased version 2.3.1-beta3, useful because prereleases are not considered by default",(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-console"},"sudo ./install-cogment.sh --version 2.2.0\n"))),(0,o.kt)("li",{parentName:"ul"},"Download the cogment exec in the current folder, make sure it is executable but skip the installation",(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-console"},"./install-cogment.sh --skip-install\n"))),(0,o.kt)("li",{parentName:"ul"},"Specify manually the arch and os",(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-console"},"./install-cogment.sh --arch amd64 --os Windows\n")))),(0,o.kt)("p",null,"All install options can be listed using"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"./install-cogment.sh --help\n")),(0,o.kt)("p",null,"Uninstall is as simple as running:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"sudo rm $(which cogment)\n")),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Yes, it is possible to install Cogment as a one-line by piping the install script to ",(0,o.kt)("inlineCode",{parentName:"p"},"bash")," ... at the risk of angering your system admin."),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-console"},"curl --silent -L https://raw.githubusercontent.com/cogment/cogment/main/install.sh | sudo ./install-cogment.sh\n"))),(0,o.kt)("h3",{id:"manual-installation"},"Manual installation"),(0,o.kt)("p",null,"If you are a Windows user (and also if you prefer to do a manual install), you can go through those instructions."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Download the desired version from ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/cogment/cogment/releases/"},"here")," for your platform."),(0,o.kt)("li",{parentName:"ol"},"Copy it as ",(0,o.kt)("inlineCode",{parentName:"li"},"cogment")," in a location that already belongs to your ",(0,o.kt)("inlineCode",{parentName:"li"},"PATH")," (e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"/usr/local/bin"),") or that you'll ",(0,o.kt)("a",{parentName:"li",href:"https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them"},"add to your ",(0,o.kt)("inlineCode",{parentName:"a"},"PATH")),", and make sure it is executable (e.g. using ",(0,o.kt)("inlineCode",{parentName:"li"},"chmod +x /usr/local/bin/cogment"),").")),(0,o.kt)("h3",{id:"docker"},"Docker"),(0,o.kt)("p",null,"A Cogment docker image is available on ",(0,o.kt)("a",{parentName:"p",href:"https://hub.docker.com/r/cogment/cogment"},"Docker Hub"),". It can be retrieved with the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"docker pull cogment/cogment\n")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"The docker version of Cogment is very handy for server deployment, however, because of the nature of docker, users need to take care of port forwarding and volume mounting if needed.")),(0,o.kt)("h3",{id:"unsupported-platform"},"Unsupported platform"),(0,o.kt)("p",null,"If your platform is not supported, add an ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment/issues"},"issue")," including the details of your platform and do not hesitate to ",(0,o.kt)("a",{parentName:"p",href:"/docs/community-channels"},"contact us"),"."),(0,o.kt)("h3",{id:"building-from-source"},"Building from source"),(0,o.kt)("p",null,"Building from sources is perfectly possible. Please refer to the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment#developers"},"build instructions")," for more information."),(0,o.kt)("h2",{id:"test-your-installation"},"Test your installation"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Depending on your platform and how you installed Cogment, it might be accessible as ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"./cogment"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment.exe")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"docker run cogment/cogment"),". We will use ",(0,o.kt)("inlineCode",{parentName:"p"},"cogment")," for the rest of this page and throughout the documentation.")),(0,o.kt)("p",null,"With a working installation you can run the following in a terminal:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"cogment version\n")),(0,o.kt)("p",null,"You can then list all the commands by typing:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"cogment help\n")),(0,o.kt)("p",null,"or for help on each individual command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"cogment help <command>\n")),(0,o.kt)("h3",{id:"launching-a-cogment-app"},"Launching a Cogment app"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"These instructions are only compatible with unix-like environments such as Linux, macOS and WSL2 on Windows.")),(0,o.kt)("p",null,"In order to test that your installation is fully working, run an existing Cogment app, for example one of the steps of the tutorial."),(0,o.kt)("p",null,"Download or clone the sources for the official Rock-Paper-Scissors (",(0,o.kt)("em",{parentName:"p"},"RPS"),") tutorial from ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment-tutorial-rps"},"https://github.com/cogment/cogment-tutorial-rps"),"."),(0,o.kt)("p",null,"To run this example you will need to have the following installed on top of Cogment:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.python.org/"},"python")," 3.7 or later,"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://virtualenv.pypa.io/en/latest/"},"virtualenv"),".")),(0,o.kt)("p",null,"Once it is done, run the following in the directory you retrieved:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"cd 5-human-player\n./run.sh build\n./run.sh services_start\n")),(0,o.kt)("p",null,"The first call to ",(0,o.kt)("inlineCode",{parentName:"p"},"./run.sh")," command will copy the cogment.yaml, and every referenced proto file, to each module directory, create virtualenvs, and install the python dependencies."),(0,o.kt)("p",null,"The second will start Cogment and the different services for this app. In another terminal you can connect to it and play a few games of ",(0,o.kt)("em",{parentName:"p"},"RPS")," against a simple AI agent."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"./run.sh client_start\n")),(0,o.kt)("p",null,"Congratulations, you have a working installation of Cogment! We recommend you head to the ",(0,o.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/"},"Cogment tutorial")," to learn how to implement this ",(0,o.kt)("em",{parentName:"p"},"RPS")," app from scratch."),(0,o.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,o.kt)("h3",{id:"pipe-creation-failed-24-too-many-open-files-error-on-macos"},(0,o.kt)("inlineCode",{parentName:"h3"},"pipe creation failed (24): Too many open files")," error on macOS"),(0,o.kt)("p",null,"On macOS, it is possible that Cogment tries to open too many file handles. In this case, you'll get an error similar to ",(0,o.kt)("inlineCode",{parentName:"p"},"pipe creation failed (24): Too many open files"),"."),(0,o.kt)("p",null,"You can access the current limit and update it using ",(0,o.kt)("inlineCode",{parentName:"p"},"ulimit -n"),". The default version should be something like 256, in most cases we found that Cogment requires 2048. You can set the limit with the following command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"$ ulimit -n 2048\n")),(0,o.kt)("p",null,"This command changes the limit in the current shell session. This ",(0,o.kt)("a",{parentName:"p",href:"https://unix.stackexchange.com/q/176671"},"stackexchange question")," discusses different ways to make the change persist."),(0,o.kt)("p",null,"For debugging purposes, you can inspect the open file handles using ",(0,o.kt)("inlineCode",{parentName:"p"},"lsof"),". E.g. ",(0,o.kt)("inlineCode",{parentName:"p"},"lsof -c cogment | wc -l")," will count the number of open file handles by Cogment processes."))}u.isMDXComponent=!0}}]);