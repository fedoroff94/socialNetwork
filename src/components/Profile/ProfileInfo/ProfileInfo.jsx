import React from 'react';
import classes  from './ProfileInfo.module.css';
import Preloader from '../../../assets/common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateUserStatus}) => {
    if(!profile){
        return <Preloader/>
    }
    return (
        <div>
            <div>
            <img className={classes.profilephoto} src={profile.photos.large}/>
            </div>
            <div>
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;