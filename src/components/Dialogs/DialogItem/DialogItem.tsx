import React, { FC } from 'react';
import classes from './../Dialogs.module.css';
import { NavLink } from "react-router-dom";

export type DialogItemType = {
    id: number
    name: string
}

const DialogItem: FC<DialogItemType> = (props) => {
  let path = '/dialogs/' + props.id;
  return (
    <div className={classes.dialog}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  )
}

export default DialogItem;