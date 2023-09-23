"use strict";(self.webpackChunkcogment_doc=self.webpackChunkcogment_doc||[]).push([[5089],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>m});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),p=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=p(e.components);return a.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(t),m=r,h=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return t?a.createElement(h,i(i({ref:n},c),{},{components:t})):a.createElement(h,i({ref:n},c))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=u;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=t[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},5432:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=t(7462),r=(t(7294),t(3905));const o={sidebar_position:6},i="Launch",l={unversionedId:"reference/cli/launch",id:"reference/cli/launch",title:"Launch",description:"Launch is a utility command meant to facilitate locally launching and shutting down an entire Cogment project at once.",source:"@site/docs/reference/cli/launch.md",sourceDirName:"reference/cli",slug:"/reference/cli/launch",permalink:"/docs/reference/cli/launch",draft:!1,tags:[],version:"current",lastUpdatedAt:1695507333,formattedLastUpdatedAt:"Sep 23, 2023",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"docSidebar",previous:{title:"Web Proxy",permalink:"/docs/reference/cli/web-proxy"},next:{title:"Status",permalink:"/docs/reference/cli/status"}},s={},p=[{value:"Command line",id:"command-line",level:2},{value:"definition file",id:"definition-file",level:2},{value:"Nodes",id:"nodes",level:3},{value:"Scripts",id:"scripts",level:4},{value:"Environment Variables",id:"environment-variables",level:5},{value:"Working folder",id:"working-folder",level:5},{value:"Quiet",id:"quiet",level:5},{value:"Dependency <em>(Cogment &gt;= 2.16)</em>",id:"dependency-cogment--216",level:5},{value:"Global <em>(Cogment &gt;= 2.15)</em>",id:"global-cogment--215",level:4},{value:"Environment Variables",id:"environment-variables-1",level:5},{value:"Working folder",id:"working-folder-1",level:5},{value:"Variable substitution",id:"variable-substitution",level:3},{value:"Special Variables",id:"special-variables",level:4},{value:"Arguments <em>(Cogment &gt;= 2.15)</em>",id:"arguments-cogment--215",level:5},{value:"All Arguments <em>(Cogment &gt;= 2.17)</em>",id:"all-arguments-cogment--217",level:6},{value:"File Example",id:"file-example",level:3}],c={toc:p};function d(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"launch"},"Launch"),(0,r.kt)("p",null,"Launch is a utility command meant to facilitate locally launching and shutting down an entire Cogment project at once."),(0,r.kt)("p",null,"When launch is used, a set of processes will be launched to run in parallel, as described by a ",(0,r.kt)("a",{parentName:"p",href:"#definition-file"},"YAML definition file"),".\nOnce any of these processes terminates, all other ones will be terminated as well."),(0,r.kt)("p",null,"The order of of the script execution is undefined, which is to say that they may not start in the order they are defined, and may not always start in the same order.\nScript ",(0,r.kt)("a",{parentName:"p",href:"#dependency-cogment--216"},"dependency")," can be used if a certain order must be used."),(0,r.kt)("h2",{id:"command-line"},"Command line"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"cogment launch [options] filename [args...]")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"filename"),": Name (and path) of the YAML definition file describing the processes to launch."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"options"),":"),(0,r.kt)("p",null,"[-q]",", ","[--quiet]",': Disable some of the output generated by the launcher. Process output is never disabled by this option. To increase the level, more "q" can be added, up to ',(0,r.kt)("inlineCode",{parentName:"p"},"-qqq")," disabling all launcher generated output except errors."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"args"),": These are arguments that will be used in ",(0,r.kt)("a",{parentName:"p",href:"#variable-substitution"},"variable substitution")," in the definition file. If some arguments start with a dash (",(0,r.kt)("inlineCode",{parentName:"p"},"-"),") a double dash (",(0,r.kt)("inlineCode",{parentName:"p"},"--"),") must be used to separate these from the launch options."),(0,r.kt)("p",null,"E.g.:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ cogment launch --quiet ./launch.yaml 1000 8\n$ cogment launch -qq ./launch.yaml 1000 8\n$ cogment launch --quiet ./launch.yaml -- --file ./myfile --match_all\n")),(0,r.kt)("h2",{id:"definition-file"},"definition file"),(0,r.kt)("p",null,"The launch definition file is a ",(0,r.kt)("a",{parentName:"p",href:"https://yaml.org"},"YAML")," formatted file where the details of the parallel processes to run are defined.\nThe file consists of at least a ",(0,r.kt)("inlineCode",{parentName:"p"},"scripts")," top level node, and may also contain a ",(0,r.kt)("inlineCode",{parentName:"p"},"global")," top level node."),(0,r.kt)("h3",{id:"nodes"},"Nodes"),(0,r.kt)("h4",{id:"scripts"},"Scripts"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"scripts")," node contains the details of the processes to run.\nEach node under ",(0,r.kt)("inlineCode",{parentName:"p"},"scripts")," represents a process to run.\nThe name of the node becomes the identity of the script/process and serves to identify the process output."),(0,r.kt)("p",null,"Each process will run the contents of the ",(0,r.kt)("inlineCode",{parentName:"p"},"commands")," list in sequence (i.e. the next command will start when the previous ends). Each command runs in an independent environment (e.g. environment variables set by one command will not be seen by the others)."),(0,r.kt)("p",null,"E.g.:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'scripts:\n    process_a: # The name of this process is "process_a"\n        commands:\n            - ["retrieve_db.sh"]\n            - ["python3", "env/main.py"]\n\n    process_b: # The name of this process is "process_b"\n        commands:\n            - ["cogment", "service", "orchestrator"]\n')),(0,r.kt)("p",null,"The output will then look something like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-output"},"2023-06-30T22:24:08Z [TRACE ] [process_a] Ready\n2023-06-30T22:24:08Z [TRACE ] [process_a:(1/2)] Launch [retrieve_db.sh]\n2023-06-30T22:24:08Z [TRACE ] [process_b] Ready\n2023-06-30T22:24:08Z [stdout] [process_a:(1/2)] Retrieving default database...\n2023-06-30T22:24:08Z [TRACE ] [process_b:(1/1)] Launch [cogment services orchestrator]\n2023-06-30T22:24:08Z [stderr] [process_b:(1/1)] 2023-06-30T22:24:08Z [INFO] [cmd] starting the orchestrator service [version:2.16.0]\n2023-06-30T22:24:09Z [stderr] [process_a:(1/2)] Record #2278 inconsistent\n2023-06-30T22:24:12Z [stdout] [process_a:(1/2)] Database retrieved in /app/sb/\n2023-06-30T22:24:12Z [TRACE ] [process_a:(1/2)] Completed\n2023-06-30T22:24:12Z [TRACE ] [process_a:(2/2)] Launch [python3 env/main.py]\n...\n")),(0,r.kt)("p",null,"Notes:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},'"',"[TRACE ]",'" is low level information from the launcher (it could also be "',"[INFO ]",'" for more important information).'),(0,r.kt)("li",{parentName:"ul"},'"',"[stdout]",'", and "',"[stderr]",'" are the output from the process.'),(0,r.kt)("li",{parentName:"ul"},'"process_a" and "process_b" are the names given to the processes in the definition file.'),(0,r.kt)("li",{parentName:"ul"},'"(1/2)" means that it is the first command out of two for that process.'),(0,r.kt)("li",{parentName:"ul"},"The times/dates are in RFC3339 format.")),(0,r.kt)("h5",{id:"environment-variables"},"Environment Variables"),(0,r.kt)("p",null,"You can set environment variables using the ",(0,r.kt)("inlineCode",{parentName:"p"},"environment")," node of the process.\nThese will be part of the environment of all commands in the process."),(0,r.kt)("p",null,"E.g:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'scripts:\n    orchestrator:\n        environment:\n            COGMENT_ORCHESTRATOR_ACTOR_PORT: 9000\n            COGMENT_LIFECYCLE_PORT: 9000\n        commands:\n            - ["cogment", "services", "orchestrator"]\n')),(0,r.kt)("h5",{id:"working-folder"},"Working folder"),(0,r.kt)("p",null,"By default, the current working folder is set to the folder ",(0,r.kt)("strong",{parentName:"p"},"containing the launch definition file")," (not the folder where the Launch command is executed).\nYou can change the working folder with the ",(0,r.kt)("inlineCode",{parentName:"p"},"folder")," node for each process."),(0,r.kt)("p",null,"E.g.:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'# Definition file is in "/home/user"\nscripts:\n    actor_alpha:\n        folder: ./actors/alpha # Working folder is "/home/user/actors/alpha"\n        commands:\n            - ["python3", "main.py"]\n')),(0,r.kt)("h5",{id:"quiet"},"Quiet"),(0,r.kt)("p",null,"You can control the process output by setting this value to ",(0,r.kt)("inlineCode",{parentName:"p"},"True")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"False"),".\nBy default this is ",(0,r.kt)("inlineCode",{parentName:"p"},"False"),", in which case standard process output (stdout and stderr) are also output by the launcher.\nIf set to ",(0,r.kt)("inlineCode",{parentName:"p"},"True"),", standard process output is discarded and not output by the launcher."),(0,r.kt)("p",null,"E.g.:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'scripts:\n    setup:\n        quiet: True\n        commands:\n            - ["python3", "setup.py"]\n')),(0,r.kt)("h5",{id:"dependency-cogment--216"},"Dependency ",(0,r.kt)("em",{parentName:"h5"},"(Cogment >= 2.16)")),(0,r.kt)("p",null,"Inter-process dependency can also be defined using the ",(0,r.kt)("inlineCode",{parentName:"p"},"depends_on")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"ready_output")," nodes of the script."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"depends_on"),' node is a list of process names that this script depends on.\nWhich means that all the listed processes must be "ready" before the current process is started.'),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"ready_output"),' node is a regex (regular expression) string to search for in the output of the process.\nWhen the regex matches the output, the process is considered to be "ready".\nIf no regex string is provided (or the regex string is empty), the process is considered "ready" as soon as it starts.'),(0,r.kt)("p",null,"E.g.:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'scripts:\n    process_a:\n        quiet: True\n        commands:\n            - ["retrieve_db.sh"]\n            - ["python3", "env/main.py"]\n        ready_output: \'^Database retrieved in\'\n\n    process_b:\n        depends_on:\n            - process_a\n        commands:\n            - ["cogment", "service", "orchestrator"]\n')),(0,r.kt)("p",null,"Notes:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"It is better to use single quotes to define the regex string to prevent YAML from interpreting control characters (e.g. backslash)."),(0,r.kt)("li",{parentName:"ul"},"Be aware that colors and other terminal controls (e.g. curses) in the process output can make matching difficult."),(0,r.kt)("li",{parentName:"ul"},"The version of regex currently used mostly follows ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/google/re2/wiki/Syntax"},"Google's RE2"),"."),(0,r.kt)("li",{parentName:"ul"},"The matching of the process output is not affected by the ",(0,r.kt)("a",{parentName:"li",href:"#quiet"},"quiet")," script option.")),(0,r.kt)("h4",{id:"global-cogment--215"},"Global ",(0,r.kt)("em",{parentName:"h4"},"(Cogment >= 2.15)")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"global")," node contains values that have a global scope (i.e. they affect all scripts defined in the file).\nSome of these values can be overridden by the individual scripts."),(0,r.kt)("h5",{id:"environment-variables-1"},"Environment Variables"),(0,r.kt)("p",null,"You can set global environment variables using the ",(0,r.kt)("inlineCode",{parentName:"p"},"environment")," node under the ",(0,r.kt)("inlineCode",{parentName:"p"},"global")," node.\nThese variables will be part of the environment of all scripts, unless overridden locally in the script's own ",(0,r.kt)("inlineCode",{parentName:"p"},"environment")," node."),(0,r.kt)("p",null,"E.g:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"global:\n    environment:\n        COGMENT_LOG_LEVEL: info\n        COGMENT_DIRECTORY_ENDPOINT: grpc://server:9010\n")),(0,r.kt)("h5",{id:"working-folder-1"},"Working folder"),(0,r.kt)("p",null,"By default, the current working folder is set to the folder ",(0,r.kt)("strong",{parentName:"p"},"containing the launch definition file")," (not the folder where the Launch command is executed).\nThis can be changed with the ",(0,r.kt)("inlineCode",{parentName:"p"},"folder")," node under the ",(0,r.kt)("inlineCode",{parentName:"p"},"global")," node.\nIt will then become the default folder for all scripts, unless locally changed by the script's own ",(0,r.kt)("inlineCode",{parentName:"p"},"folder")," node.\nEach level can also build on the previous one if the provided folder is a relative folder."),(0,r.kt)("p",null,"E.g.:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'# Definition file is in "/home/user"\nglobal:\n    folder: ./app # Default folder for all scripts is set to "/home/user/app"\nscripts:\n    local:\n        folder: ./inside # Working folder is then "/home/user/app/inside"\n    somewhere:\n        folder: /home/away # Working folder is then "/home/away"\n')),(0,r.kt)("h3",{id:"variable-substitution"},"Variable substitution"),(0,r.kt)("p",null,"You can substitute launch variables using ",(0,r.kt)("inlineCode",{parentName:"p"},"{{.VAR}}")," in strings anywhere in the ",(0,r.kt)("inlineCode",{parentName:"p"},"commands"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"environment")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"ready_output")," nodes of the yaml definition file.\nAll environment variables when ",(0,r.kt)("inlineCode",{parentName:"p"},"launch")," is started are defined as launch variables.\nNew environment variables set in the definition file also define launch variables.\nAnd launch defines some ",(0,r.kt)("a",{parentName:"p",href:"#special-variables"},"special variables")," internally also."),(0,r.kt)("p",null,'In the concerned strings, the double open curly brackets ("',(0,r.kt)("inlineCode",{parentName:"p"},"{{"),'") delimit the start of a variable to be substituted, therefore to include a literal double open brackets in a string, you have to surround them with backticks inside substitution brackets: ',(0,r.kt)("inlineCode",{parentName:"p"},"{{`{{`}}"),"."),(0,r.kt)("p",null,"Undefined values will be replaced with ",(0,r.kt)("inlineCode",{parentName:"p"},"<no value>"),"."),(0,r.kt)("p",null,"E.g.:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ export OWNER=Elvis\n$ cogment launch ./launch.yaml\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'scripts:\n    say_hi:\n        environment:\n            Type: "How"\n            Question: "{{.Type}} are you?"\n        commands:\n            - ["echo", "Hello, {{.OWNER}}. {{.Question}}"] # echo "Hello, Elvis. How are you?"\n            - ["echo", "{{`{{`}} brackets }}"] # echo "{{ brackets }}"\n            - ["echo", "no val: {{.MADE_UP_VARIABLE}}"] # echo "no val: <no value>"\n        ready_output: "Hello, {{.OWNER}}.*"\n')),(0,r.kt)("h4",{id:"special-variables"},"Special Variables"),(0,r.kt)("p",null,"The launch program will also define variables that can be used in substitutions.\nThese internally defined variables start with a double underscore (",(0,r.kt)("inlineCode",{parentName:"p"},"__"),")."),(0,r.kt)("p",null,"Environment variables with conflicting names will be replaced by these internal launch variables.\nNote that this only affects variable substitution, not the environment of the command execution.\nAnd internal launch variables are not available as environment variables."),(0,r.kt)("h5",{id:"arguments-cogment--215"},"Arguments ",(0,r.kt)("em",{parentName:"h5"},"(Cogment >= 2.15)")),(0,r.kt)("p",null,"The arguments from the command line of launch define variables and can thus be substituted.\nE.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"cogment launch ./launch.yaml arg1 arg2 arg3")," will define ",(0,r.kt)("inlineCode",{parentName:"p"},"__1"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"__2")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"__3")," respectively corresponding to ",(0,r.kt)("inlineCode",{parentName:"p"},"arg1"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"arg2")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"arg3"),".\nThey can then be substituted with ",(0,r.kt)("inlineCode",{parentName:"p"},"{{.__1}}"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"{{.__2}}"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"{{.__3}}"),"."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"__1")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"__9")," are always defined, but will be empty if no corresponding argument was given on the command line.\nArguments 10 (",(0,r.kt)("inlineCode",{parentName:"p"},"__10"),") and above will only be defined if they were provided on the command line."),(0,r.kt)("p",null,"E.g.:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ cogment launch -q ./launch.yaml 42 foo\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'scripts:\n    args_out:\n        commands:\n            - ["echo", "args:", "{{.__1}}", "{{.__2}}", "{{.__3}}"] # echo "args:" "42" "foo" ""\n            - ["echo", "empty: >{{.__3}}< >{{.__6}}<"] # echo "empty: >< ><"\n            - ["echo", "no args: {{.__10}} {{.__42}}"] # echo "no args: <no value> <no value>"\n        ready_output: \'.* {{.__2}} $\'\n')),(0,r.kt)("h6",{id:"all-arguments-cogment--217"},"All Arguments ",(0,r.kt)("em",{parentName:"h6"},"(Cogment >= 2.17)")),(0,r.kt)("p",null,"The number of arguments on the command line of launch is defined in ",(0,r.kt)("inlineCode",{parentName:"p"},"__NB_ARGS"),".\nAnd all the launch arguments can be added to a script command with ",(0,r.kt)("inlineCode",{parentName:"p"},"__ALL_ARGS"),"."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"__ALL_ARGS")," variable is special in terms of substitution; if the command argument string is exactly ",(0,r.kt)("inlineCode",{parentName:"p"},"{{.__ALL_ARGS}}"),", then all launch arguments will be added to this command. Otherwise if it is only ",(0,r.kt)("em",{parentName:"p"},"part")," of a string, it will substitute a string containing all launch arguments."),(0,r.kt)("p",null,'In other words, a command argument "{{.',(0,r.kt)("strong",{parentName:"p"},'ALL_ARGS}}" will expand to multiple arguments for the command, whereas something like "--{{.'),'ALL_ARGS}}" will stay as one argument (a string that contains all launch arguments preceded by "--").'),(0,r.kt)("p",null,"E.g.:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ cogment launch ./launch.yaml 42 foo extra\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'scripts:\n    args_out:\n        commands:\n            - ["echo", "nb of args: {{.__NB_ARGS}}]"] # echo "nb of args: 3"\n            - ["echo", "all:", "{{.__ALL_ARGS}}", "and more"] # echo "all:" "42" "foo" "extra" "and more"\n            - ["echo", "all:", "args: {{.__ALL_ARGS}}"] # echo "all:" "args: 42 foo extra"\n        ready_output: \'args:.*{{.__2}}\'\n')),(0,r.kt)("h3",{id:"file-example"},"File Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'global:\n    environment:\n        RUN_NAME: "COGRUN-{{.HOSTNAME}}-{{.__1}}"\n        COGMENT_LOG_LEVEL: info\n        DIR_PORT: 9010\n        COGMENT_DIRECTORY_ENDPOINT: "grpc://server:{{.DIR_PORT}}"\n    folder: /app\n\nscripts:\n    prep:\n        commands:\n            - ["./importdata.sh"]\n            - ["./cudasetup.sh"]\n            - ["sleep", "infinity"] # To prevent process from ending\n        ready_output: \'^Done\'\n    directory:\n        quiet: true\n        folder: ./cogment\n        environment:\n            COGMENT_DIRECTORY_PORT: "{{.DIR_PORT}}"\n        depends_on:\n            - prep\n        commands:\n            - ["cogment", "services", "directory"]\n        ready_output: \'Listening \\[port:[0-9]*\\]\' # To match "Listening [port:9010]"\n    orchestrator:\n        folder: ./cogment\n        environment:\n            COGMENT_ORCHESTRATOR_ACTOR_PORT: 0\n            COGMENT_LIFECYCLE_PORT: 0\n        depends_on:\n            - directory\n        commands:\n            - ["cogment", "services", "orchestrator"]\n    runner:\n        folder: ./pycode\n        depends_on:\n            - directory\n            - orchestrator\n        commands:\n            - [\n                  "python3",\n                  "runner.py",\n                  "-u {{.USER}}",\n                  "-n {{.RUN_NAME}}",\n                  "{{.__2}}",\n              ]\n    report:\n        commands:\n            - ["reporting_service"]\n')))}d.isMDXComponent=!0}}]);