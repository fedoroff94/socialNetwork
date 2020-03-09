import React from 'react';
import styles from './FormsControls.module.css';
import {Field} from "redux-form";

const FormControle = ({input, meta: {touched, error}, children, ...props}) => {
    const hasError = error && touched;
    return (
        <div className={styles.formControle + ' ' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )

}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControle {...props}><textarea {...input} {...restProps}/></FormControle>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControle {...props}><input {...input} {...restProps}/></FormControle>
}

export const CreateField = (placeholder, name, validate, component, props = {}, text = '') => {
    return (
        <div>
            <Field validate={validate} {...props} placeholder={placeholder} component={component}
                   name={name}/> {text}
        </div>
    )
}