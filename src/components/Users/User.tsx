import React from 'react';
import '../../App.css';
import photo from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import classes from './Users.module.css';
import { userType } from "../../types/types";

type PropsType = {
    user: userType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return <div className={classes.main}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                <img className='pic' src={user.photos.small != null ? user.photos.small : photo}/>
                            </NavLink>
                        </div>

                        <span>
                            <div className={classes.userName}>{user.name}</div>
                            <div>{user.status}</div>
                        </span>

                        <div>
                            {user.followed
                                ? <button className={classes.userButton}
                                          disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              unfollow(user.id);
                                          }}>Unfollow</button>

                                : <button className={classes.userButton}
                                          disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              follow(user.id);
                                          }}>Follow</button>}
                        </div>
                    </span>
    </div>
}

export default User;