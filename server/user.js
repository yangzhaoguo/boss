const express = require('express');
const utils = require('utility');
const Router = express.Router();
const models = require('./mongo');
const User = models.getModel('user');
const Chat = models.getModel('chat');
const _filter = {pwd: 0, __v: 0};

Router.get('/list', function (req, res) {
    // User.remove({},function(){})
    const {type} = req.query;

    User.find({type}, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'})
        } else {
            return res.json({code: 0, data: doc})
        }
    })
});

Router.get('/getmsglist', function (req, res) {
    // Chat.remove({}, function () {})
    const user = req.cookies.userid;
    User.find({}, function (e, doc) {
        let users = {};
        doc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
        Chat.find({'$or': [{from: user}, {to: user}]}, function (err, doc) {
            if (err) {
                return res.json({code: 1, msg: '后端出错了'})
            } else {
                console.log(doc)
                return res.json({code: 0, msg: doc, users: users})
            }
        })
    });

})

Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body;
    User.findOne({user: user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户重名'})
        }
        User.create({user, type, _filter, pwd: md5Pwd(pwd)}, function (err, doc) {
            if (err) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            const {user, type, _id} = doc;
            res.cookie('userid', _id);
            return res.json({code: 0, data: {user, type, _id}})
        })
    })
});

Router.post('/login', function (req, res) {
    const {user, pwd} = req.body;
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: '用户名或密码错误'})
        }
        res.cookie('userid', doc._id);
        return res.json({code: 0, data: doc})
    })
});

Router.get('/info', function (req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: 'API出错'});
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
});

Router.post('/update', function (req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        return res.json.dumps({code: 1})
    }
    const body = req.body;
    //查找并更新
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body);
        return res.json({code: 0, data})
    })
});


function md5Pwd(pwd) {
    const salt = 'uihoj-*1sdfr//123asdzz!Q@W#E$%^&*(asd';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;