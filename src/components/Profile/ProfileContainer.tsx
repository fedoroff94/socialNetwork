import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {setUserTC, getUserStatus, updateUserStatus, saveProfile, savePhoto} from '../redux/profile-reducer';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {withAuthRedirect} from '../../HOC/withAuthRedirect';
import {compose} from 'redux';
import { appStateType } from "../redux/redux-store";
import { profileType } from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    setUserTC: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    saveProfile: (profile: profileType | null) => Promise<any>
    savePhoto: (file: File) => void
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile = () => {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userId;
        }
        if(!userId){
            console.error('UserId shuld be in URIparams or in state');
        } else {
            this.props.setUserTC(userId);
            this.props.getUserStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus} saveProfile={this.props.saveProfile}
                     isOwner={!this.props.match.params.userId} savePhoto={this.props.savePhoto}/>
        )
    }
}

///High order Component --- HOC
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state: appStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorized: state.auth.isAuth,
    userId: state.auth.id
});

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default compose<React.ComponentType>(
    connect(mapStateToProps, {setUserTC, getUserStatus, updateUserStatus, saveProfile, savePhoto}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

