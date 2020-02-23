import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {setUserTC, getUserStatus, updateUserStatus} from '../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../HOC/withAuthRedirect';
import {compose} from 'redux';


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userId;
        }
        this.props.setUserTC(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}/>
        )
    }
}

///High order Component --- HOC
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorized: state.auth.isAuth,
    userId: state.auth.id
});

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default compose(
    connect(mapStateToProps, {setUserTC, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

