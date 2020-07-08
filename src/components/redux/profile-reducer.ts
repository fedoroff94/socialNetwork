import { FormAction, stopSubmit } from 'redux-form';
import { photosType, postType, profileType } from '../../types/types';
import { profileAPI } from "../../api/profile-api";
import { BaseThunkType, InferActionsType } from "./redux-store";

let initialState = {
    posts: [
        {id: 1, message: 'The first post', likesCount: 1, dislikesCount: 1},
        {id: 2, message: 'The second post', likesCount: 2, dislikesCount: 2}
    ] as Array<postType>,
    profile: null as profileType | null,
    status: '',
}

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 10,
                dislikesCount: 2
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case 'SET-USER-PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SET-USER-STATUS': {
            return {...state, status: action.status}
        }
        case 'DELETE-POST': {
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
        case 'SAVE-PHOTO': {
            return {...state, profile: {...state.profile, photos: action.photos} as profileType}
        }
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'ADD-POST', newPostText} as const),
    setUserProfile: (profile: profileType) => ({type: 'SET-USER-PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'SET-USER-STATUS', status} as const),
    deletePostAC: (postId: number) => ({type: 'DELETE-POST', postId} as const),
    savePhotoAC: (photos: photosType) => ({type: 'SAVE-PHOTO', photos} as const)
}

export const setUserTC = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUser(userId);
    dispatch(actions.setUserProfile(data));
};

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setUserStatus(data));
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actions.setUserStatus(status));
        }
    } catch (error) {
        debugger
        console.log(error)
    }
};

// 97
export const saveProfile = (profile: profileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        if (userId != null) {
            dispatch(setUserTC(userId));
        } else {
            throw new Error('userId cant be null!!!')
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
};

//96
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoAC(data.data.photos));
    }
}

type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export default profileReducer;