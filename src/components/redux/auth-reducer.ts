import { ResultCodeForCaptcha, ResultCodesEnum} from '../../api/api';
import { FormAction, stopSubmit } from 'redux-form';
import { authAPI } from "../../api/auth-api";
import { securityAPI } from "../../api/security-api";
import { BaseThunkType, InferActionsType } from "./redux-store";

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
        case 'GET-CAPTCHA':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export const actions = {
    setUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) =>
        ({type: 'SET-USER-DATA', payload: {id, login, email, isAuth}} as const),
    getCaptchaAC: (captchaUrl: string)  => ({type: 'GET-CAPTCHA', payload: {captchaUrl}} as const)
}

export const setUserDataTC = (): ThunkType => async (dispatch) => {
    let resData = await authAPI.authMe();
    if (resData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = resData.data;
        dispatch(actions.setUserData(id, login, email, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
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

export const logout = (): ThunkType => async (dispatch: any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setUserData(null, null, null, false));
    }
}

//98

export const getCaptchaUrl = (): ThunkType => async (dispatch: any) => {
    let data = await securityAPI.getCaptchaURL();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaAC(captchaUrl));
}

export default authReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>