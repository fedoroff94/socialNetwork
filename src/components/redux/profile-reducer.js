import {profileAPI, usersAPI} from '../../api/api';
import {stopSubmit} from 'redux-form';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'GET-USER-STATUS';
const DELETE_POST = 'samurai-network/profileReducer/DELETE-POST';
const SAVE_PHOTO = 'SAVE-PHOTO';

let initialState = {
    posts: [
        {id: '1', message: 'Hi, how are you?', likesCount: '12', dislikesCount: '3'},
        {id: '2', message: 'It is my first post', likesCount: '11', dislikesCount: '4'}
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 10,
                dislikesCount: 2
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
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
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText}); //profile post
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const deletePostAC = (postId) => ({type: DELETE_POST, postId});
export const savePhotoAC = (photos) => ({type: SAVE_PHOTO, photos});

export const setUserTC = (userId) => async (dispatch) => {
    let data = await usersAPI.getUser(userId);
    dispatch(setUserProfile(data));
}

export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data));
}

export const updateUserStatus = (status) => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    } catch (error) {
        debugger
        console.log(error)
    }
}

// 97
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(setUserTC(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}

//96
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoAC(response.data.data.photos));
    }
}

export default profileReducer;