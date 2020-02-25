import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import { follow, unfollow, followSuccess, unfollowSuccess, getUsers, setCurrentPage, toggleFollowingInProgress } from '../redux/users-reducer';
import Preloader from '../../assets/common/Preloader/Preloader';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSelect
} from "../redux/users-selectors";


class UsersContainer extends React.Component { 

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render(){
        return <>
        <div className='preloader'>{this.props.isFetching
        ? <Preloader/>
        : null}
        </div>
        
        <Users totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        isFetching={this.props.isFetching}
        followSuccess={this.props.followSuccess}
        unfollowSuccess={this.props.unfollowSuccess}
        toggleFollowingInProgress={this.props.toggleFollowingInProgress}
        followingInProgress={this.props.followingInProgress}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        />
        </>
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

let mapStateToProps = (state) => { // use selectors
    return {
        users: getUsersSelect(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    connect(mapStateToProps, {follow, unfollow, followSuccess, unfollowSuccess, // 2
        setCurrentPage, toggleFollowingInProgress,
        getUsers: getUsers}),
    withAuthRedirect // 1
)(UsersContainer); // компонента, которая оборачивается (исходная)

// let AuthRedirectComponent = withAuthRedirect(UsersContainer);

//  export default connect(mapStateToProps, {follow, unfollow, followSuccess, unfollowSuccess,
//     setCurrentPage, toggleFollowingInProgress,
//     getUsers: getUsers  
//  })(AuthRedirectComponent);