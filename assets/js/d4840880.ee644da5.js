"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[79106],{38484:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>d});var s=i(24246),t=i(71670);const o={sidebar_position:3,title:"Publishing",description:"Publishing a Podman Desktop extension",tags:["podman-desktop","extension","publishing"],keywords:["podman desktop","extension","publishing"]},a="Packaging and publishing a Podman Desktop extension",r={id:"extensions/publish/index",title:"Publishing",description:"Publishing a Podman Desktop extension",source:"@site/docs/extensions/publish/index.md",sourceDirName:"extensions/publish",slug:"/extensions/publish/",permalink:"/docs/extensions/publish/",draft:!1,unlisted:!1,editUrl:"https://github.com/containers/podman-desktop/tree/main/website/docs/extensions/publish/index.md",tags:[{label:"podman-desktop",permalink:"/docs/tags/podman-desktop"},{label:"extension",permalink:"/docs/tags/extension"},{label:"publishing",permalink:"/docs/tags/publishing"}],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Publishing",description:"Publishing a Podman Desktop extension",tags:["podman-desktop","extension","publishing"],keywords:["podman desktop","extension","publishing"]},sidebar:"mySidebar",previous:{title:"Adding icons",permalink:"/docs/extensions/write/adding-icons"},next:{title:"Installing",permalink:"/docs/extensions/install/"}},l={},d=[{value:"Prerequisites",id:"prerequisites",level:4},{value:"Procedure",id:"procedure",level:4},{value:"Adding platform-specific files",id:"adding-platform-specific-files",level:4},{value:"Next steps",id:"next-steps",level:4}];function c(e){const n={a:"a",code:"code",h1:"h1",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"packaging-and-publishing-a-podman-desktop-extension",children:"Packaging and publishing a Podman Desktop extension"}),"\n",(0,s.jsx)(n.p,{children:"To enable users to install your extension, consider publishing your extension to an Open Container Initiative (OCI) image registry."}),"\n",(0,s.jsx)(n.h4,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["The extension builds successfully.\nSee ",(0,s.jsx)(n.a,{href:"/docs/extensions/write",children:"Writing a Podman Desktop extension"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"All runtime dependencies are inside the final binary."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["An OCI image registry to publish to, such as ",(0,s.jsx)(n.code,{children:"quay.io/fbenoit/my-first-extension"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(Optional) The OCI image registry is public to enable anybody to fetch the image."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"procedure",children:"Procedure"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Create and edit a ",(0,s.jsx)(n.code,{children:"Containerfile"})," file."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Use a scratch image.\nThe extension requires no runtime:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-dockerfile",children:"FROM scratch\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Apply mandatory Podman Desktop metadata on the ",(0,s.jsx)(n.code,{children:"OCI"})," image:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-dockerfile",children:'LABEL org.opencontainers.image.title="My first extension" \\\n      org.opencontainers.image.description="Example of extension" \\\n      org.opencontainers.image.vendor="podman-desktop" \\\n      io.podman-desktop.api.version=">= 0.12.0"\n'})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:'io.podman-desktop.api.version=">= 0.12.0"'})," sets the minimal Podman Desktop version that the extension requires to run."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Copy the extension assembly, including the metadata, icon, and production binary, to the ",(0,s.jsx)(n.code,{children:"/extension"})," folder inside the image:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-dockerfile",children:"COPY package.json /extension/\nCOPY icon.png /extension/\nCOPY dist /extension/dist\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Build an image:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell-session",children:"$ podman build -t quay.io/fbenoit/my-first-extension .\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Push the image and manifest to the OCI image registry:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell-session",children:"$ podman push quay.io/fbenoit/my-first-extension\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"adding-platform-specific-files",children:"Adding platform-specific files"}),"\n",(0,s.jsx)(n.p,{children:"You may want to add a system-native executable to the extension's image, so the extension can execute it."}),"\n",(0,s.jsx)(n.p,{children:"In contrast to the extension's code (transpiled into JavaScript) which is executable in any platform, you will\nneed to prepare several OCI images, one for each platform (OS and architecture) you want the extension to support."}),"\n",(0,s.jsx)(n.p,{children:"For this, you will need to create:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"one Containerfile for each platform (or a common Containerfile with parameters), to create\none image per platform,"}),"\n",(0,s.jsx)(n.li,{children:"one manifest, to reference all images created at the previous step."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"The URL you need to share with the users to install the extension is the URL of the manifest."}),"\n",(0,s.jsx)(n.p,{children:"If the manifest does not contain an image for the platform of the user, Podman Desktop will install the\nimage for Linux (amd64 or arm64 depending on the architecture of the user's platform)."}),"\n",(0,s.jsxs)(n.p,{children:["You can leverage the ",(0,s.jsx)(n.a,{href:"https://github.com/redhat-actions/buildah-build",children:"Buildah Build action"})," to build this manifest."]}),"\n",(0,s.jsx)(n.h4,{id:"next-steps",children:"Next steps"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"/docs/extensions/install",children:"Installing a Podman Desktop extension"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},71670:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>a});var s=i(27378);const t={},o=s.createContext(t);function a(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);