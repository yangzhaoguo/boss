const app = require('express')();
const mongoose = require('mongoose');

//连接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('mongo connect success');
});
//创建mongo 模型
const User = mongoose.model('user', new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number, require: true}
}));

//创建app
app.get('/', function (req, res) {
    res.send('hello node');
});

app.get('/data', function (req, res) {
    User.find({}, function (err, doc) {
        if (!err) {
            res.json(doc)
        } else {
            res.send('502 错误')
        }
    })
});
app.get('/add', function (req, res) {
    User.create({
        name: 'yzg',
        age: 18
    }, function (err, doc) {
        if (!err) {
            res.json(doc)
        } else {
            res.send('502 错误')
        }
    })
});
app.get('/delete', function (req, res) {
    User.remove({age: 18}, function (err, doc) {
        if (!err) {
            res.json(doc)
        } else {
            res.send('502 错误')
        }
    })
});
app.listen(9093, function () {
    console.log('node app start at port 9093');
});