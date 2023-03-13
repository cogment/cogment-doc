"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[696],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=i.createContext({}),l=function(e){var t=i.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=l(e.components);return i.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},h=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),h=l(n),m=a,u=h["".concat(c,".").concat(m)]||h[m]||p[m]||r;return n?i.createElement(u,o(o({ref:t},d),{},{components:n})):i.createElement(u,o({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<r;l++)o[l]=n[l];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}h.displayName="MDXCreateElement"},9586:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var i=n(3117),a=(n(7294),n(3905));const r={},o="Step 8: Improving  operational efficiency with a directory",s={unversionedId:"guide/tutorial/directory",id:"guide/tutorial/directory",title:"Step 8: Improving  operational efficiency with a directory",description:"This part of the tutorial follows step 7.",source:"@site/docs/guide/tutorial/8-directory.md",sourceDirName:"guide/tutorial",slug:"/guide/tutorial/directory",permalink:"/docs/guide/tutorial/directory",draft:!1,tags:[],version:"current",lastUpdatedAt:1671037674,formattedLastUpdatedAt:"12/14/2022",sidebarPosition:8,frontMatter:{},sidebar:"docSidebar",previous:{title:"Step 7: Add a player trained with Reinforcement Learning using DQN",permalink:"/docs/guide/tutorial/dqn-player"},next:{title:"Implementation Recipes",permalink:"/docs/guide/implementation-recipes/"}},c={},l=[{value:"Adding the Directory service",id:"adding-the-directory-service",level:2},{value:"Registering services to the Directory",id:"registering-services-to-the-directory",level:2},{value:"Discovering services from the Directory",id:"discovering-services-from-the-directory",level:2},{value:"Client special case",id:"client-special-case",level:2},{value:"Authentication Token",id:"authentication-token",level:2}],d={toc:l};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"step-8-improving--operational-efficiency-with-a-directory"},"Step 8: Improving  operational efficiency with a directory"),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"This part of the tutorial follows ",(0,a.kt)("a",{parentName:"p",href:"/docs/guide/tutorial/dqn-player"},"step 7"),".\nIt is not necessary to have gone through all the previous sections to understand this part, but the code changes refer to the code in step 7.\nThis step also requires at least Cogment 2.9.2 and Cogment Python SDK 2.3.0.\nThe code can be retrieved from the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cogment/cogment-tutorial-rps"},"tutorial's repository"),"."))),(0,a.kt)("p",null,"In this step of the tutorial, we will add the Cogment ",(0,a.kt)("a",{parentName:"p",href:"/docs/reference/cli/directory/directory-server"},"Directory")," to the project. A directory is a register of services together with the network addresses where to connect to the services.\nThis will let components find the services they need instead of having to already know the network address.\nIt makes it easier to manage more complicated projects and complex deployments."),(0,a.kt)("h2",{id:"adding-the-directory-service"},"Adding the Directory service"),(0,a.kt)("p",null,"In the ",(0,a.kt)("inlineCode",{parentName:"p"},"./run.sh")," script we will add the command to start the Directory service."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"function directory_start() {\n  cogment services directory --port=9005\n}\n")),(0,a.kt)("p",null,"Since the Directory is a service that all other services depend upon, it needs to be started first. Here we have a few choices; we could decide to start it in a separate terminal before the other services, or we could start it in the background with the same command as starting the services. It could also be kept running all the time.\nFor the purpose of demonstration and simplicity we will start it in the background, so in the ",(0,a.kt)("inlineCode",{parentName:"p"},"./run.sh")," script we will change the ",(0,a.kt)("inlineCode",{parentName:"p"},"services_start")," command like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"function services_start() {\n  directory_start &\n  sleep 3\n  _run_parallel orchestrator_start environment_start random_agent_start dqn_agent_start\n}\n")),(0,a.kt)("h2",{id:"registering-services-to-the-directory"},"Registering services to the Directory"),(0,a.kt)("p",null,'Now that we have a directory, we need to register the services so they can be "discovered" by components.\nThe Cogment SDK and CLI know how to use a directory and will register themselves if possible.\nTo make it possible, the components need to know the network address of the directory.\nThis can be provided on an individual basis at the code level, e.g.:'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'  context = cogment.Context(cog_settings=cog_settings, user_id="rps", directory_endpoint="grpc://localhost:9005")\n')),(0,a.kt)("p",null,"For the CLI it can be provided on the command line, e.g.:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'$ cogment services orchestrator --directory_endpoint="grpc://localhost:9005"\n')),(0,a.kt)("p",null,"But the easiest way is to set the environment variable ",(0,a.kt)("inlineCode",{parentName:"p"},"COGMENT_DIRECTORY_ENDPOINT"),", which is what we will do here by adding it to the ",(0,a.kt)("inlineCode",{parentName:"p"},"./.env")," file. And while we are there, we will parametrize the directory port for better maintainability:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'DIRECTORY_PORT=9005\nCOGMENT_DIRECTORY_ENDPOINT="grpc://localhost:${DIRECTORY_PORT}"\n')),(0,a.kt)("p",null,"and in ",(0,a.kt)("inlineCode",{parentName:"p"},"./run.sh")," we update the directory start command like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'function directory_start() {\n  _load_dot_env\n  cogment services directory --port="${DIRECTORY_PORT}"\n}\n')),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"In special circumstances, which we don't need for this tutorial, components can be registered explicitly with the ",(0,a.kt)("a",{parentName:"p",href:"/docs/reference/cli/directory/directory-client"},"Directory client CLI"),". "))),(0,a.kt)("h2",{id:"discovering-services-from-the-directory"},"Discovering services from the Directory"),(0,a.kt)("p",null,'We have a directory, and the services are registered in that directory, but for it to be useful, we need to "discover" these services. This is done by providing Cogment with ',(0,a.kt)("a",{parentName:"p",href:"/docs/reference/parameters#cogment-endpoints"},"discovery endpoints")," instead grpc endpoints (i.e. network addresses)."),(0,a.kt)("p",null,"Let's start with the client (",(0,a.kt)("inlineCode",{parentName:"p"},"./client/main.py"),"), we'll change the endpoint variables to context discovery endpoints like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'ORCHESTRATOR_ENDPOINT = "cogment://discover"\nENVIRONMENT_ENDPOINT = "cogment://discover"\nRANDOM_AGENT_ENDPOINT = "cogment://discover"\nDQN_AGENT_ENDPOINT = "cogment://discover"\n')),(0,a.kt)("p",null,'How is Cogment differentiating and finding the right service?\nThis is done by using the context where the endpoint is provided, thus the name "context" discovery endpoint.\nEndpoints can also be "explicit" discovery endpoints, in which case they don\'t use the context in which they are used; all the information is in the endpoint explicitly (since we consider the context information to be implicit).'),(0,a.kt)("p",null,"An example of context information can be seen here where the orchestrator endpoint is given:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'controller = await context.get_controller(endpoint=cogment.Endpoint("cogment://discover"))\n')),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"cogment://discover")," string does not contain anything to say that this is for an orchestrator.\nBut because it is given to the ",(0,a.kt)("inlineCode",{parentName:"p"},"get_controller")," parameter which requires an orchestrator endpoint, Cogment has the context that this is an endpoint to communicate with an orchestrator, so it will use this fact (i.e. this must be an endpoint for an orchestrator) to inquire the directory.\nIn other words, it matters where a context discovery endpoint is used."),(0,a.kt)("p",null,"We can also simplify the code even further because the method ",(0,a.kt)("inlineCode",{parentName:"p"},"get_controller")," has a default endpoint parameter, and the default value for a ",(0,a.kt)("inlineCode",{parentName:"p"},"cogment.Endpoint"),' is a pure context discovery endpoint (i.e. "cogment://discover"), so we can change it like this:'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"controller = await context.get_controller()\n")),(0,a.kt)("p",null,"Which means that we don't need the ",(0,a.kt)("inlineCode",{parentName:"p"},"ORCHESTRATOR_ENDPOINT")," variable anymore, and we'll remove that from the client file. Then we also don't need the ",(0,a.kt)("inlineCode",{parentName:"p"},"ORCHESTRATOR_HOST")," environment variable, and we'll remove that from the ",(0,a.kt)("inlineCode",{parentName:"p"},"./.env")," file. Note that we still want to keep the ",(0,a.kt)("inlineCode",{parentName:"p"},"ORCHESTRATOR_PORT")," environment variable to centralize the port selection for our different services, it just makes it easier to maintain our project."),(0,a.kt)("p",null,"Now we do the same (still in the client file) for the environment; we remove the ",(0,a.kt)("inlineCode",{parentName:"p"},"ENVIRONMENT_ENDPOINT")," variable, and since the environment also has a pure context discovery default endpoint, we can remove it:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'trial_params=cogment.TrialParameters(\n        cog_settings,\n        environment_name="env",\n        environment_config=environment_config,\n        actors=[\n            actor_1_params,\n            actor_2_params,\n        ]\n    )\n')),(0,a.kt)("p",null,"And we remove the ",(0,a.kt)("inlineCode",{parentName:"p"},"ENVIRONMENT_HOST")," environment variable from the ",(0,a.kt)("inlineCode",{parentName:"p"},"./.env")," file."),(0,a.kt)("p",null,'And finally for the actors... But wait a second, we have multiple actors, how is Cogment to differentiate them?\nIn this case, it is easy, the context for actors has three elements: that it is an "actor, its actor class, and its implementation name (note that the environment also has an implementation name in its context, but here we only have one environment, so there is no confusion).\nSince all our actors have different implementation names, then the context is sufficient to uniquely identify our actors.\nSo we do the same here as we did for the environment, and again the default endpoint for actors is a context discovery endpoint, so we can remove it, getting:'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'actor_1_params = cogment.ActorParameters(\n        cog_settings,\n        name="player_1",\n        class_name="player",\n        implementation="dqn_agent"\n    )\n    actor_2_params = cogment.ActorParameters(\n        cog_settings,\n        name="player_2",\n        class_name="player",\n        implementation="heuristic_agent"\n    )\n')),(0,a.kt)("p",null,"and the final ",(0,a.kt)("inlineCode",{parentName:"p"},"./.env")," file looks like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'ORCHESTRATOR_PORT=9000\nENVIRONMENT_PORT=9001\nRANDOM_AGENT_PORT=9002\nDQN_AGENT_PORT=9003\nDIRECTORY_PORT=9005\nCOGMENT_DIRECTORY_ENDPOINT="grpc://localhost:${DIRECTORY_PORT}"\n')),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"In cases when the context would not be enough to differentiate between services, the directory allows properties to be added to registered services (e.g. for actors, as parameters to the ",(0,a.kt)("inlineCode",{parentName:"p"},"Context.register_actor")," method), and these properties can be added to a context discovery endpoint (e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},"cogment://discover?tag=red&zone=1"),")."))),(0,a.kt)("h2",{id:"client-special-case"},"Client special case"),(0,a.kt)("p",null,"In step 5 and 6 of the tutorial we had a client actor.\nClient actors are effectively not services and thus don't register themselves in the directory.\nThey could be explicitly registered using the CLI if it could simplify things, but for the purpose of this tutorial, it is not useful.\nOn the other hand, the way a client actor joins a trial is simplified when there is a directory.\nInstead of something like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'await context.join_trial(trial_id=trial_id, endpoint=cogment.Endpoint(ORCHESTRATOR_ENDPOINT), actor_name="player_1")\n')),(0,a.kt)("p",null,"Because, again, the endpoint parameter has a default context discovery endpoint, this would suffice:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'await context.join_trial(trial_id=trial_id, actor_name="player_1")\n')),(0,a.kt)("h2",{id:"authentication-token"},"Authentication Token"),(0,a.kt)("p",null,"All directory communications require an Authentication Token. By default, this is empty, but it can be set to any string and used in many situations.\nOne case that is useful is to isolate different running projects, when there is only a single directory that is always running.\nThe easiest way to do this is to add this environment variable to the ",(0,a.kt)("inlineCode",{parentName:"p"},"./.env")," file:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'COGMENT_DIRECTORY_AUTHENTICATION_TOKEN="project-tutorial-8"\n')),(0,a.kt)("p",null,"Then all registrations will use this authentication token and all inquiries will require this authentication token (i.e. only services that were registered with this authentication token will be found)."),(0,a.kt)("h1",{id:"step-85-using-cogment-environment-variables"},"Step 8.5: Using Cogment environment variables"),(0,a.kt)("p",null,"In this step we'll use the Cogment environment variables to simplify management of the project.\nSo we will add these environment variables to the ",(0,a.kt)("inlineCode",{parentName:"p"},"./.env")," file:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"COGMENT_DIRECTORY_PORT=9005\nCOGMENT_LIFECYCLE_PORT=9000\nCOGMENT_ACTOR_PORT=9000\n")),(0,a.kt)("p",null,"and remove the tutorial specifc variables, which leaves us with a ",(0,a.kt)("inlineCode",{parentName:"p"},"./.env")," file that looks like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'# Local (tutorial specific) variables\nENVIRONMENT_PORT=9001\nRANDOM_AGENT_PORT=9002\nDQN_AGENT_PORT=9003\n\n# Cogment environment variables\nCOGMENT_LIFECYCLE_PORT=9000\nCOGMENT_ACTOR_PORT=9000\nCOGMENT_DIRECTORY_PORT=9005\nCOGMENT_DIRECTORY_ENDPOINT="grpc://localhost:${COGMENT_DIRECTORY_PORT}"\nCOGMENT_DIRECTORY_AUTHENTICATION_TOKEN="project-tutorial-8"\n')),(0,a.kt)("p",null,"With this, these two commands in the ",(0,a.kt)("inlineCode",{parentName:"p"},"./run.sh")," file are simplified to:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"function directory_start() {\n  _load_dot_env\n  cogment services directory\n}\n\nfunction orchestrator_start() {\n  _load_dot_env\n  cogment services orchestrator\n}\n")))}p.isMDXComponent=!0}}]);