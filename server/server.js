const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const userRouter = require('./user');
const models = require('./mongo');
const Chat = models.getModel('chat');

io.on('connection', function (socket) {
    socket.on('sendmsg', function (data) {
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({chatid, from, to, content: msg}, function (err, doc) {
            io.emit('recvmsg', Object.assign({}, doc._doc));
        })
    })
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use((req, res, next) => {   //ssh 服务器渲染
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next()
    } else {
        return res.sendFile(path.resolve('build/index.html'))
    }
});
app.use('/', express.static(path.resolve('build')));

server.listen(9093, function () {
    console.log('node app start at port 9093');
});