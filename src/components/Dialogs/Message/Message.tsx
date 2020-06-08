import React, { FC } from 'react';
import classes from './../Dialogs.module.css';

export type MessageType = {
  message: string
}

const Message: FC<MessageType> = (props) => {
  return (
    <div className={classes.message}>
      {props.message}
    </div>
  )
}

export default Message;