import {axiosAuth} from './axios'

export const createState = (data) => {
    return axiosAuth.get(`/state`, data);
}

export const getAllState = () => {
    return axiosAuth.get(`/state`);
}

export const getStateById = (id) => {
    return axiosAuth.get(`/state/${id}`);
}

export const updateState = (id, data) => {
    return axiosAuth.patch(`/state/${id}`, data);
}