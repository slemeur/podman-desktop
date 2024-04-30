"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[19043],{49887:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var s=i(24246),t=i(71670);const r={sidebar_position:10,title:"Push an image to Kind",description:"Pushing an image to your Kind cluster",keywords:["podman desktop","podman","containers","images","migrating","kubernetes"],tags:["migrating-to-kubernetes","images"]},o="Pushing an image to your local Kind-powered Kubernetes cluster",a={id:"kubernetes/kind/pushing-an-image-to-kind",title:"Push an image to Kind",description:"Pushing an image to your Kind cluster",source:"@site/docs/kubernetes/kind/pushing-an-image-to-kind.md",sourceDirName:"kubernetes/kind",slug:"/kubernetes/kind/pushing-an-image-to-kind",permalink:"/docs/kubernetes/kind/pushing-an-image-to-kind",draft:!1,unlisted:!1,editUrl:"https://github.com/containers/podman-desktop/tree/main/website/docs/kubernetes/kind/pushing-an-image-to-kind.md",tags:[{label:"migrating-to-kubernetes",permalink:"/docs/tags/migrating-to-kubernetes"},{label:"images",permalink:"/docs/tags/images"}],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10,title:"Push an image to Kind",description:"Pushing an image to your Kind cluster",keywords:["podman desktop","podman","containers","images","migrating","kubernetes"],tags:["migrating-to-kubernetes","images"]},sidebar:"mySidebar",previous:{title:"Existing Kubernetes",permalink:"/docs/kubernetes/existing-kubernetes/"},next:{title:"Push an image to Lima",permalink:"/docs/kubernetes/lima/pushing-an-image-to-lima"}},d={},c=[{value:"Prerequisites",id:"prerequisites",level:4},{value:"Procedure",id:"procedure",level:4},{value:"Verification",id:"verification",level:4}];function l(e){const n={a:"a",code:"code",h1:"h1",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components},{Icon:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Icon",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"pushing-an-image-to-your-local-kind-powered-kubernetes-cluster",children:"Pushing an image to your local Kind-powered Kubernetes cluster"}),"\n",(0,s.jsx)(n.p,{children:"With Podman Desktop, you can push an image to your local Kind-powered Kubernetes cluster."}),"\n",(0,s.jsx)(n.h4,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"/docs/containers",children:"You onboarded a container engine"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"/docs/kind",children:"You onboarded a Kind cluster"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"/docs/kind/working-with-your-local-kind-cluster",children:"You have set your Kubernetes context to your local Kind-powered Kubernetes cluster"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Your image is available on the ",(0,s.jsx)(n.strong,{children:"Images"})," page: ",(0,s.jsx)(n.code,{children:"<my_image>:<my_tag>"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"procedure",children:"Procedure"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Open ",(0,s.jsxs)(n.strong,{children:["Podman Desktop dashboard > ",(0,s.jsx)(i,{icon:"fa-solid fa-cloud",size:"lg"})," Images"]}),"."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsxs)(n.strong,{children:[(0,s.jsx)(i,{icon:"fa-solid fa-search",size:"lg"})," Search images"]}),": ",(0,s.jsx)(n.code,{children:"<your_image>:<your_tag>"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsxs)(n.strong,{children:[(0,s.jsx)(i,{icon:"fa-solid fa-ellipsis-v",size:"lg"})," > ",(0,s.jsx)(i,{icon:"fa-solid fa-ellipsis-v",size:"lg"})," Push image to Kind cluster"]}),"."]}),"\n",(0,s.jsx)(n.li,{children:"If you created many Kind clusters, select your Kind cluster from the list."}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"verification",children:"Verification"}),"\n",(0,s.jsxs)(n.p,{children:["With recent versions of Kind, the ",(0,s.jsx)(n.code,{children:"crictl"})," command can be used - e.g., ",(0,s.jsx)(n.code,{children:"podman exec -it kind-cluster-control-plane crictl images"}),". The name of the control plane container may vary, so you can use a filter to query for the container:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'podman exec -it $(podman ps --filter "label=io.x-k8s.kind.role=control-plane" --format {{.Names}}) crictl images\n'})}),"\n",(0,s.jsxs)(n.p,{children:["See the ",(0,s.jsx)(n.a,{href:"https://kind.sigs.k8s.io/docs/user/quick-start/#loading-an-image-into-your-cluster",children:"Kind Quickstart"})," for details."]})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},71670:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>o});var s=i(27378);const t={},r=s.createContext(t);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);