import React from 'react';
import './Header.css'
import Header, { DispatchPropsType, MapPropsType } from './Header';
import { connect } from 'react-redux';
import {logout} from '../redux/auth-reducer';
import { appStateType } from "../redux/redux-store";

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: appStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<MapPropsType, DispatchPropsType, {}, appStateType>(mapStateToProps, {logout})(HeaderContainer);