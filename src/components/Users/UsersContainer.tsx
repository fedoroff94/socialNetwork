import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import {
    follow,
    unfollow,
    getUsers
} from '../redux/users-reducer';
import Preloader from '../../assets/common/Preloader/Preloader';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalUsersCount,
    getUsersS
} from "../redux/users-selectors";
import { userType } from "../../types/types";
import { appStateType } from "../redux/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalItemsCount: number
    users: Array<userType>
    portionSize: number
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type ownPropsType = {
    title: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & ownPropsType;

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            <h2>{this.props.title}</h2>
            <div className='preloader'>{this.props.isFetching
                ? <Preloader/>
                : null}
            </div>

            <Users totalItemsCount={this.props.totalItemsCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   portionSize={this.props.portionSize}
            />
        </>
    }
}

let mapStateToProps = (state: appStateType): MapStatePropsType => { // use selectors
    return {
        users: getUsersS(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
}

export default compose(
    // <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState>
    connect<MapStatePropsType, MapDispatchPropsType, ownPropsType, appStateType>(mapStateToProps, {
        follow, unfollow,
        getUsers
    }),
    withAuthRedirect // 1
)(UsersContainer); // компонента, которая оборачивается (исходная)
