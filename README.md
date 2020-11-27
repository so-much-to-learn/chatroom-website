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
- [ ] 4. 加群功能
- [ ] 5. 创建群功能
- [ ] 6. 在群里点歌功能
- [ ] 7. 后端使用 nestjs + graphql + mysql 重构


## 收获

1. [x] axios 更改返回值类型 /src/typings/shims.d.ts
2. [x] 使用 useEffect 进行query的时候出现一直不停执行query，给个空的依赖数组就可以了，是因为 useEffect 触发了组件更新，重新执行 useEffect 所以不停执行 query
3. [x] 在 useEffect 中访问最新的状态需要注意闭包问题（使用useRef）
4. [x] 避免使用 useContext 时候发生不相关组件的更新 （使用 React.memo/useMemo,context的状态修改，即使组件只使用了dispatch仍然会重新渲染，我这里用React.memo+useCallback把调用dispach的函数提到父组件来做的，StonX 的[文章](https://zhuanlan.zhihu.com/p/56975681)提到使用分开context的方式来避免，这几天详细调研一下）
5. [ ] 非组件（除了组件之外其他的 ts/tsx 文件中）中似乎没有找到很好访问 context 中状态的方法，比如 context 中 useReducer 的 dispatch ？
6. [ ] 带 hooks 的组件和类组件如何共享状态/传递消息 ？
7. [ ] 多个 context 可以互相共享状态么 ？
8. [ ] 嵌套的自定义 hook 里可能存在的副作用会不会：1.使得调试变得困难，2.隐藏的性能隐患 ？是不是最好不要在自定义 hook 里面嵌套副作用

## 运行

```bash
# 跑起后端服务
npm run server
```

```bash
# 跑起前端页面
npm run start
```
