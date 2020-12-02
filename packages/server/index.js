const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  origins: '*:*',
  transports: ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket'],
});
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Data = require('./data');
const Utils = require('./utils');
const Api = require('./api');

// 允许跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Client-Type");
  next();
});

app.post('/login', (req, res) => {
  res.json(Api.login(req));
});
app.post('/regist', (req, res) => {
  res.json(Api.regist(req));
});
app.get('/chatroom/info-list', (req, res) => {
  res.json(Api.chatroomInfoList(req));
});

io.on('connection', (socket) => {
  // 用户在群组中发送消息
  socket.on('user-send-message', ({ chatroomId, messageObj }) => {
    const chatroom = Data.chatroomInfoItems.find((chatroom) => chatroom.id === chatroomId);
    const newMessage = { messageId: Utils.guid(), ...messageObj };
    chatroom.messageList.push(newMessage);
    io.emit('user-send-message-res', { chatroomId, newMessage });
  });
});

server.listen(3090, () => {
  console.log('Listening at http://localhost:3090');
});
