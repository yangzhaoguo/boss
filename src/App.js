import React from 'react'
import {connect} from 'react-redux'
import {addGL, removeGL, addGLAsync} from './index.redux'
import YiYing from './yiying'

@connect(
    //属性
    state => ({num: state}),
    //方法,自动添加到props,dispapatch
    {addGL, removeGL, addGLAsync}
)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boos: '李云龙'
        }
    }

    render() {
        let yingzhang = '张大毛';
        const addGL = this.props.addGL;
        const removeGL = this.props.removeGL;
        const addGLAsync = this.props.addGLAsync;
        const num = this.props.num;
        return (
            <div>
                <h2>独立团 团长：{this.state.boos}</h2>
                <YiYing yiying={yingzhang}></YiYing>
                <div>{num}</div>
                <button onClick={this.props.addGL}>申请武器</button>
                <button onClick={this.props.removeGL}>上交武器</button>
                <button onClick={this.props.addGLAsync}>异步增加</button>
            </div>
        )
    }
}


export default App
