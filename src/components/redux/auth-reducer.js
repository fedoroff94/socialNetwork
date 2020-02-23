import {authAPI} from '../../api/api';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setUserData = (id, login, email, isAuth) => ({type: SET_USER_DATA, payload: {id, login, email, isAuth}}); //actionCreator

export const setUserDataTC = () => (dispatch) => {
        return authAPI.authMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data;
                    dispatch(setUserData(id, login, email, true));
                }
            });
    }

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserDataTC());
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error!!!';
                dispatch(stopSubmit('login', {_error: message}));
                //'login' из form: 'login' в Login reduxForm, второе поле - проблемное, _error - общая ошибка для всех филдов
            }
        });
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false));
            }
        });
}

export default authReducer;