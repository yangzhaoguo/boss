import React from 'react'
import {NavBar, InputItem, TextareaItem, Button, WhiteSpace} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {updata} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {updata}
)
class GeniusinfoInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
            avatar: ''
        }
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo

        return (
            <div>
                {redirect && path !== redirect ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode='dark'>BOSS信息完善</NavBar>
                <AvatarSelector
                    selectAvater={(imgname) => {
                        this.setState({
                            avatar: imgname
                        })
                    }}
                />
                <InputItem
                    onChange={(v) => this.onChange('title', v)}
                >招聘职位</InputItem>
                <InputItem
                    onChange={(v) => this.onChange('company', v)}
                >公司名称</InputItem>
                <InputItem
                    onChange={(v) => this.onChange('money', v)}
                >职位薪资</InputItem>
                <TextareaItem
                    rows={3}
                    autoHeight
                    title='职位要求'
                    onChange={(v) => this.onChange('desc', v)}
                />
                <WhiteSpace></WhiteSpace>
                <Button
                    onClick={() => {
                        this.props.updata(this.state)
                    }}
                    type='primary'>保存</Button>

            </div>
        )
    }
}

export default GeniusinfoInfo