# chatroom-website 在线聊天室

![2020-11-1415-17-51.2020-11-1415_26_02](https://cdn.jsdelivr.net/gh/SHERlocked93/pic@master/uPic/2020-11-14%2015-17-51.2020-11-14%2015_26_02.gif)

[代码](https://sherlocked93.github.io/chatroom-website)

分支：
1. master: 使用mobx
2. local: 为了更好锻炼hooks技能，使用useReducer+useContext重构

前端： typescript@4 + react@17 + react-router@5 + css-modules + scss + mobx@5 + antd@4
服务端： express@4 + socket.io

- [x] 1. 登录/注册页面
- [x] 2. 聊天内容页面
- [x] 3. express + socket.io 搭建后端服务



## 收获

1. [x] axios 更改返回值类型 /src/typings/shims.d.ts
2. [x] 使用 useEffect 进行query的时候出现一直不停执行query，给个空的依赖数组就可以了，是因为 useEffect 触发了组件更新，重新执行 useEffect 所以不停执行 query
3. [x] 在useEffect中如何访问最新的state
4. [ ] 如何避免使用 useContext 时候发生不相关组件的更新
5. [ ] 非组件中可以访问 context 中的内容么，比如 context 中 useReducer 的 dispatch

## 运行

```bash
# 跑起后端服务
npm run server
```

```bash
# 跑起前端页面
npm run start
```
