import {createSelector} from 'reselect';
import { appStateType } from "./redux-store";

const getUsersSelect = (state: appStateType) => {
    return state.usersPage.users
};

export const getUsersS = createSelector(getUsersSelect, (users) => {
return users.filter(u => true);
});


export const getPageSize = (state: appStateType) => {
    return state.usersPage.pageSize
};

export const getTotalUsersCount = (state: appStateType) => {
    return state.usersPage.totalItemsCount;
};

export const getCurrentPage = (state: appStateType) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state: appStateType) => {
    return state.usersPage.isFetching
};

export const getFollowingInProgress = (state: appStateType) => {
    return state.usersPage.followingInProgress
};

export const getPortionSize = (state: appStateType) => {
    return state.usersPage.portionSize;
};