import { updateObjectInArray } from "../../utils/object-helpers";
import { userType } from "../../types/types";
import { appStateType, InferActionsType } from "./redux-store";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../../api/users-api";

let initialState = {
    users: [] as Array<userType>,
    totalItemsCount: 20,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users id
    portionSize: 10
};

type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };
        case "SET_USERS":
            return {...state, users: action.users};
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage};
        case "SET_TOTAL_USERS_COUNT":
            return {...state, totalItemsCount: action.totalCount};
        case "TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching};
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            };
        default:
            return state;
    }
};

//ActionCreators
type ActionsTypes = InferActionsType<typeof actions>;

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<userType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}

type GetStateType = () => appStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, ActionsTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType =>
    async (dispatch, getState) => { // ThunkCreator return Thunk
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));

        let data = await usersAPI.getUsers(currentPage, pageSize); //Bll pull DAL

        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    };

export const followUnfollowFlow = async (userId: number, dispatch: DispatchType, apiMethod: any,
                                         actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType =>
    async (dispatch) => {
        followUnfollowFlow(userId, dispatch, usersAPI.followUser.bind(usersAPI), actions.followSuccess);
    };

export const unfollow = (userId: number): ThunkType =>
    async (dispatch) => {
        followUnfollowFlow(userId, dispatch, usersAPI.unfollowUser.bind(usersAPI), actions.unfollowSuccess);
    };

export default usersReducer;