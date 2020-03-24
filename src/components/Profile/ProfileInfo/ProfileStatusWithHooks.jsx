import React, {useState, useEffect} from 'react';
import {CreateField, Input} from "../../../assets/common/FormsControls/FormsControls";
import {MaxLengthCreator} from "../../../utils/validators/validstors";

const ProfileStatusWithHooks = (props) => {

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

    const onStatusChange = (e) => {
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