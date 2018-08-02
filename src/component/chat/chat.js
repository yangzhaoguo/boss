import React from 'react'
import io from 'socket.io-client'
import {List, InputItem, NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from "../../redux/chat.redux";

const socket = io('ws://localhost:9093');

@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg}
)


class Chat extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        this.props.getMsgList();
        this.props.recvMsg()
    }

    handleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        if (this.state.text === '') {
            return false
        }
        console.log({from, to, msg});
        this.props.sendMsg({from, to, msg});
        this.setState({text: ''})
    }

    render() {
        const user = this.props.match.params.user;
        return (
            <div id='chat-page'>
                <NavBar mode='dark'>
                    {user}
                </NavBar>
                {this.props.chat.chatmsg.map((v) => {
                    return v.from == user ? (
                        <p key={v._id}>对方发送的：{v.content}</p>
                    ) : (
                        <p key={v._id}>我发送的：{v.content}</p>
                    )
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={<span onClick={() => this.handleSubmit()}>发送</span>}
                        >
                        </InputItem>
                    </List>
                </div>
            </div>

        )
    }
}

export default Chat