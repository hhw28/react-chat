const express = require('express')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const utils = require('utility')

Router.get('/list', function(req, res){
  User.find({}, function(err, doc){
    return res.json(doc)
  })
})
Router.post('/register', (req, res) => {
  const {user, pwd, type} = req.body
  User.findOne({user: user}, (err, doc) => {
    // 若在数据库查找到该用户
    if(doc){
      return res.json({code: 1, msg: '用户名重复'})
    }
    // 若未在数据库查找到用户
    User.create({user, type, pwd:useMd5(pwd)}, (err, doc) => {
      if(err){
        return res.json({code: 1, msg: '服务器出错'})
      }
      return res.json({code: 0})
    })
  })
})
function useMd5(pwd){
  const salt = 'dnaigb235235naisgni@+gaing++[[...<iasng9359'
  return utils.md5(pwd + salt)
}
Router.get('/info', (req, res) => {
  return res.json({code: 1})
})

module.exports = Router