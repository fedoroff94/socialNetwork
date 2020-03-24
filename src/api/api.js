//DAL --- DATA ACCESS LAYER
import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': '895f8962-9931-4f8b-b064-f830857f90c2'}
})

export const usersAPI = {
    getUsers(currentPage, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`) // & - амперсанд
            .then(response => {
                return response.data
            });
    },
    followUser(userId) {
        return instance.post(`follow/` + userId)
    },
    unfollowUser(userId) {
        return instance.delete(`follow/` + userId)
    },
    getUser(userId) {
        //old version, please use:
        return profileAPI.getUser(userId);
    }
}

export const profileAPI = {
    getUser(userId) {
        return instance.get(`profile/` + userId)
            .then(response => {
                return response.data;
            })
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    saveProfile(profile) {
        return instance.put(`profile/`, profile)
    },
    //use formData when put file life photo
    savePhoto(photo) {
        let formData = new FormData();
        formData.append('image', photo);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const authAPI = {
    authMe() {
        return instance.get(`auth/me/`);
    },
    login(email, password, rememberMe = false, captcha = null) {
        debugger
        return instance.post(`auth/login/`, {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
    getCaptchaURL(){
        return instance.get(`security/get-captcha-url`)
    }
}