import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { MaxLengthCreator, required } from "../utils/validators/validstors";
import { CreateField, Textarea } from "../assets/common/FormsControls/FormsControls";
import { NewMessageFormType } from "../components/Dialogs/Dialogs";

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>

type PropsType = {}

const MaxLength100 = MaxLengthCreator(100);

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {CreateField<NewMessageFormValuesKeysType>('Enter you message', 'newMessageBody', [required, MaxLength100], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
};

export default reduxForm<NewMessageFormType, PropsType>({form: 'dialogAddMessageForm'})(AddMessageForm)