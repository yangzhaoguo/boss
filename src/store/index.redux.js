const ADD_GL = '加机关枪';
const REMOVE_GL = '减机关枪';


export function counter(state = 0, action) {
    switch (action.type) {
        case ADD_GL:
            return state + 1;
        case REMOVE_GL:
            return state - 1;
        default:
            return 10;
    }
}

export function addGL() {
    return {type: ADD_GL}
}

export function removeGL() {
    return {type: REMOVE_GL}
}

export function addGLAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(addGL())
        }, 2000)
    }
}