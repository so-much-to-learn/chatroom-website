# chatroom-server
## 运行
可以运行 start 或者 dev 命令，这是两种启动 Node + TypeScript 的方式。
只可惜 tsc + nodemon 的形式每次无法编译 .ejs 和 .log 文件，不得不使用 ts-node 来运行应用。
## fastify
fastify 是一个 NodeJS 框架，以速度快著称，内置了 json-schema，因此 stringify 的速度比原生 `JSON.stringify` 提高了两倍。
3.x 之后一些类型定义的有问题，这里用 patch-package 去修改源码，打了补丁包。
每次安装新的包之后，patch 里面的就会失效，需要重新 `yarn install --force` 一下，目前还没找到解决办法。