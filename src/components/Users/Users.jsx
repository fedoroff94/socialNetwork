import React from 'react';
import '../../App.css';
import Paginator from "../../assets/common/Paginator/Paginator";
import User from "./User";

const Users = ({currentPage, totalItemsCount, pageSize, onPageChanged, users, portionSize, ...props}) => {
    return <div>
        <Paginator totalItemsCount={totalItemsCount} pageSize={pageSize}
                   currentPage={currentPage} onPageChanged={onPageChanged} portionSize={portionSize}/>
        <div>
            {
                users.map(u => <User user={u}
                                     key={u.id}
                                     followingInProgress={props.followingInProgress}
                                     follow={props.follow}
                                     unfollow={props.unfollow}/>
                )
            }
        </div>
    </div>
}

export default Users;