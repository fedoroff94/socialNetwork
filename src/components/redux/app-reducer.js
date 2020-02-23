import {setUserDataTC} from "./auth-reducer";

const SET_INITIALIZED = 'SET-INITIALIZED';

let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const setInitialized = () => ({type: SET_INITIALIZED}); //actionCreator

export const initializeApp = () => (dispatch) => { //thunkCreator
    let promise = dispatch(setUserDataTC());
    Promise.all([promise])
        .then(() => {
            dispatch(setInitialized());
    })
}

export default appReducer;