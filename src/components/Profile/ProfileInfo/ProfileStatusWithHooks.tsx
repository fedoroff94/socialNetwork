import React, { useState, useEffect, ChangeEvent } from 'react';
import { MaxLengthCreator } from "../../../utils/validators/validstors";

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const diactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    const MaxLength20 = MaxLengthCreator(20);

    return (
        <div>
            {!editMode &&
            <div>
                <span><b>Status: </b></span>
                <span onDoubleClick={activateEditMode}>{props.status || '---'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} onBlur={diactivateEditMode} autoFocus={true} value={status}/>
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;