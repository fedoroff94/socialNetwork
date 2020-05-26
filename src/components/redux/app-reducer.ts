import {setUserDataTC} from "./auth-reducer";

const SET_INITIALIZED = 'SET-INITIALIZED';

export type InitialStateType = {
    initialized: boolean
}

type SetInitializedActionType = {
    type: typeof SET_INITIALIZED
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

export const setInitialized = (): SetInitializedActionType => ({type: SET_INITIALIZED}); //actionCreator

export const initializeApp = () => (dispatch: any) => { //thunkCreator
    let promise = dispatch(setUserDataTC());
    Promise.all([promise])
        .then(() => {
            dispatch(setInitialized());
    })
}

export default appReducer;