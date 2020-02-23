import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem.jsx'
import Message from './Message/Message.jsx';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../assets/common/FormsControls/FormsControls";
import {MaxLengthCreator, required} from "../../utils/validators/validstors";

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d =>
        <DialogItem key={d.id} name={d.name} id={d.id}/>
    );

    let messagesElements = state.messages.map(m =>
        <Message key={m.id} message={m.message}/>
    );

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={classes.dialogs}>

            <div className={classes.dialogsItems}>
                <div>{dialogsElements}</div>
            </div>

            <div className={classes.messages}>
                {messagesElements}
            </div>

            <div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>

        </div>)
}
 const MaxLength100 = MaxLengthCreator(100);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required, MaxLength100]} component={Textarea} name={'newMessageBody'} placeholder='Enter you message'/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;