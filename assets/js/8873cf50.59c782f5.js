"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[10485],{16472:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>p,frontMatter:()=>a,metadata:()=>r,toc:()=>l});var i=o(24246),s=o(71670);const a={title:"Getting started with Compose on Podman Desktop",description:"Getting started with Compose on Podman Desktop",slug:"getting-started-with-compose",authors:["cdrage"],tags:["podman-desktop","story","compose","containers","containerfile","docker-compose","dockerfile","multi-container"],hide_table_of_contents:!1},t=void 0,r={permalink:"/blog/getting-started-with-compose",source:"@site/blog/2024-01-02-getting-started-with-compose.md",title:"Getting started with Compose on Podman Desktop",description:"Getting started with Compose on Podman Desktop",date:"2024-01-02T00:00:00.000Z",tags:[{label:"podman-desktop",permalink:"/blog/tags/podman-desktop"},{label:"story",permalink:"/blog/tags/story"},{label:"compose",permalink:"/blog/tags/compose"},{label:"containers",permalink:"/blog/tags/containers"},{label:"containerfile",permalink:"/blog/tags/containerfile"},{label:"docker-compose",permalink:"/blog/tags/docker-compose"},{label:"dockerfile",permalink:"/blog/tags/dockerfile"},{label:"multi-container",permalink:"/blog/tags/multi-container"}],readingTime:4.475,hasTruncateMarker:!1,authors:[{name:"Charlie Drage",title:"Software Engineer",url:"https://github.com/cdrage",imageURL:"https://github.com/cdrage.png",key:"cdrage"}],frontMatter:{title:"Getting started with Compose on Podman Desktop",description:"Getting started with Compose on Podman Desktop",slug:"getting-started-with-compose",authors:["cdrage"],tags:["podman-desktop","story","compose","containers","containerfile","docker-compose","dockerfile","multi-container"],hide_table_of_contents:!1},unlisted:!1,prevItem:{title:"Podman Desktop 1.7 Release",permalink:"/blog/podman-desktop-release-1.7"},nextItem:{title:"Podman Desktop 1.6 Release",permalink:"/blog/podman-desktop-release-1.6"}},d={authorsImageUrls:[void 0]},l=[{value:"Objectives",id:"objectives",level:2},{value:"What is Compose",id:"what-is-compose",level:2},{value:"Before we begin",id:"before-we-begin",level:2},{value:"Download and run the example application",id:"download-and-run-the-example-application",level:2},{value:"Viewing the guestbook application",id:"viewing-the-guestbook-application",level:2},{value:"Viewing and modifying the database",id:"viewing-and-modifying-the-database",level:2},{value:"How does it work?",id:"how-does-it-work",level:2},{value:"Scaling more replicas",id:"scaling-more-replicas",level:2}];function c(e){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components},{Icon:a}=n;return a||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Icon",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"In this blog post we will learn how take a multi-container Compose application and use it within Podman Desktop."}),"\n",(0,i.jsx)(n.h2,{id:"objectives",children:"Objectives"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Start the Compose YAML through ",(0,i.jsx)(n.code,{children:"podman compose up"}),"."]}),"\n",(0,i.jsx)(n.li,{children:"View the guestbook web application."}),"\n",(0,i.jsx)(n.li,{children:"Confirm the web application is being synchronized and running correctly with the database."}),"\n",(0,i.jsx)(n.li,{children:"Use Podman Desktop to view, inspect and access the terminal of the Redis cluster."}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"what-is-compose",children:"What is Compose"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://www.compose-spec.io/",children:"Compose is a specification"})," for defining and running multi-container Docker applications. With pose, you use a YAML file to configure your application\u2019s services, networks, and volumes. This allows you to capture in a single file the entire configuration necessary to run a set of interconnected containers as an application. For example, if you have an application that requires a web server, a database, and a caching service, you can define these components and their relationships in your Compose file."]}),"\n",(0,i.jsxs)(n.p,{children:["To use the Compose YAML, you can use a specification implementation such as ",(0,i.jsx)(n.a,{href:"https://docs.podman.io/en/latest/markdown/podman-compose.1.html",children:(0,i.jsx)(n.code,{children:"podman compose"})})," and ",(0,i.jsx)(n.a,{href:"https://github.com/docker/compose",children:(0,i.jsx)(n.code,{children:"docker compose"})}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"before-we-begin",children:"Before we begin"}),"\n",(0,i.jsx)(n.p,{children:"If you do not have Compose installed, let's go through the onboarding process to install the Compose implementation binary:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Get to Resources under ",(0,i.jsxs)(n.strong,{children:[(0,i.jsx)(a,{icon:"fa-solid fa-cog",size:"lg"})," Settings > Resources"]}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Click ",(0,i.jsx)(n.strong,{children:"Setup"})," under Compose (it will appear if it has not been installed yet)."]}),"\n",(0,i.jsx)(n.li,{children:"Go through the onboarding process."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Onboarding process",src:o(29856).Z+"",width:"1222",height:"946"})}),"\n",(0,i.jsxs)(n.p,{children:["Confirm that you are able to run ",(0,i.jsx)(n.code,{children:"podman compose"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"podman compose\nRun compose workloads via an external provider such as docker-compose or podman-compose\n\nDescription:\n  This command is a thin wrapper around an external compose provider such as docker-compose or podman-compose.  This means that podman compose is executing another tool that implements the compose functionality but sets up the environment in a way to let the compose provider communicate transparently with the local Podman socket.  The specified options as well the command and argument are passed directly to the compose provider.\n...\n"})}),"\n",(0,i.jsx)(n.h2,{id:"download-and-run-the-example-application",children:"Download and run the example application"}),"\n",(0,i.jsxs)(n.p,{children:["Our example application is located at ",(0,i.jsx)(n.a,{href:"https://github.com/redhat-developer/podman-desktop-demo",children:"github.com/redhat-developer/podman-desktop-demo"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["We will use ",(0,i.jsx)(n.code,{children:"git clone"})," so we can build the Go binary web application:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"git clone https://github.com/redhat-developer/podman-desktop-demo\ncd podman-desktop-demo/guestbook-compose\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Run ",(0,i.jsx)(n.code,{children:"podman compose up -d"})," to start the application:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:'podman compose up -d\n>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please refer to the documentation for details. <<<<\n\n[+] Running 3/3\n \u2714 Container redis-replica  Started                                                                        0.0s\n \u2714 Container web            Started                                                                        0.0s\n \u2714 Container redis-leader   Started                                                                        0.0s\n'})}),"\n",(0,i.jsx)(n.h2,{id:"viewing-the-guestbook-application",children:"Viewing the guestbook application"}),"\n",(0,i.jsx)(n.p,{children:"Within Podman Desktop, you can now see that all three containers are up and operational."}),"\n",(0,i.jsx)(n.p,{children:'Click the "Open Browser" button to view the web application:'}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Open browser",src:o(10517).Z+"",width:"1098",height:"812"})}),"\n",(0,i.jsx)(n.p,{children:"Within the Guestbook web application, you can:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:'"Sign" the guestbook, which will write to the Redis leader and synchronize to the replicas.'}),"\n",(0,i.jsx)(n.li,{children:'"Read" from the guestbook, which will read from the pool of Redis replicas. This allows for readability even if the Redis leader is unavailable.'}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"/env"}),": View the container's environment variables."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"/info"}),": View information about the Redis cluster."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Guestbook application",src:o(23698).Z+"",width:"949",height:"653"})}),"\n",(0,i.jsx)(n.h2,{id:"viewing-and-modifying-the-database",children:"Viewing and modifying the database"}),"\n",(0,i.jsx)(n.p,{children:"Using Podman Desktop, you can also access the container's terminal directly from the GUI and modify the database."}),"\n",(0,i.jsxs)(n.p,{children:['Click "Open Terminal" to access the ',(0,i.jsx)(n.code,{children:"redis-leader"})," terminal:"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Open terminal",src:o(70256).Z+"",width:"1353",height:"1003"})}),"\n",(0,i.jsx)(n.p,{children:"Modify the database as if you are doing database administration:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Run ",(0,i.jsx)(n.code,{children:"redis-cli"})," within the container to access the Redis database."]}),"\n",(0,i.jsxs)(n.li,{children:["Type ",(0,i.jsx)(n.code,{children:'LPUSH guestbook "Hello World!"'})," and you will see your web application update in real-time."]}),"\n",(0,i.jsxs)(n.li,{children:["Type ",(0,i.jsx)(n.code,{children:"DEL guestbook"})," and you will see that your database drops the ",(0,i.jsx)(n.code,{children:"guestbook"})," key and clears the database."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Redis CLI",src:o(24207).Z+"",width:"1353",height:"1003"})}),"\n",(0,i.jsx)(n.p,{children:"Changes will reflect in real-time on the guestbook."}),"\n",(0,i.jsx)(n.p,{children:"You can further modify the database and see the changes propagate to the Redis replicas."}),"\n",(0,i.jsxs)(n.p,{children:["For example, view the logs of the ",(0,i.jsx)(n.code,{children:"redis-replica"}),", and you will notice that there are periodic database synchronizations as well as reads to the database:"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Redis replica logs",src:o(58645).Z+"",width:"1353",height:"1003"})}),"\n",(0,i.jsx)(n.h2,{id:"how-does-it-work",children:"How does it work?"}),"\n",(0,i.jsx)(n.p,{children:"A quick overview of how the architecture works in this multi-container scenario:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Within the Guestbook application, it looks for a database with the names ",(0,i.jsx)(n.code,{children:"redis-leader"})," and ",(0,i.jsx)(n.code,{children:"redis-replica"})," on port 6379."]}),"\n",(0,i.jsx)(n.li,{children:"Because it is a Compose application, the containers are connected on the same network. This means that a neighboring container can be network-accessible simply by its container name."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"There is a set of environment variables that the web application can modify in the Compose application:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"REDIS_LEADER"}),": The default is ",(0,i.jsx)(n.code,{children:"redis-leader"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"REDIS_REPLICAS"}),": The default is ",(0,i.jsx)(n.code,{children:"redis-replica"}),". Can be comma-separated, such as ",(0,i.jsx)(n.code,{children:"redis-replica-1,redis-replica-2"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"REDIS_PORT"}),": The default is ",(0,i.jsx)(n.code,{children:"6379"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"SERVER_PORT"}),": The default is ",(0,i.jsx)(n.code,{children:"8080"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"scaling-more-replicas",children:"Scaling more replicas"}),"\n",(0,i.jsxs)(n.p,{children:["Want to scale more replicas? This can be achieved by adding an environment variable to your ",(0,i.jsx)(n.code,{children:"compose.yaml"})," and duplicating your ",(0,i.jsx)(n.code,{children:"redis-replica"})," entry."]}),"\n",(0,i.jsxs)(n.p,{children:["Modify your ",(0,i.jsx)(n.code,{children:"compose.yaml"})," as follows:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"services:\n  redis-leader:\n    container_name: redis-leader\n    image: redis:latest\n    ports:\n      - '6379'\n\n  redis-replica:\n    container_name: redis-replica\n    image: redis:latest\n    ports:\n      - '6379'\n    command: redis-server --replicaof redis-leader 6379\n\n  redis-replica-2:\n    container_name: redis-replica-2\n    image: redis:latest\n    ports:\n      - '6379'\n    command: redis-server --replicaof redis-leader 6379\n\n  web:\n    container_name: web\n    build: ./web\n    environment:\n      - REDIS_REPLICAS=redis-replica1,redis-replica2\n    ports:\n      - '8080:8080'\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Run ",(0,i.jsx)(n.code,{children:"podman compose up -d"})," again to ensure the new container has been added and the new environment variable has propagated:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:'podman compose up -d\n>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please refer to the documentation for details. <<<<\n\n[+] Running 4/4\n \u2714 Container redis-replica-2  Started                                                                      0.0s\n \u2714 Container redis-leader     Running                                                                      0.0s\n \u2714 Container web              Started                                                                      0.0s\n \u2714 Container redis-replica    Running                                                                      0.0s\n'})})]})}function p(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},23698:(e,n,o)=>{o.d(n,{Z:()=>i});const i=o.p+"assets/images/helloworld-516adc89ef8a509fb5ce998d3b0ea94b.png"},29856:(e,n,o)=>{o.d(n,{Z:()=>i});const i=o.p+"assets/images/onboarding-9b66ae02eaf2ebbec75dd092f78f26a3.png"},10517:(e,n,o)=>{o.d(n,{Z:()=>i});const i=o.p+"assets/images/openbrowser-9e28829878b62d868b2194a5a341fa1e.png"},70256:(e,n,o)=>{o.d(n,{Z:()=>i});const i=o.p+"assets/images/openterminal-648b30f8ad2add37bf4d5bafc37bfd46.png"},24207:(e,n,o)=>{o.d(n,{Z:()=>i});const i=o.p+"assets/images/redis-cli-d4648788bc57c0d57e0a7cdae4475d1d.png"},58645:(e,n,o)=>{o.d(n,{Z:()=>i});const i=o.p+"assets/images/redisreplica-31a441bbbe1383b80fb79a2f4dd52c56.png"},71670:(e,n,o)=>{o.d(n,{Z:()=>r,a:()=>t});var i=o(27378);const s={},a=i.createContext(s);function t(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);