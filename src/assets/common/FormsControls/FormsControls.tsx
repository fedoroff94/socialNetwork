import React from 'react';
import styles from './FormsControls.module.css';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from '../../../utils/validators/validstors';

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}


const FormControle: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
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

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;

    return <FormControle {...props}><textarea {...input} {...restProps}/></FormControle>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControle {...props}><input {...input} {...restProps}/></FormControle>
}

export function CreateField<FormKeysType extends string>(placeholder: undefined | string,
                            name: FormKeysType,
                            validate: Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldProps>,
                            props = {},
                            text = '') {
    return <div>
        <Field validate={validate}
               {...props}
               placeholder={placeholder}
               component={component}
               name={name}/>
        {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, any>