import React from 'react';
import { NavLink } from "react-router-dom";


let Topic = (props) => {
    let path = '/news/' + props.id;
    return (
        <div>
        <NavLink to={path}>{props.topic}</NavLink>
        </div>
    )
}

export default Topic;