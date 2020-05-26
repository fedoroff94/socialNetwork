import {authAPI, securityAPI} from '../../api/api';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'SET-USER-DATA';
const GET_CAPTCHA = 'GET-CAPTCHA';


export type InitialStateType1 = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean,
    captchaUrl: string | null
}

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
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

type SetUserDataPayloadType = {
    id: number | null
    login: string |  null
    email: string | null
    isAuth: boolean
}

type SetUserDataType = {
    type: typeof SET_USER_DATA
    payload: SetUserDataPayloadType
}


export const setUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean): SetUserDataType =>
    ({type: SET_USER_DATA, payload: {id, login, email, isAuth}}); //actionCreator

type PayloadType = {
    captchaUrl: string
}

type GetCaptchaType = {
    type: typeof GET_CAPTCHA
    payload: PayloadType
}

export const getCaptchaAC = (captchaUrl: string): GetCaptchaType  => ({type: GET_CAPTCHA, payload: {captchaUrl}});

export const setUserDataTC = () => async (dispatch: any) => {
    let response = await authAPI.authMe();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setUserData(id, login, email, true));
    }
}

export const login = (email: string, password: number, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
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
    };
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
    }
}

//98

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaURL();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaAC(captchaUrl));
}

export default authReducer;