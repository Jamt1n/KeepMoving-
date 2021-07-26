import {createStore} from 'redux';
const ADD = "add";
const MINUS = "minus";
let InitalState = {
    num:1,
}
export function counter(state=InitalState,action) {
    switch (action.type){
        case ADD:
            return Object.assign({},state,{
                num:state.num+action.addnum
            });
        case MINUS:
            return {...state,num:state.num-1};
        default:
            return state;
    }
}

export function add(addnum) {
    console.log(addnum);
    return {type:ADD,addnum}
}
export function minus() {
    return {type:MINUS}
}


export function addSync() {
    return dispatch=>{
        setTimeout( ()=> {
            dispatch(add());
        },500)
    }
}
export function minusSync() {
    return dispatch=>{
        setTimeout( ()=> {
            dispatch(minus());
        },500)
    }
}
let store = createStore(counter);
export default store ;