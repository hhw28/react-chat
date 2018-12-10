// import React from 'react'
// 需要在package.json > script中设置以下代码
// "server": "NODE_ENV=test nodemon --exec babel-node server/server.js"
// 才能在node环境中使用 import 语法

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const userRouter = require('./user')

const app = express()
const port = 9093
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket, req) => {
  socket.on('sendmsg', (data) => {
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content:msg, create_time:new Date().getTime()}, (err, doc) => {
      io.emit('receivemsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)


// 设置中间件
app.use((req, res, next) => {
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
    return next()
  }
  console.log('path',path.resolve('build/index.html'))
  return res.sendFile(path.resolve('build/index.html'))
})
// 设置静态资源地址
app.use('/', express.static(path.resolve('build')))

server.listen(port, function(){
  console.log('Node app start at port ' + port)
})