const createStore = (reducer,initialState)=>{
    let currentState = initialState;
    const listeners = [];
    const getState = ()=>currentState;
    const subscribe = (listener)=>listeners.push(listener);
    const dispatch = action=>{
        currentState = reducer(currentState,action);
        listeners.forEach(listener=>listener());
    }
    return {
        getState,
        subscribe,
        dispatch
    }
}

export default createStore;