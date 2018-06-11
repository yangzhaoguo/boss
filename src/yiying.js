import React from 'react'
import {Button, List} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'

class yiying extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            solders: ['胡子', '和尚', '王根生']
        }
    }

    addSolder() {
        this.setState({
            solders: [...this.state.solders, '新兵' + new Date().getTime()]
        })
    }

    // componentWillMount() {
    //     console.log('组件加载前')
    // }
    //
    // componentDidMount() {
    //     console.log('组件加载完成')
    // }

    render() {
        return (
            <div>
                <h2>一营 营长：{this.props.yiying}</h2>
                <Button type='primary' onClick={() => {
                    this.addSolder()
                }}>增加新兵
                </Button>
                <List renderHeader={() => '士兵列表'}>
                    {this.state.solders.map((v, i) => {
                        return <List.Item key={i}>{v}</List.Item>
                    })}
                </List>
            </div>
        )
    }
}


export default yiying
