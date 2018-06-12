import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'

@connect(
    state => state.user,
    {register}
)

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pwd: "",
            repeatpwd: "",
            type: 'genius'  // or boos
        };
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleRegister() {
        this.props.register(this.state)
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p>{this.props.msg}</p> : null}
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
                            checked={this.state.type === 'genius'}>
                            牛人
                        </RadioItem>
                        <RadioItem
                            onChange={() => {
                                this.handleChange('type', 'boos')
                            }}
                            checked={this.state.type === 'boos'}>
                            BOOS
                        </RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </WingBlank>

            </div>
        )
    }
}

export default Register