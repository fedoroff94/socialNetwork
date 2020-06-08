//DAL --- DATA ACCESS LAYER
import axios, { AxiosResponse } from 'axios';
import { profileType } from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': '895f8962-9931-4f8b-b064-f830857f90c2'}
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`) // & - амперсанд
            .then(response => {
                return response.data
            });
    },
    followUser(userId: number) {
        return instance.post(`follow/` + userId)
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/` + userId)
    },
    getUser(userId: number) {
        return profileAPI.getUser(userId);
    }
}

export const profileAPI = {
    getUser(userId: number) {
        return instance.get(`profile/` + userId)
            .then(response => {
                return response.data;
            })
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    },
    saveProfile(profile: profileType) {
        return instance.put(`profile/`, profile)
    },
    //use formData when put file life photo
    savePhoto(photo: any) {
        let formData = new FormData();
        formData.append('image', photo);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type authMeType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeForCaptcha | ResultCodesEnum
    messages: Array<string>
}

type LogoutType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    authMe() {
        return instance.get<authMeType>(`auth/me/`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginType>(`auth/login/`, {email, password, rememberMe, captcha})
            .then(res => res.data);
    },
    logout() {
        return instance.delete<LogoutType>(`auth/login`)
    }
}

type SecurityType = {}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get(`security/get-captcha-url`)
    }
}