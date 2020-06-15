//DAL --- DATA ACCESS LAYER
import axios from 'axios';
import { userType } from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': '895f8962-9931-4f8b-b064-f830857f90c2'}
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<userType>
    totalCount: number
    error: string | null
}

export type FollowUserType = {
    resultCode: number
    messages: Array<string>
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}