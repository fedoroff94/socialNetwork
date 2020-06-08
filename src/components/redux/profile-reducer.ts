import { profileAPI, usersAPI } from '../../api/api';
import { stopSubmit } from 'redux-form';
import { photosType, postType, profileType } from '../../types/types';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'GET-USER-STATUS';
const DELETE_POST = 'samurai-network/profileReducer/DELETE-POST';
const SAVE_PHOTO = 'SAVE-PHOTO';

let initialState = {
    posts: [
        {id: 1, message: 'The first post', likesCount: 1, dislikesCount: 1},
        {id: 2, message: 'The second post', likesCount: 2, dislikesCount: 2}
    ] as Array<postType>,
    profile: null as profileType | null,
    status: '',
    newPostText: ''
};

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            debugger
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 10,
                dislikesCount: 2
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_USER_STATUS: {
            return {...state, status: action.status}
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
        case SAVE_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.photos} as profileType}
        }
        default:
            return state;
    }
};

type addPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
type setUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: profileType
}
type setUserStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}
type deletePostACType = {
    type: typeof DELETE_POST
    postId: number
}
type savePhotoACType = {
    type: typeof SAVE_PHOTO
    photos: photosType
}

export const addPostActionCreator = (newPostText: string): addPostActionCreatorType => ({type: ADD_POST, newPostText}); //profile post
export const setUserProfile = (profile: profileType): setUserProfileType => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status: string): setUserStatusType => ({type: SET_USER_STATUS, status});
export const deletePostAC = (postId: number): deletePostACType => ({type: DELETE_POST, postId});
export const savePhotoAC = (photos: photosType): savePhotoACType => ({type: SAVE_PHOTO, photos});

export const setUserTC = (userId: number) => async (dispatch: any) => {
    let data = await usersAPI.getUser(userId);
    dispatch(setUserProfile(data));
};

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data));
};

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    } catch (error) {
        debugger
        console.log(error)
    }
};

// 97
export const saveProfile = (profile: profileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(setUserTC(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
};

//96
export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoAC(response.data.data.photos));
    }
}

export default profileReducer;