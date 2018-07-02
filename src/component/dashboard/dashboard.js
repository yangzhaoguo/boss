import React from 'react'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'

function Boss() {
    return <h2>boss</h2>
}

function Genius() {
    return <h2>牛人</h2>
}

function Msg() {
    return <h2>消息</h2>
}

function User() {
    return <h2>我的</h2>
}

@connect(
    state => state
)


class Dashboard extends React.Component {
    render() {

        const user = this.props.user;
        const {pathname} = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boos'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User,
            }
        ];

        return (
            <div>
                <NavBar className='fixd-header' mode="dard">{navList.find(v => v.path === pathname).title}</NavBar>

                <NavLinkBar data={navList}></NavLinkBar>

            </div>
        )
    }
}

// {<Route path='/boos' component={Boss}></Route>}
// {<Route path='/genius' component={Genius}></Route>}

export default Dashboard