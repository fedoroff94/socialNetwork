import React from 'react';
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { CreateField, GetStringKeys, Input } from "../../assets/common/FormsControls/FormsControls";
import {MaxLengthCreator, required} from "../../utils/validators/validstors";
import {connect} from "react-redux";
import {getCaptchaUrl, login} from "../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import classes from './Login.module.css';
import { appStateType } from "../redux/redux-store";

const maxLength30 = MaxLengthCreator(30);

type LoginFormOunProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOunProps> & LoginFormOunProps> =
    ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {CreateField<LoginFormKeysType>('Email', 'Email', [required], Input, {type: 'text'})}
            {CreateField<LoginFormKeysType>('Password', 'Password', [required], Input, {type: 'password'})}
            {CreateField<LoginFormKeysType>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

            {/*<Field validate={[required, maxLength30]} type="text" placeholder={'Email'} component={Input}*/}
            {/*       name={'Email'}/>*/}

            {captchaUrl && <img src={captchaUrl}/>}
            {error &&
            <div className={classes.summaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOunProps>({form: 'login'})(LoginForm);

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
    Email: string
    Password: string
    rememberMe: boolean
    captcha: string
}

export type LoginFormKeysType = GetStringKeys<LoginFormValuesType>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        console.log(formData);
        props.login(formData.Email, formData.Password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to='/profile'/>
    }

    return (
        <div>
            <h1>Login</h1>
            <div><LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/></div>
        </div>
    )
}

const mapStateToProps = (state: appStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login})(Login);