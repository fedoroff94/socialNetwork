import React from 'react';
import './Header.css'
import {NavLink} from 'react-router-dom';
import pic from '../../assets/images/it-inc.png';

const Header = (props) => {
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