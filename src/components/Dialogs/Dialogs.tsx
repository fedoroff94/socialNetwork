import React, { FC } from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message';
import { initialStateDialogsType, messageType } from "../redux/dialogs-reducer";
import AddMessageForm from "../../AddMessageForm/AddMessageForm";

type PropsType = {
    dialogsPage: initialStateDialogsType
    sendMessage: (messageText: string) => void
    onSubmit: () => void
}

export type NewMessageFormType = {
    newMessageBody: string
}

const Dialogs: FC<PropsType> = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d =>
        <DialogItem key={d.id} name={d.name} id={d.id}/>
    );

    let messagesElements = state.messages.map(m =>
        <Message key={m.id} message={m.message}/>
    );

    let addNewMessage = (values: NewMessageFormType) => {
        props.sendMessage(values.newMessageBody);
    };

    return (
        <div className={classes.dialogs}>

            <div className={classes.dialogsItems}>
                <div>{dialogsElements}</div>
            </div>

            <div className={classes.messages}>
                {messagesElements}
            </div>

            <div>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>

        </div>)
};

export default Dialogs;