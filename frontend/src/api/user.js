import {axiosAuth} from './axios'

export const createUser = (data) => {
    return axiosAuth.post(`/user`, data);
}

export const getAllUser = () => {
    return axiosAuth.get(`/user`);
}

export const getUserInfo = (id) => {
    return axiosAuth.get(`/user/${id}`);
}

export const updateUser = (id, data) => {
    return axiosAuth.patch(`/user/${id}`, data);
}