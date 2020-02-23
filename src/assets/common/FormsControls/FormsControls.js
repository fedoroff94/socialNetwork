import React from 'react';
import styles from './FormsControls.module.css';

const FormControle = ({input, meta, child,  ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={styles.formControle + ' ' + (hasError ? styles.error : '')}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
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