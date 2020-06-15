import { APIResponseType, GetItemsType, instance } from "./api";

export const usersAPI = {
    getUsers(currentPage: number, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`) // & - амперсанд
            .then(res => {return res.data});
    },
    followUser(userId: number) {
        return instance.post<APIResponseType>(`follow/` + userId).then(res => res.data)
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/` + userId).then(res => res.data) as Promise<APIResponseType>
    }
}