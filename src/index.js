import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {counter, addGL, removeGL, addGLAsync} from './store/index.redux'
import App from './App';

const store = createStore(counter, applyMiddleware(thunk));

function listener() {
    const current = store.getState();
    console.log(`现在有${current}把机枪`);
}

// 监听事件
store.subscribe(listener);
// 派发事件
// store.dispatch({type: '加机关枪'});

ReactDOM.render(
    (<Provider store={store}>
        <App/>
    </Provider>),document.getElementById('root')
)

