const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./user')


// 链接mongo 并且使用chat这个集合
const DB_URL = 'mongodb://localhost:27017'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
  console.log('mongo connect success')
})
// 新增
const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require: true},
  age: {type: Number, require: true}
}))
// 增删改查
// User.create({user: '11', age: 22}, function(err, doc){
//   if(!err){
//     console.log(doc)
//   }else{
//     console.log(err)
//   }
// })
User.remove({user: '11'}, function(err, doc){
  console.log(doc)
})
User.update({user: '张三'}, {'$set': {user: '刘嘉玲'}}, function(err, doc){
  console.log(doc)
})


const app = express()
const port = 9093

app.use('/user', userRouter)
app.get('/data', function(req, res){
  User.find({}, function(err, doc){
    res.json(doc)
  })
  User.findOne({user: '11'}, function(err, doc){
    res.json(doc)
  })
})
app.listen(port, function(){
  console.log('Node app start at port ' + port)
})