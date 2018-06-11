import React from 'react';
import {Redirect} from 'react-router-dom';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {logout} from '../store/auth.redux'
import App from './App'
import Erying from './Erying'
import Qibinglian from './Qibinglian'

@connect(
    state => state.auth,
    {logout}
)
class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        return
    }

    render() {
        const matchUrl = this.props.match.url;
        const redirectToLogin = <Redirect to='/login'></Redirect>;
        const app = (
            <div>
                {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
                <ul>
                    <li>
                        <Link to={`${matchUrl}`}>一营</Link>
                    </li>
                    <li>
                        <Link to={`${matchUrl}/erying`}>二营</Link>
                    </li>
                    <li>
                        <Link to={`${matchUrl}/qibinglian`}>骑兵连</Link>
                    </li>
                </ul>
                <Route path={`${matchUrl}`} exact component={App}></Route>
                <Route path={`${matchUrl}/erying`} component={Erying}></Route>
                <Route path={`${matchUrl}/qibinglian`} component={Qibinglian}></Route>
            </div>
        );
        return this.props.isAuth ? app : redirectToLogin
    }
}

export default Dashboard