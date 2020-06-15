import { APIResponseType, instance } from "./api";

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(res => res.data)
    }
}