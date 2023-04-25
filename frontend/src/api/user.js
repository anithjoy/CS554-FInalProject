import {axiosAuth} from './axios'

export const createUser = (id, data) => {
    return axiosAuth.post(`/user`, data);
}

export const getAllUser = (id) => {
    return axiosAuth.get(`/user`);
}

export const getUserInfo = (id) => {
    return axiosAuth.get(`/user/${id}`);
}

export const updateUser = (id, data) => {
    return axiosAuth.patch(`/user/${id}`, data);
}