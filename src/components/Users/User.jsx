import React from 'react';
import '../../App.css';
import photo from '../../assets/images/user.png';
import {NavLink} from 'react-router-dom';

const User = ({user, followingInProgress, unfollow, follow}) => {
    return <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                <img className='pic' src={user.photos.small != null ? user.photos.small : photo}/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              unfollow(user.id);
                                          }}>Unfollow</button>

                                : <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              follow(user.id);
                                          }}>Follow</button>}
                        </div>
                    </span>
        <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                    </span>
    </div>
}

export default User;