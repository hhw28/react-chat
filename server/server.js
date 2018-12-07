const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const userRouter = require('./user')

const app = express()
const port = 9093
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket){
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

server.listen(port, function(){
  console.log('Node app start at port ' + port)
})