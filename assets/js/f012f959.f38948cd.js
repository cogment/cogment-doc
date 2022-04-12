"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[229],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return u}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),u=o,f=d["".concat(s,".").concat(u)]||d[u]||m[u]||i;return n?r.createElement(f,a(a({ref:t},p),{},{components:n})):r.createElement(f,a({ref:t},p))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4352:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],l={title:"Configure Trial from Controller"},s="Fully configure a trial from a [**Controller**](/docs/concepts/core-concepts",c={unversionedId:"guide/implementation-recipes/configure-trial-from-controller",id:"guide/implementation-recipes/configure-trial-from-controller",title:"Configure Trial from Controller",description:"controller)",source:"@site/docs/guide/implementation-recipes/configure-trial-from-controller.md",sourceDirName:"guide/implementation-recipes",slug:"/guide/implementation-recipes/configure-trial-from-controller",permalink:"/docs/guide/implementation-recipes/configure-trial-from-controller",tags:[],version:"current",lastUpdatedAt:1649768289,formattedLastUpdatedAt:"4/12/2022",frontMatter:{title:"Configure Trial from Controller"},sidebar:"docSidebar",previous:{title:"Implementation Recipes",permalink:"/docs/guide/implementation-recipes/"},next:{title:"Migrate from Cogment v1 to v2",permalink:"/docs/guide/implementation-recipes/v2-migration-guide"}},p=[],m={toc:p};function d(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"fully-configure-a-trial-from-a-controller"},"Fully configure a trial from a ",(0,i.kt)("a",{parentName:"h1",href:"/docs/concepts/core-concepts#controller"},(0,i.kt)("strong",{parentName:"a"},"Controller"))),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Starting with versions v2.2.0 of Cogment and v2.1.0 of the python SDK, it is now possible to ",(0,i.kt)("a",{parentName:"p",href:"/docs/guide/development-guide#start-trial-from-trial-parameters"},"provide the full trial parameters when starting a trial"),". This recipe is still applicable but it is recommended to use the new method instead."))),(0,i.kt)("p",null,"When starting a trial, the controller can only provide an instance of the ",(0,i.kt)("strong",{parentName:"p"},"trial configuration")," message and from this instance the pre trial hook can fill the ",(0,i.kt)("strong",{parentName:"p"},"trial parameters"),", including a full configuring of the environment and actors involved in the trial. More details can be found ",(0,i.kt)("a",{parentName:"p",href:"/docs/guide/development-guide#pre-trial-hook"},"here"),". In some cases, you might want to fully configure a trial from the controller. This recipe is dedicated to this use case."),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Implementing this recipe enables any client having access to the orchestrator to specify URLs - the actor and environment endpoints - that will be accessed (and trusted) by the orchestrator."))),(0,i.kt)("p",null,"The general idea is to define ",(0,i.kt)("inlineCode",{parentName:"p"},"TrialConfig")," so that it includes everything that's needed to parametrize the trial. It should look something like the following."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-proto"},"message EnvironmentParams {\n  string endpoint = 1;\n  EnvConfig config = 2;\n  string implementation = 3;\n}\n\nmessage ActorParams {\n    string name = 1;\n    string actor_class = 2;\n    string endpoint = 3;\n    string implementation = 4;\n    ActorConfig config = 5;\n}\n\nmessage TrialConfig {\n    EnvironmentParams environment = 1;\n    repeated ActorParams actors = 2;\n    uint32 max_steps = 3;\n    uint32 max_inactivity = 4;\n}\n")),(0,i.kt)("p",null,"When starting a trial from the controller you'll need to define the full config."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'trial_id = await controller.start_trial(trial_config=TrialConfig(\n    environment=EnvironmentParams(\n        endpoint="grpc://my-environment:9000",\n        config=# [...],\n        implementation="my-implementation"\n    )\n))\n')),(0,i.kt)("p",null,"Finally a ",(0,i.kt)("em",{parentName:"p"},"pass-through")," pre-trial hook needs to be implemented, registered and served. Its endpoint must be specified to the Orchestrator on startup."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'async def passthrough_pre_trial_hook(pre_trial_hook_session):\n    trial_config = pre_trial_hook_session.trial_config\n    pre_trial_hook_session.environment_config = trial_config.environment.config\n    pre_trial_hook_session.environment_endpoint = trial_config.environment.endpoint\n    pre_trial_hook_session.environment_implementation = trial_config.environment.implementation\n    pre_trial_hook_session.actors = [\n        {\n            "name": actor_params.name,\n            "actor_class": actor_params.actor_class,\n            "endpoint": actor_params.endpoint,\n            "implementation": actor_params.implementation,\n            "config": actor_params.config,\n        }\n        for actor_params in trial_config.actors\n    ]\n    pre_trial_hook_session.trial_max_steps = trial_config.max_steps\n    pre_trial_hook_session.trial_max_inactivity = trial_config.max_inactivity\n\n    pre_trial_hook_session.validate()\n\ncontext.register_pre_trial_hook(pre_trial_hook)\n')))}d.isMDXComponent=!0}}]);