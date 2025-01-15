"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[30487],{81064:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>l,frontMatter:()=>o,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"interfaces/AuthenticationProviderAuthenticationSessionsChangeEvent","title":"Interface: AuthenticationProviderAuthenticationSessionsChangeEvent","description":"Defined in4087","source":"@site/api/interfaces/AuthenticationProviderAuthenticationSessionsChangeEvent.md","sourceDirName":"interfaces","slug":"/interfaces/AuthenticationProviderAuthenticationSessionsChangeEvent","permalink":"/api/interfaces/AuthenticationProviderAuthenticationSessionsChangeEvent","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"typedocSidebar","previous":{"title":"AuthenticationProvider","permalink":"/api/interfaces/AuthenticationProvider"},"next":{"title":"AuthenticationProviderInformation","permalink":"/api/interfaces/AuthenticationProviderInformation"}}');var s=i(62540),a=i(43023);const o={},r="Interface: AuthenticationProviderAuthenticationSessionsChangeEvent",c={},d=[{value:"Properties",id:"properties",level:2},{value:"added?",id:"added",level:3},{value:"changed?",id:"changed",level:3},{value:"removed?",id:"removed",level:3}];function h(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",p:"p",strong:"strong",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"interface-authenticationproviderauthenticationsessionschangeevent",children:"Interface: AuthenticationProviderAuthenticationSessionsChangeEvent"})}),"\n",(0,s.jsxs)(n.p,{children:["Defined in: ",(0,s.jsx)(n.a,{href:"https://github.com/slemeur/podman-desktop/blob/e6af0ab59e3cdd1abf1ebc4df9643a2e2def0a62/packages/extension-api/src/extension-api.d.ts#L4087",children:"packages/extension-api/src/extension-api.d.ts:4087"})]}),"\n",(0,s.jsxs)(n.p,{children:["An ",(0,s.jsx)(n.a,{href:"#Event",children:"event"})," which fires when an ",(0,s.jsx)(n.a,{href:"#AuthenticationSession",children:"AuthenticationSession"})," is added, removed, or changed."]}),"\n",(0,s.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(n.h3,{id:"added",children:"added?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"readonly"})," ",(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"added"}),": readonly ",(0,s.jsx)(n.a,{href:"/api/interfaces/AuthenticationSession",children:(0,s.jsx)(n.code,{children:"AuthenticationSession"})}),"[]"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Defined in: ",(0,s.jsx)(n.a,{href:"https://github.com/slemeur/podman-desktop/blob/e6af0ab59e3cdd1abf1ebc4df9643a2e2def0a62/packages/extension-api/src/extension-api.d.ts#L4091",children:"packages/extension-api/src/extension-api.d.ts:4091"})]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.a,{href:"#AuthenticationSession",children:"AuthenticationSession"}),"s of the ",(0,s.jsx)(n.a,{href:"#AuthentiationProvider",children:"AuthenticationProvider"})," that have been added."]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"changed",children:"changed?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"readonly"})," ",(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"changed"}),": readonly ",(0,s.jsx)(n.a,{href:"/api/interfaces/AuthenticationSession",children:(0,s.jsx)(n.code,{children:"AuthenticationSession"})}),"[]"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Defined in: ",(0,s.jsx)(n.a,{href:"https://github.com/slemeur/podman-desktop/blob/e6af0ab59e3cdd1abf1ebc4df9643a2e2def0a62/packages/extension-api/src/extension-api.d.ts#L4103",children:"packages/extension-api/src/extension-api.d.ts:4103"})]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.a,{href:"#AuthenticationSession",children:"AuthenticationSession"}),"s of the ",(0,s.jsx)(n.a,{href:"#AuthentiationProvider",children:"AuthenticationProvider"})," that have been changed.\nA session changes when its data excluding the id are updated. An example of this is a session refresh that results in a new\naccess token being set for the session."]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"removed",children:"removed?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"readonly"})," ",(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"removed"}),": readonly ",(0,s.jsx)(n.a,{href:"/api/interfaces/AuthenticationSession",children:(0,s.jsx)(n.code,{children:"AuthenticationSession"})}),"[]"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Defined in: ",(0,s.jsx)(n.a,{href:"https://github.com/slemeur/podman-desktop/blob/e6af0ab59e3cdd1abf1ebc4df9643a2e2def0a62/packages/extension-api/src/extension-api.d.ts#L4096",children:"packages/extension-api/src/extension-api.d.ts:4096"})]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.a,{href:"#AuthenticationSession",children:"AuthenticationSession"}),"s of the ",(0,s.jsx)(n.a,{href:"#AuthentiationProvider",children:"AuthenticationProvider"})," that have been removed."]})]})}function l(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},43023:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>r});var t=i(63696);const s={},a=t.createContext(s);function o(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);