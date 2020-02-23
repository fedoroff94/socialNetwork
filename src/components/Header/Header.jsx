import React from 'react';
import './Header.css'
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className='header'>
            <img src='https://www.logogenie.net/download/preview/medium/3589659' alt='logo' />
            <div className='login-block'>
                {props.isAuth
                    ? <div> {props.login} - <button onClick={props.logout}>Logout</button> </div>
                    : <NavLink to='/login/'>Login</NavLink>}
            </div>
        </header>);
}

export default Header;