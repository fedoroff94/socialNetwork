import React, { FC } from 'react';
import '../../App.css';
import Paginator from "../../assets/common/Paginator/Paginator";
import User from "./User";
import { userType } from "../../types/types";

type propsType = {
    currentPage: number
    totalItemsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    users: Array<userType>
    portionSize: number
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: FC<propsType> = ({
                                  currentPage, totalItemsCount,
                                  pageSize, onPageChanged, users, portionSize,
                                  ...props
                              }) => {
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