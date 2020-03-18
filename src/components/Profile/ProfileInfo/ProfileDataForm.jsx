import React from 'react';
import {CreateField, Input, Textarea} from '../../../assets/common/FormsControls/FormsControls';
import {reduxForm} from "redux-form";
import classes from './ProfileInfo.module.css';


const ProfileDataForm = ({handleSubmit, profile, error}) => {
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
                <b>Full name :</b> {CreateField('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job:</b> {CreateField('', 'lookingForAJob', [], Input,
                {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills are:</b> {CreateField('My professional skills',
                'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About me:</b> {CreateField('About me',
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

const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataReduxForm