import React from 'react';
import './Header.css'
import {NavLink} from 'react-router-dom';
import pic from '../../assets/images/0.png';

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export type DispatchPropsType = {
    logout: () => void
}


const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return (
        <header className='header'>
            <img src={pic} alt='logo' className='logo'/>
            <div className='login-block'>
                {props.isAuth
                    ? <div> {props.login} - <button onClick={props.logout}>Logout</button></div>
                    : <NavLink to='/login/'>Login</NavLink>}
            </div>
        </header>);
}

export default Header;