import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import './index.css'

@connect(
    state => state.user,
    {register}
)

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: {
                user: "",
                pwd: "",
                repeatpwd: "",
                type: 'genius'  // or boss
            }
        };
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(key, val) {
        let data = Object.assign({}, this.state.postData, {[key]: val});
        this.setState({
            postData: data
        })
    }

    handleRegister() {
        this.props.register(this.state.postData);
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v => {
                                this.handleChange('user', v)
                            }}
                        >用户名</InputItem>
                        <InputItem
                            onChange={v => {
                                this.handleChange('pwd', v)
                            }}
                            type='password'
                        >密码</InputItem>
                        <InputItem
                            onChange={v => {
                                this.handleChange('repeatpwd', v)
                            }}
                            type='password'

                        >确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <RadioItem
                            onChange={() => {
                                this.handleChange('type', 'genius')
                            }}
                            checked={this.state.postData.type === 'genius'}>
                            牛人
                        </RadioItem>
                        <RadioItem
                            onChange={() => {
                                this.handleChange('type', 'boss')
                            }}
                            checked={this.state.postData.type === 'boss'}>
                            BOSS
                        </RadioItem>
                    </List>
                    {this.props.msg ? <p className="warn">{this.props.msg}</p> : null}
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </WingBlank>

            </div>
        )
    }
}

export default Register