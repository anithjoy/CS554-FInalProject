import {axiosAuth} from './axios'

export const post = (data) => {
    return axiosAuth.post(`/company`, data)
}