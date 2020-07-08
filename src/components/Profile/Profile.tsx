import React from 'react';
import MyPostsContainer from './Post/MyPostsContainer';
import ProfileInfo, { PropsType } from './ProfileInfo/ProfileInfo';
import classes from './Profile.module.css';

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div className={classes.content}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}
                         saveProfile={props.saveProfile}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;