const express = require('express')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const utils = require('utility')
const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', function(req, res){
  // get请求用query获取, post请求用body获取
  const {type} = req.query
  // User.remove({}, (err, doc) => {})
  User.find({type}, function(err, doc){
    return res.json({code: 0, data: doc})
  })
})

Router.post('/update', (req, res) => {
  const userid = req.cookies.userid
  if(!userid){
    return res.json({code: 1})
  }
  const body = req.body
  // 找到用户并且更新数据
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data: doc})
  })
})
Router.post('/login', (req, res) => {
  const {user, pwd} = req.body
  User.findOne({user, pwd:md5Pwd(pwd)}, _filter, (err, doc) => {
    if(!doc){
      return res.json({code: 1, msg: '用户名或密码错误'})
    }
    // 保存登录状态到cookie
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})
Router.post('/register', (req, res) => {
  const {user, pwd, type} = req.body
  User.findOne({user: user}, (err, doc) => {
    // 若在数据库查找到该用户
    if(doc){
      return res.json({code: 1, msg: '用户名重复'})
    }
    // 若未在数据库查找到用户，则新增用户并取到id保存到cookie中(即注册成功后保存登录状态)
    const userModel = new User({user, type, pwd:md5Pwd(pwd)})
    userModel.save((err, doc) => {
      if(err){
        return res.json({code: 1, msg: '服务器出错'})
      }
      const {user, type, _id} = doc
      res.cookie('userid', _id)
      return res.json({code: 0, data:{user, type, _id}})
    })
  })
})
function md5Pwd(pwd){
  const salt = 'dnaigb235235naisgni@+gaing++[[...<iasng9359'
  return utils.md5(pwd + salt)
}
Router.get('/info', (req, res) => {
  const {userid} = req.cookies
  // 从cookies中查询，判断用户是否登录
  if(!userid){
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, (err, doc) => {
    if(err){
      return res.json({code: 1, msg: '服务器出错'})
    }
    return res.json({code: 0, data: doc})
  })

})

module.exports = Router