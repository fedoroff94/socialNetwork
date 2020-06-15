import {setUserDataTC} from "./auth-reducer";
import { InferActionsType } from "./redux-store";

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET-INITIALIZED':
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};


export const actions = {
    setInitialized: () => ({type: 'SET-INITIALIZED'} as const)
}

export const initializeApp = () => (dispatch: any) => { //thunkCreator
    let promise = dispatch(setUserDataTC());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.setInitialized());
    })
};

export default appReducer;