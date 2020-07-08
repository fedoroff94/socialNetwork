import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { CreateField, GetStringKeys, Input, Textarea } from "../../../assets/common/FormsControls/FormsControls";
import { MaxLengthCreator, required } from "../../../utils/validators/validstors";
import React from "react";
import { LoginFormKeysType, LoginFormValuesType } from "../../Login/Login";

const MaxLength10 = MaxLengthCreator(10);

type PropsType = {

}

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const addPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {CreateField<AddPostFormValuesTypeKeys>('Post message', 'newPostText', [required, MaxLength10], Textarea, {type: 'text'})}

                {/*<Field name={'newPostText'} placeholder={'Post message'} component={Textarea} type={'text'}*/}
                {/*       validate={[required, MaxLength10]}/>*/}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({form: 'addNewPostForm'})(addPostForm);
