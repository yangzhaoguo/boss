import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
    isAuth: '',
    msg: '',
    user: '',
    pwd: '',
    type: ''

}


export function user(state=initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', isAuth: true, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        default:
            return state
    }
}


function errorMsg(msg) {
    return {
        type: ERROR_MSG,
        msg: msg
    }
}

function registerSuccess(data) {
    return {type: REGISTER_SUCCESS, payload: data}
}

export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码不可为空')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同')
    }

    return dispatch => {
        axios.post('/user/register', {user, pwd, type}).then(res => {
            if (res.state === 200 && res.data.code === 0) {
                console.log(res);
                dispatch(registerSuccess({user, pwd, type}))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }

}

