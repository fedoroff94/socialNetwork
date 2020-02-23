import React from 'react';
import MyPostsContainer from './Post/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import classes from './Profile.module.css';

const Profile = (props) => {

    return (
        <div className={classes.content}>
            <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;