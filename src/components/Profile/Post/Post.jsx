import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    return (
        <div className={classes.item}>
            <img src='https://i.ytimg.com/vi/Y5GLCBjHR8U/maxresdefault.jpg' />
            <div>{props.message}</div>
            <div>like {props.likesCount}</div> 
            <div>dislike {props.dislikesCount}</div> 
        </div>

    )
}

export default Post;