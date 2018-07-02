import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import reducers from './redux/reducers.redux'
import AuthRoute from './component/authRouter/authrouter'
import BossInof from './container/bossInfo/bossInfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import './config'
import './index.css'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/bossinfo' component={BossInof}></Route>
                    <Route path='/geniusinfo' component={Geniusinfo}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root')
)

