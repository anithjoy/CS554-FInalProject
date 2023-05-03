import {axiosAuth} from './axios'

export const createUser = (data) => {
    return axiosAuth.post(`/user`, data);
}

export const getAllUser = () => {
    return axiosAuth.get(`/user`);
}

export const getUserById = (id) => {
    return axiosAuth.get(`/user/${id}`);
}

export const getUserInfo = () => {
    return axiosAuth.get(`/user/info`);
}

export const updateUser = (id, data) => {
    return axiosAuth.patch(`/user/${id}`, data);
}