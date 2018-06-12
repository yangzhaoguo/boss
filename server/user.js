const express = require('express');
const Router = express.Router();
const models = require('./mongo');
const User = models.getModel('user');

Router.get('/list', function (req, res) {
    User.find({}, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'})
        } else {
            return res.json({code: 1, doc: doc})
        }
    })
})
Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body;
    User.findOne({user: user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户重名'})
        }
        User.create({user, pwd, type}, function (err, doc) {
            if (err) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            return res.json({code: 0})
        })
    })
})
Router.get('/info', function (req, res) {
    return res.json({code: 1})
})

module.exports = Router;