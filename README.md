# chatroom-website 在线聊天室

[预览](https://sherlocked93.github.io/chatroom-website)

前端： typescript@4 + react@17 + react-router@5 + css-modules + scss + mobx@5 + antd@4
服务端： express@4 + socket.io

- [x] 1. 登录/注册页面
- [ ] 2. 聊天内容页面
- [x] 3. express + socket.io 搭建后端服务


## 收获

1. axios 更改返回值类型 /src/typings/shims.d.ts
2. 使用 useEffect 进行query的时候出现一直不停执行query，给个空的依赖数组就可以了，是因为 useEffect 触发了组件更新，重新执行 useEffect 所以不停执行 query

## 运行

```bash
# 跑起后端服务
npm run server
```

```bash
# 跑起前端页面
npm run start
```
