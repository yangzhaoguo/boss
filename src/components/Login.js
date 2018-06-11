import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login, getUserDate} from '../store/auth.redux'

@connect(
    store => store.auth,
    {login, getUserDate}
)

class Login extends React.Component {
    constructor(props) {
        super(props);
        return
    }

    componentDidMount() {
        this.props.getUserDate()
    }

    render() {
        return (
            <div>
                <h2>名字：{this.props.name}</h2>
                <h2>年龄：{this.props.age}</h2>
                {this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null}
                <h1>需要登录</h1>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}

export default Login