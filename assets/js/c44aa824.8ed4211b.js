"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[92834],{95613:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>c});var o=s(62540),i=s(43023);const t={sidebar_position:60,title:"Accessing Podman from another WSL distribution (Windows)",description:"On Windows, access your Podman Desktop containers from another Windows Subsystem for Linux (WSL) distribution."},r="Accessing Podman from another WSL distribution",a={id:"podman/accessing-podman-from-another-wsl-instance",title:"Accessing Podman from another WSL distribution (Windows)",description:"On Windows, access your Podman Desktop containers from another Windows Subsystem for Linux (WSL) distribution.",source:"@site/docs/podman/accessing-podman-from-another-wsl-instance.md",sourceDirName:"podman",slug:"/podman/accessing-podman-from-another-wsl-instance",permalink:"/docs/podman/accessing-podman-from-another-wsl-instance",draft:!1,unlisted:!1,editUrl:"https://github.com/containers/podman-desktop/tree/main/website/docs/podman/accessing-podman-from-another-wsl-instance.md",tags:[],version:"current",sidebarPosition:60,frontMatter:{sidebar_position:60,title:"Accessing Podman from another WSL distribution (Windows)",description:"On Windows, access your Podman Desktop containers from another Windows Subsystem for Linux (WSL) distribution."},sidebar:"mySidebar",previous:{title:"Adding certificates to a Podman machine",permalink:"/docs/podman/adding-certificates-to-a-podman-machine"},next:{title:"Migrating from Docker",permalink:"/docs/migrating-from-docker/"}},d={},c=[{value:"Configuring your WSL distribution",id:"configuring-your-wsl-distribution",level:2},{value:"Testing the connection",id:"testing-the-connection",level:2},{value:"Changing the connection",id:"changing-the-connection",level:2},{value:"Next steps",id:"next-steps",level:2}];function l(n){const e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...n.components},{Details:s}=e;return s||function(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.header,{children:(0,o.jsx)(e.h1,{id:"accessing-podman-from-another-wsl-distribution",children:"Accessing Podman from another WSL distribution"})}),"\n",(0,o.jsxs)(e.p,{children:["On Windows, ",(0,o.jsx)(e.a,{href:"/docs/podman/creating-a-podman-machine",children:"Podman Desktop creates a Windows Subsystem for Linux (WSL) virtual machine: the Podman Machine"}),".\nIt also configures the Windows Podman client to communicate with the Podman Machine.\nHowever, it does not configure your other WSL distributions."]}),"\n",(0,o.jsx)(e.p,{children:"You might have other WSL distributions running, and want to access from there to your Podman Desktop containers."}),"\n",(0,o.jsx)(e.p,{children:"This tutorial focuses on the most common context to walk you through the steps to configure your WSL distribution:"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:"Ubuntu distribution of Linux."}),"\n",(0,o.jsx)(e.li,{children:"Default Podman Machine."}),"\n"]}),"\n",(0,o.jsx)(e.p,{children:"In foldable details, you can find alternative steps for least common contexts:"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:"Custom WSL distribution."}),"\n",(0,o.jsx)(e.li,{children:"Custom Podman Machine."}),"\n"]}),"\n",(0,o.jsx)(e.h2,{id:"configuring-your-wsl-distribution",children:"Configuring your WSL distribution"}),"\n",(0,o.jsxs)(e.ol,{children:["\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"Start a session in your WSL distribution:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"> wsl --distribution your-distribution-name\n"})}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"To communicate with the remote Podman Machine, you need a Podman client."}),"\n",(0,o.jsxs)(e.p,{children:["To benefit from the latest features, such as ",(0,o.jsx)(e.code,{children:"podman kube"})," subcommands, use a recent Podman version rather than the ",(0,o.jsx)(e.code,{children:"podman"})," package from the distribution."]}),"\n",(0,o.jsxs)(e.p,{children:["The Podman client is available with a full ",(0,o.jsx)(e.code,{children:"podman"})," installation or with the ",(0,o.jsx)(e.code,{children:"podman-remote"})," version 4.x and higher. On Ubuntu it is generally easier to install ",(0,o.jsx)(e.code,{children:"podman-remote"}),"."]}),"\n",(0,o.jsxs)(e.p,{children:["With ",(0,o.jsx)(e.code,{children:"podman-remote"})," you also enable the remote mode by default."]}),"\n",(0,o.jsxs)(e.p,{children:["Check for the latest release which includes the ",(0,o.jsx)(e.code,{children:"podman-remote"})," binary from the ",(0,o.jsx)(e.a,{href:"https://github.com/containers/podman/releases/latest",children:"Podman releases page"}),"."]}),"\n",(0,o.jsx)(e.p,{children:"Download and unpack the binary:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ wget https://github.com/containers/podman/releases/download/v4.9.1/podman-remote-static-linux_amd64.tar.gz\n$ sudo tar -C /usr/local -xzf podman-remote-static-linux_amd64.tar.gz\n"})}),"\n",(0,o.jsxs)(e.p,{children:["Make this executable as ",(0,o.jsx)(e.code,{children:"podman"})," with the following addition to ",(0,o.jsx)(e.code,{children:".bashrc"}),":"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ export PATH=\"$PATH:/usr/local/bin\"\n$ alias podman='podman-remote-static-linux_amd64'\n"})}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"Configure the Podman client in your WSL distribution to communicate with the remote Podman machine defined by Podman Desktop."}),"\n",(0,o.jsx)(e.p,{children:"This will ensure consistency when you are working with Podman from all your different environments"}),"\n",(0,o.jsx)(e.p,{children:"Set the default Podman system connection to your Podman Machine (assuming Podman Desktop is configured with the default of Podman Machine enabled with root privileges):"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ podman system connection add --default podman-machine-default-root unix:///mnt/wsl/podman-sockets/podman-machine-default/podman-root.sock\n"})}),"\n",(0,o.jsxs)(s,{children:[(0,o.jsxs)("summary",{children:[(0,o.jsx)(e.p,{children:"On a custom Podman Machine, the remote Podman Machine destination might be different."}),(0,o.jsx)(e.p,{children:"Two parameters can change:"}),(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["The machine name might differ from ",(0,o.jsx)(e.code,{children:"podman-machine-default"}),"."]}),"\n",(0,o.jsx)(e.li,{children:"The socket name is different when the Podman machine has root privileges disabled (rootless mode)."}),"\n"]}),(0,o.jsx)(e.p,{children:"Find your Podman Machine name and connection path:"})]}),(0,o.jsx)("div",{children:(0,o.jsxs)(e.ol,{children:["\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"Identify the sockets available in your WSL distribution."}),"\n",(0,o.jsxs)(e.p,{children:["The Podman machine shares sockets in a ",(0,o.jsx)(e.code,{children:"/mnt/wsl/podman-sockets/"})," subdirectory named after the Podman machine name."]}),"\n",(0,o.jsx)(e.p,{children:"In your WSL session, list the available sockets:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ find /mnt/wsl/podman-sockets/ -name '*.sock'\n"})}),"\n",(0,o.jsx)(e.p,{children:"Each Podman Machine has a socket for:"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["Rootful Podman: ",(0,o.jsx)(e.code,{children:"podman-root.sock"})]}),"\n",(0,o.jsxs)(e.li,{children:["Rootless Podman: ",(0,o.jsx)(e.code,{children:"podman-user.sock"})]}),"\n"]}),"\n",(0,o.jsx)(e.p,{children:"Sample output:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"/mnt/wsl/podman-sockets/podman-machine-default/podman-root.sock\n/mnt/wsl/podman-sockets/podman-machine-default/podman-user.sock\n"})}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"Identify the socket that Podman Desktop uses."}),"\n",(0,o.jsx)(e.p,{children:"Podman Desktop defaults to rootful Podman.\nHowever, consider identifying the active socket."}),"\n",(0,o.jsx)(e.p,{children:"The active socket is the default Podman system connection in your Windows session."}),"\n",(0,o.jsx)(e.p,{children:"Open a new Command Prompt, and list your Podman system connections:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"> podman system connection list\n"})}),"\n",(0,o.jsxs)(e.p,{children:["The default connection line ends with ",(0,o.jsx)(e.code,{children:"true"}),"."]}),"\n",(0,o.jsx)(e.p,{children:"Identify your Podman Machine socket by its URI in Windows:"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["Rootful Podman: ",(0,o.jsx)(e.code,{children:"ssh://root@127.0.0.1:59292/run/podman/podman.sock"})]}),"\n",(0,o.jsxs)(e.li,{children:["Rootless Podman: ",(0,o.jsx)(e.code,{children:"ssh://user@127.0.0.1:59292/run/user/1000/podman/podman.sock"})]}),"\n"]}),"\n",(0,o.jsx)(e.p,{children:"Sample output:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"Name                         URI                                                          Identity                                                  Default\n\npodman-machine-default ssh://user@127.0.0.1:59292/run/user/1000/podman/podman.sock C:\\Users\\Podman Desktop User\\.ssh\\podman-machine-default false\npodman-machine-default-root ssh://root@127.0.0.1:59292/run/podman/podman.sock C:\\Users\\Podman Desktop User\\.ssh\\podman-machine-default true\n"})}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsxs)(e.p,{children:["To define the Podman machine remote destination, prepend with ",(0,o.jsx)(e.code,{children:"unix://"})," the socket path that is available in your WSL, and corresponds to the Podman Desktop active socket:"]}),"\n",(0,o.jsx)(e.p,{children:"For the default Podman machine:"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["Rootful Podman: ",(0,o.jsx)(e.code,{children:"unix:///mnt/wsl/podman-sockets/podman-machine-default/podman-root.sock"})]}),"\n",(0,o.jsxs)(e.li,{children:["Rootless Podman: ",(0,o.jsx)(e.code,{children:"unix:///mnt/wsl/podman-sockets/podman-machine-default/podman-user.sock"})]}),"\n"]}),"\n"]}),"\n"]})})]}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"The communication channel between your WSL distribution and the Podman Machine is a special file (a socket).\nThe Podman Machine creates this file with specific permissions.\nTo communicate with the Podman Machine from your WSL distribution your user must have write permissions for the socket."}),"\n",(0,o.jsx)(e.p,{children:"To give access to the remote Podman machine to your user: create the group if necessary, assign group membership, and exit your session on the WSL distribution to apply the new group membership:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ sudo usermod --append --groups 10 $(whoami)\n$ exit\n"})}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(e.h2,{id:"testing-the-connection",children:"Testing the connection"}),"\n",(0,o.jsx)(e.p,{children:"Verify that, on your WSL distribution, the Podman CLI communicates with your Podman machine."}),"\n",(0,o.jsxs)(e.ol,{children:["\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"Start a session in your WSL distribution:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"> wsl\n"})}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"Verify that your user is member of the group delivering access to the remote Podman Machine socket:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ groups\n"})}),"\n",(0,o.jsxs)(e.p,{children:["On the default Ubuntu WSL, the list contains the ",(0,o.jsx)(e.code,{children:"uucp"})," group."]}),"\n",(0,o.jsxs)(s,{children:[(0,o.jsxs)("summary",{children:[(0,o.jsx)(e.p,{children:"On a custom WSL distribution, the group name might be different."}),(0,o.jsx)(e.p,{children:"Find the required group name:"})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)(e.p,{children:"The required group id is the same on any WSL distribution."}),(0,o.jsx)(e.p,{children:"However, the group name might be different on a custom WSL distribution."}),(0,o.jsx)(e.p,{children:"On the Podman Machine, which runs on a Fedora distribution:"}),(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["Rootful Podman: GID ",(0,o.jsx)(e.code,{children:"10"})," name is ",(0,o.jsx)(e.code,{children:"wheel"}),"."]}),"\n",(0,o.jsxs)(e.li,{children:["Rootless Podman: GID ",(0,o.jsx)(e.code,{children:"1000"})," name is ",(0,o.jsx)(e.code,{children:"user"}),"."]}),"\n"]}),(0,o.jsx)(e.p,{children:"On the Ubuntu distribution:"}),(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["Rootful Podman: GID ",(0,o.jsx)(e.code,{children:"10"})," name is ",(0,o.jsx)(e.code,{children:"uucp"}),"."]}),"\n",(0,o.jsxs)(e.li,{children:["Rootless Podman: GID ",(0,o.jsx)(e.code,{children:"1000"})," name is the same as the user name you chose when creating the WSL machine."]}),"\n"]}),(0,o.jsx)(e.p,{children:"On a custom WSL distribution, find the group name for:"}),(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"Rootful Podman:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ getent group 10\n"})}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"Rootless Podman:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ getent group 1000\n"})}),"\n"]}),"\n"]})]})]}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"Verify that Podman default system connections is set to your remote Podman machine:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ podman system connection list\n"})}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsxs)(e.p,{children:["Verify that Podman has a ",(0,o.jsx)(e.code,{children:"Server"})," version corresponding to your Podman Machine version:"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ podman version\n"})}),"\n",(0,o.jsx)(e.p,{children:"Sample output:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"Client:\nVersion:      3.4.4\nAPI Version:  3.4.4\nGo Version:   go1.18.1\nBuilt:        Thu Jan 1 01:00:00 1970\nOS/Arch:      linux/amd64\n\nServer:\nVersion:      4.8.3\nAPI Version:  4.8.3\nGo Version:   go1.21.5\nBuilt:        Wed Jan 3 15:11:40 2024\nOS/Arch:      linux/amd64\n"})}),"\n",(0,o.jsx)(e.admonition,{type:"info",children:(0,o.jsx)(e.p,{children:"On your environment, the Podman version might be different."})}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"Verify that you can list running containers."}),"\n",(0,o.jsxs)(e.p,{children:["On your WSL distribution, start a container such as ",(0,o.jsx)(e.code,{children:"quay.io/podman/hello"}),", and list the name of the last running container:"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ podman run quay.io/podman/hello\n$ podman ps -a --no-trunc --last 1\n"})}),"\n",(0,o.jsxs)(e.p,{children:["On ",(0,o.jsx)(e.strong,{children:"Podman Desktop > Containers"}),", the output lists the same container (same name, same image)."]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(e.h2,{id:"changing-the-connection",children:"Changing the connection"}),"\n",(0,o.jsx)(e.p,{children:"Podman Desktop only has visibility to either rootless or rootful containers but not both at the same time."}),"\n",(0,o.jsx)(e.p,{children:"To change the active connection:"}),"\n",(0,o.jsxs)(e.ol,{children:["\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"In your Windows terminal, change the connection:"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"To set the connection to rootless:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ podman machine set --rootful=false\n"})}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"To set the connection to rootful:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ podman machine set --rootful=true\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"In your WSL session, Change the Podman system connection configuration:"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"To set the connection to rootless:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ podman system connection add --default podman-machine-default-user unix:///mnt/wsl/podman-sockets/podman-machine-default/podman-user.sock\n"})}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:["\n",(0,o.jsx)(e.p,{children:"To set the connection to rootful:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell-session",children:"$ podman system connection add --default podman-machine-default-root unix:///mnt/wsl/podman-sockets/podman-machine-default/podman-root.sock\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(e.h2,{id:"next-steps",children:"Next steps"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["From your WSL distribution, ",(0,o.jsx)(e.a,{href:"/docs/containers",children:"work with containers"}),"."]}),"\n"]})]})}function h(n={}){const{wrapper:e}={...(0,i.R)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(l,{...n})}):l(n)}},43023:(n,e,s)=>{s.d(e,{R:()=>r,x:()=>a});var o=s(63696);const i={},t=o.createContext(i);function r(n){const e=o.useContext(t);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:r(n.components),o.createElement(t.Provider,{value:e},n.children)}}}]);