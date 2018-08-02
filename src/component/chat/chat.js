import React from 'react'
import io from 'socket.io-client'
import {List, InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg} from "../../redux/chat.redux";

const socket = io('ws://localhost:9093');

@connect(
    state => state,
    {getMsgList, sendMsg}
)


class Chat extends React.Component {
    constructor(p) {
        super(p)
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        this.props.getMsgList()
        // socket.on('recvmsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
    }

    handleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg})
        this.setState({text: ''})
    }

    render() {
        return (
            <div>
                {this.state.msg.map((v, i) => {
                    return <p key={i}>{v}</p>
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