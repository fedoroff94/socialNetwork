import React, { ChangeEvent, useState } from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../../assets/common/Preloader/Preloader';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import baseIcon from '../../../assets/images/avatar.jpg';
import { contactsType, profileType } from "../../../types/types";

export type PropsType = {
    profile: profileType | null
    status: string
    updateUserStatus: (status: string) => void
    saveProfile: (profile: profileType | null) => Promise<any>
    isOwner: boolean
    savePhoto: (file: File) => void
}
const ProfileInfo: React.FC<PropsType> = ({profile, status, updateUserStatus, saveProfile, isOwner, savePhoto}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onSubmit = (formData: profileType) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        })
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div>
                <img className={classes.profilephoto} src={profile.photos.large || baseIcon}/>
                {isOwner && <input type={"file"} className={classes.photoLoad} onChange={onMainPhotoSelected}/>}
            </div>
            {editMode
                ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                : <ProfileData profile={profile} goToEditMode={() => {
                    setEditMode(true)
                }}/>}

            <div>
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div className={classes.contact}><b>{contactTitle}:</b>{contactValue}</div>
}

type ProfileDataPropsType = {
    profile: profileType
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, goToEditMode}) => {
    return (
        <div>
            <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>
            <div>
                <b>Full name :</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills are:</b> {profile.lookingForAJobDescription}
            </div>
            }
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {Object
                .keys(profile.contacts)
                .map((key) => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof contactsType]}/>
            })}
            </div>
        </div>
    )
}

export default ProfileInfo;