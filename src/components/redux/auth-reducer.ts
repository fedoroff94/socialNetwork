import { ResultCodeForCaptcha, ResultCodesEnum} from '../../api/api';
import { stopSubmit } from 'redux-form';
import { authAPI } from "../../api/auth-api";
import { securityAPI } from "../../api/security-api";

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
    let resData = await authAPI.authMe();
    if (resData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = resData.data;
        dispatch(setUserData(id, login, email, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        let loginData = await authAPI.login(email, password, rememberMe, captcha);
        if (loginData.resultCode === ResultCodesEnum.Success) {
            dispatch(setUserDataTC());
        } else {
            if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            //'login' из form: 'login' в Login reduxForm, второе поле - проблемное, _error - общая ошибка для всех филдов
            let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error!!!';
            dispatch(stopSubmit('login', {_error: message}));
        }
    };
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setUserData(null, null, null, false));
    }
}

//98

export const getCaptchaUrl = () => async (dispatch: any) => {
    let data = await securityAPI.getCaptchaURL();
    const captchaUrl = data.url;
    dispatch(getCaptchaAC(captchaUrl));
}

export default authReducer;