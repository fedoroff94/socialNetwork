import {profileAPI, usersAPI} from '../../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'GET-USER-STATUS';

let initialState = {
    posts: [
        { id: '1', message: 'Hi, how are you?', likesCount: '12', dislikesCount: '3' },
        { id: '2', message: 'It is my first post', likesCount: '11', dislikesCount: '4' }
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
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText }); //profile post
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});

export const setUserTC = (userId) => { //ThunkCreator получает данные и возвращает Thunk
    return (dispatch) => { // Thunk - функция, исп. для ассинхр. операций, которая диспатчит обычные экшены, и ее саму можно диспатчить
        usersAPI.getUser(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            });
    }
}

export const getUserStatus = (userId) => { //ThunkCreator получает данные и возвращает Thunk
    return (dispatch) => { // Thunk - функция, исп. для ассинхр. операций, которая диспатчит обычные экшены, и ее саму можно диспатчить
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setUserStatus(response.data));
            });
    }
}

export const updateUserStatus = (status) => { //ThunkCreator получает данные и возвращает Thunk
    return (dispatch) => { // Thunk - функция, исп. для ассинхр. операций, которая диспатчит обычные экшены, и ее саму можно диспатчить
        profileAPI.updateStatus(status)
            .then(response => {
                if(response.data.resultCode === 0){
                    dispatch(setUserStatus(status));
                }
            });
    }
}

export default profileReducer;