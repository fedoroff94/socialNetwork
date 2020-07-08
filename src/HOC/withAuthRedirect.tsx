import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { appStateType } from "../components/redux/redux-store";

let mapStateToPropsForRedirect = (state: appStateType) => ({
    isAuth: state.auth.isAuth
});

type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType = {}

//HOC
export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props;
        if (!isAuth) return <Redirect to={`/login`}/>;
        return <WrappedComponent {...restProps as unknown as WCP} />;
    }

    let connectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, appStateType>(mapStateToPropsForRedirect)
    (RedirectComponent);

    return connectedAuthRedirectComponent;
}