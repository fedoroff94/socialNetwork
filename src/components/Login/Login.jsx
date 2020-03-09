import React from 'react';
import {Field, reduxForm} from "redux-form";
import {CreateField, Input} from "../../assets/common/FormsControls/FormsControls";
import {MaxLengthCreator, required} from "../../utils/validators/validstors";
import {connect} from "react-redux";
import {login} from "../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import classes from './Login.module.css';

const maxLength30 = MaxLengthCreator(30);

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {CreateField('Email', 'Email', [required], Input, {type: 'text'})}
            {CreateField('Password', 'Password', [required], Input, {type: 'password'})}
            {CreateField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

            {/*<Field validate={[required, maxLength30]} type="text" placeholder={'Email'} component={Input}*/}
            {/*       name={'Email'}/>*/}

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

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData);
        props.login(formData.Email, formData.Password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to='/profile'/>
    }

    return (
        <div>
            <h1>Login</h1>
            <div><LoginReduxForm onSubmit={onSubmit}/></div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);