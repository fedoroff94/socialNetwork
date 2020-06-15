import {createStore, combineReducers, applyMiddleware} from "redux";
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import newsReducer from "./news-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";

let reducers = combineReducers(
    {
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        // newsPage: newsReducer,
        sidebar: sidebarReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer
    }
);

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsType<T extends {[key: string]: (...arg: any[]) => any}> = ReturnType<PropertiesType<T>>

type reducersType = typeof reducers; // (globalState: appStateType) => appStateType
export type appStateType = ReturnType<reducersType>

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;