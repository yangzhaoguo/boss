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
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
        }
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;

        return (
            <div>
                {redirect && path !== redirect ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode='dark'>牛人信息完善</NavBar>
                <AvatarSelector
                    selectAvater={(imgname) => {
                        this.setState({
                            avatar: imgname
                        })
                    }}
                />
                <InputItem
                    onChange={(v) => this.onChange('title', v)}
                >求职岗位</InputItem>

                <TextareaItem
                    rows={3}
                    autoHeight
                    title='个人简介'
                    onChange={(v) => this.onChange('desc', v)}
                />
                <WhiteSpace></WhiteSpace>
                <Button
                    onClick={() => {
                        this.props.updata(this.state)
                    }}
                    type='primary'>
                    保存
                </Button>
            </div>
        )
    }
}

export default GeniusInfo