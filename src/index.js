import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './config'
import redux from './store/reducers.redux'
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const store = createStore(redux, applyMiddleware(thunk));

function NoMatch() {
    return <h1>404</h1>
}

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/login' exact component={Login}></Route>
                    <Route path='/dashboard' component={Dashboard}></Route>
                    <Redirect to='/dashboard'></Redirect>
                    <Route component={NoMatch}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root')
)

