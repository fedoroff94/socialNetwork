import React from 'react';
import classes  from './ProfileInfo.module.css';
import Preloader from '../../../assets/common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
    if(!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <div>
            <img className={classes.profilephoto} src={props.profile.photos.large}/>
            </div>
            <div>
                <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;