import React from 'react';
import { CreateField, GetStringKeys, Input, Textarea } from '../../../assets/common/FormsControls/FormsControls';
import { InjectedFormProps, reduxForm } from "redux-form";
import classes from './ProfileInfo.module.css';
import { profileType } from "../../../types/types";

type PropsType = {
    profile: profileType
}

type ProfileTypeKeys = GetStringKeys<profileType>

const ProfileDataForm: React.FC<InjectedFormProps<profileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error &&
            <div className={classes.summaryError}>
                {error}
            </div>
            }
            <div>
                <b>Full name :</b> {CreateField<ProfileTypeKeys>('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job:</b> {CreateField<ProfileTypeKeys>('', 'lookingForAJob', [], Input,
                {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills are:</b> {CreateField<ProfileTypeKeys>('My professional skills',
                'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About me:</b> {CreateField<ProfileTypeKeys>('About me',
                'aboutMe', [], Textarea)}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div className={classes.dataContact} key={key}>
                    <b>{key}:</b> {CreateField(key, 'contacts.' + key, [], Input)}
                </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm<profileType, PropsType>({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataReduxForm