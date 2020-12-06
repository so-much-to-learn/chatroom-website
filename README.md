# chatroom-website 在线聊天室

使用 lerna + yarn workspace 来将结构 monorepo 化

![2020-11-1415-17-51.2020-11-1415_26_02](https://cdn.jsdelivr.net/gh/SHERlocked93/pic@master/uPic/2020-11-14%2015-17-51.2020-11-14%2015_26_02.gif)

[代码](https://sherlocked93.github.io/chatroom-website)

前端： typescript@4 + react@17 + react-router@5 + css-modules + scss + mobx@5 + antd@4 + lerna@3 + yarn workspace
服务端： express@4 + socket.io

### package目录
1. server 后端服务
2. im-core 前端socket服务模块
3. web-ui 浏览器端UI

### 结构图
![im-结构](https://cdn.jsdelivr.net/gh/SHERlocked93/pic@master/uPic/im.png)

### TODOS

- [x] 1. 登录/注册页面
- [x] 2. 聊天内容页面
- [x] 3. express + socket.io 搭建后端服务
- [x] 4. 前端重构，将消息拆分开，方便以后在其他场景复用
- [ ] 5. 加群功能
- [ ] 6. 创建群功能
- [ ] 7. 在群里点歌功能
- [ ] 8. 后端使用 nestjs + graphql + mysql 重构

## server
基于 fastify 构建的服务，内置 pino 作为日志系统。
## 收获

1. [x] axios 更改返回值类型 /src/typings/shims.d.ts
2. [x] 使用 useEffect 进行query的时候出现一直不停执行query，给个空的依赖数组就可以了，是因为 useEffect 触发了组件更新，重新执行 useEffect 所以不停执行 query
3. [x] 在 useEffect 中访问最新的状态需要注意闭包问题（使用useRef）
4. [x] 避免使用 useContext 时候发生不相关组件的更新 （使用 React.memo/useMemo,context的状态修改，即使组件只使用了dispatch仍然会重新渲染，我这里用React.memo+useCallback把调用dispach的函数提到父组件来做的，StonX 的[文章](https://zhuanlan.zhihu.com/p/56975681)提到使用分开context的方式来避免）
5. [ ] 非组件（除了组件之外其他的 ts/tsx 文件中）中似乎没有找到很好访问 context 中状态的方法，比如 context 中 useReducer 的 dispatch ？
6. [ ] 带 hooks 的组件和类组件如何共享状态/传递消息 ？
7. [ ] 多个 context 可以互相共享状态么 ？
8. [ ] 嵌套的自定义 hook 里可能存在的副作用会不会：1.使得调试变得困难，2.隐藏的性能隐患 ？是不是最好不要在自定义 hook 里面嵌套副作用

## 运行

安装所有依赖
```bash
yarn install
```

开发web-core前需要运行
```bash
yarn run core-dev
```

跑起后端服务
```bash
yarn run server
```

跑起前端页面
```bash
yarn run start
```
