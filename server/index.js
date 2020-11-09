const path = require('path')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const Api = require('./api')

// 允许跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Client-Type");
    next();
})


app.post('/login', (req, res) => {
    res.json(Api.login(req))
})


app.get('/chatroom/info-list', (req, res) => {
    res.json(Api.chatroomInfoList(req))
})

const onlineUsers = {}   // 在线用户
let onlineCount = 0      // 在线用户人数

io.on('connection', socket => {
    socket.on('login', obj => {
        console.log(obj)
        socket.id = obj.uid   // 用户id设为socketid

        // 如果没有这个用户，那么在线人数+1，将其添加进在线用户
        if (!onlineUsers[obj.uid]) {
            onlineUsers[obj.uid] = obj.username
            onlineCount++
        }

        // 向客户端发送登陆事件，同时发送在线用户、在线人数以及登陆用户
        io.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj })
        console.log(obj.username + '加入了群聊')
    })

    socket.on('disconnect', () => {
        // 如果有这个用户
        if (onlineUsers[socket.id]) {
            const obj = { uid: socket.id, username: onlineUsers[socket.id] }

            // 删掉这个用户，在线人数-1
            delete onlineUsers[socket.id]
            onlineCount--

            // 向客户端发送登出事件，同时发送在线用户、在线人数以及登出用户
            io.emit('logout', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj })
            console.log(obj.username + '退出了群聊')
        }
    })

    // 监听客户端发送的信息
    socket.on('message', (obj) => {
        io.emit('message', obj)
        console.log(obj.username + '说:' + obj.message)
    })
})

server.listen(3090, () => {
    console.log('Listening at http://localhost:3090')
})
