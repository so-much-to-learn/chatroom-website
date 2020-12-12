# chatroom-server
## 运行
可以运行 start 或者 dev 命令，这是两种启动 Node + TypeScript 的方式。
只可惜 tsc + nodemon 的形式每次无法编译 .ejs 和 .log 文件，不得不使用 ts-node 来运行应用。
## fastify
fastify 是一个 NodeJS 框架，以速度快著称，内置了 json-schema，因此 stringify 的速度比原生 `JSON.stringify` 提高了两倍。
3.x 之后一些类型定义的有问题，这里用 patch-package 去修改源码，打了补丁包。
每次安装新的包之后，patch 里面的就会失效，需要重新 `yarn install --force` 一下，目前还没找到解决办法。
## 登录
主要接入了 Github 的 OAuth 登录，具体调用方式可以参考 `__test__` 下面的测试页面。
首先要调用 server 的 login 接口，并将之后需要回调你的页面地址 callback_url 传给 server，server 会重定向到 github 授权页。
github 授权成功后再跳到 server 接口，然后server 里面会重定向到最开始穿归来的 callback_url。
## swagger
基于 fastify-swagger 自动生成的 swagger 文件。
访问地址是：http://localhost:3000/api/swagger/static/index.html
