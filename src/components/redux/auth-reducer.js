import {authAPI, secuiriryAPI, securityAPI} from '../../api/api';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'SET-USER-DATA';
const GET_CAPTCHA = 'GET-CAPTCHA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setUserData = (id, login, email, isAuth) => ({type: SET_USER_DATA, payload: {id, login, email, isAuth}}); //actionCreator
export const getCaptchaAC = (captchaUrl) => ({type: GET_CAPTCHA, payload: {captchaUrl}});

export const setUserDataTC = () => async (dispatch) => {
    let response = await authAPI.authMe();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setUserData(id, login, email, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(setUserDataTC());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        //'login' из form: 'login' в Login reduxForm, второе поле - проблемное, _error - общая ошибка для всех филдов
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error!!!';
        dispatch(stopSubmit('login', {_error: message}));
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
    }
}

//98

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaURL();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaAC(captchaUrl));
}

export default authReducer;