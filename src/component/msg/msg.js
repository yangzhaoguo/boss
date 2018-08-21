import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

@connect(
    state => state
)

class Msg extends React.Component {
    getList(arr) {
        return arr[arr.length - 1]
    }

    render() {
        if (!this.props.chat.chatmsg.length) {
            return (
                <div style={{
                    color: '#ccc',
                    textAlign: 'center',
                    lineHeight: '90px',
                    fontSize: '20px'
                }}>暂无消息</div>
            )
        }
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.user._id;
        const userInfo = this.props.chat.users;
        //根据chatid分组
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v)
        });
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getList(a).create_time;
            const b_last = this.getList(b).create_time;
            return b_last - a_last
        });
        return (
            <div id='chat-list'>
                <List>
                    {chatList.map(v => {
                        const lastItem = this.getList(v);
                        const targetId = lastItem.from === userid ? lastItem.to : lastItem.from;
                        const unreadNum = v.filter(v => !v.read && v.to === userid).length
                        return (
                            <Item
                                key={lastItem._id}
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
                                arrow='horizontal'
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                {lastItem.content}
                                <Brief>{userInfo[targetId].name}</Brief>
                            </Item>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default Msg
