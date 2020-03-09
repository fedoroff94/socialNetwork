import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Nav from './components/Nav/Nav';
// import ProfileContainer from './components/Profile/ProfileContainer';
import NewsContainer from './components/News/newsContainer';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./components/redux/app-reducer";
import Preloader from "./assets/common/Preloader/Preloader";
import store from "./components/redux/redux-store";
import {withSuspense} from "./HOC/withSuspense";
// import DialogsContainer from './components/Dialogs/DialogsContainer.jsx';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.jsx'));

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>
                <div className='app-wrapper-content'>
                    <Route path='/profile/:userId?' render={() => {
                        return <React.Suspense fallback={<div>Loading...</div>}>
                            <ProfileContainer/>
                        </React.Suspense>
                    }}/>

                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                    <Route path='/news' render={() => <NewsContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;

