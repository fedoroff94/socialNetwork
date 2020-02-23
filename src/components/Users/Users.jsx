import React from 'react';
import '../../App.css';
import photo from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';


class Users extends React.Component {

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return <div>

            <div className='pointer'>
                {pages.map(p => {
                    return <span className={this.props.currentPage === p && 'selectedPage'}
                        onClick={() => { this.props.onPageChanged(p) }}>{p}</span>
                })}
            </div>
            {
                this.props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img className='pic' src={u.photos.small != null ? u.photos.small : photo} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={this.props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    this.props.unfollow(u.id);
                                }}>Unfollow</button>

                                : <button disabled={this.props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                  this.props.follow(u.id);
                                }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    }

}

export default Users;