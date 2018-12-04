const mongoose = require('mongoose')
// 链接mongo 并且使用chat这个集合
const DB_URL = 'mongodb://localhost:27017/chat'
mongoose.connect(DB_URL, { useNewUrlParser: true })

const models = {
  // 用户
  user: {
    'user': {'type': String, require: true},
    'pwd': {'type': String, require: true},
    'type': {'type': String, require: true},
    // 头像
    'avatar': {'type': String},
    // 个人简介
    'desc': {'type': String},
    // 职位名
    'title': {'type': String},
    // boss 的两个字段
    'company': {'type': String},
    'money': {'type': String},
  },
  // 聊天信息
  char: {

  }
}
for(let item in models){
  mongoose.model(item, new mongoose.Schema(models[item]))
}

module.exports = {
  getModel: function(name){
    return mongoose.model(name)
  }
}