import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    return (
        <div className={classes.item}>
            <img src='http://localhost:3000/static/media/user.8b1dbb1f.png' />
            <div>{props.message}</div>
            <div>like {props.likesCount}</div>
            <div>dislike {props.dislikesCount}</div>
        </div>

    )
}

export default Post;