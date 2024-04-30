"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[92423],{79993:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var i=t(24246),s=t(71670);const o={},r="Function: logsContainer()",c={id:"namespaces/containerEngine/functions/logsContainer",title:"Function: logsContainer()",description:"logsContainer(engineId, id, callback): Promise\\",source:"@site/api/namespaces/containerEngine/functions/logsContainer.md",sourceDirName:"namespaces/containerEngine/functions",slug:"/namespaces/containerEngine/functions/logsContainer",permalink:"/api/namespaces/containerEngine/functions/logsContainer",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"typedocSidebar",previous:{title:"Function: listVolumes()",permalink:"/api/namespaces/containerEngine/functions/listVolumes"},next:{title:"Function: onEvent()",permalink:"/api/namespaces/containerEngine/functions/onEvent"}},a={},d=[{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Source",id:"source",level:2}];function l(n){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...(0,s.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"function-logscontainer",children:"Function: logsContainer()"}),"\n",(0,i.jsxs)(e.blockquote,{children:["\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:"logsContainer"}),"(",(0,i.jsx)(e.code,{children:"engineId"}),", ",(0,i.jsx)(e.code,{children:"id"}),", ",(0,i.jsx)(e.code,{children:"callback"}),"): ",(0,i.jsx)(e.code,{children:"Promise"}),"<",(0,i.jsx)(e.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"Get the streamed logs of a container"}),"\n",(0,i.jsx)(e.h2,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsxs)(e.p,{children:["\u2022 ",(0,i.jsx)(e.strong,{children:"engineId"}),": ",(0,i.jsx)(e.code,{children:"string"})]}),"\n",(0,i.jsxs)(e.p,{children:["the id of the engine managing the container, obtained from the result of ",(0,i.jsx)(e.a,{href:"/api/namespaces/containerEngine/functions/listContainers",children:"containerEngine.listContainers"})]}),"\n",(0,i.jsxs)(e.p,{children:["\u2022 ",(0,i.jsx)(e.strong,{children:"id"}),": ",(0,i.jsx)(e.code,{children:"string"})]}),"\n",(0,i.jsxs)(e.p,{children:["the id of the container on this engine, obtained from the result of ",(0,i.jsx)(e.a,{href:"/api/namespaces/containerEngine/functions/listContainers",children:"containerEngine.listContainers"})," or as the result of ",(0,i.jsx)(e.a,{href:"/api/namespaces/containerEngine/functions/createContainer",children:"containerEngine.createContainer"})]}),"\n",(0,i.jsxs)(e.p,{children:["\u2022 ",(0,i.jsx)(e.strong,{children:"callback"})]}),"\n",(0,i.jsxs)(e.p,{children:["the function called when new logs are emitted or new events happen on the stream. The value of ",(0,i.jsx)(e.code,{children:"name"})," can be either ",(0,i.jsx)(e.code,{children:"data"})," (and ",(0,i.jsx)(e.code,{children:"data"})," contains the logs), or ",(0,i.jsx)(e.code,{children:"end"})," indicating the end of the stream, or ",(0,i.jsx)(e.code,{children:"first-message"})," indicating no data has been emitted yet on the stream."]}),"\n",(0,i.jsx)(e.h2,{id:"returns",children:"Returns"}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"Promise"}),"<",(0,i.jsx)(e.code,{children:"void"}),">"]}),"\n",(0,i.jsx)(e.h2,{id:"source",children:"Source"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.a,{href:"https://github.com/slemeur/podman-desktop/blob/4254d44aa20dc97ea9558defffbe448f9487fb82/packages/extension-api/src/extension-api.d.ts#L3216",children:"packages/extension-api/src/extension-api.d.ts:3216"})})]})}function h(n={}){const{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(l,{...n})}):l(n)}},71670:(n,e,t)=>{t.d(e,{Z:()=>c,a:()=>r});var i=t(27378);const s={},o=i.createContext(s);function r(n){const e=i.useContext(o);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:r(n.components),i.createElement(o.Provider,{value:e},n.children)}}}]);