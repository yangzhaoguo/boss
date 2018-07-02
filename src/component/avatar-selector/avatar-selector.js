import React from 'react'
import {Grid, List} from 'antd-mobile'
//属性检测
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
    static PropType = {
        selectAvatar: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const avatrList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v => ({
                icon: require(`../img/${v}.png`),
                text: v
            }));
        const showHeader = this.state.text
            ? (<div>
                <span>
                    已选头像：
                    <img style={{width: '20px'}} src={this.state.icon} alt=""/>
                </span>
            </div>) : <div>请选择头像</div>;
        return (
            <div>
                <List renderHeader={() => showHeader}>
                    <Grid
                        data={avatrList}
                        columnNum={5}
                        onClick={elm => {
                            this.setState(elm);
                            this.props.selectAvater(elm.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector