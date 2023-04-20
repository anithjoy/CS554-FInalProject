import {axiosAuth} from './axios'

export const createTicket = (data) => {
    return axiosAuth.post(`/ticket`, data);
}

export const getAllTicket = () => {
    return axiosAuth.get(`/ticket`);
}

export const getTicketById = (id) => {
    return axiosAuth.get(`/ticket/${id}`);
}

export const updateTicket = (id, data) => {
    return axiosAuth.patch(`/ticket/${id}`, data);
}

export const createComment = (id, data) => {
    return axiosAuth.post(`/ticket/${id}/comment`, data);
}

export const getAllComment = (id) => {
    return axiosAuth.get(`/ticket/${id}/comment`);
}

export const deleteCommentById = (ticketId, commentId) => {
    return axiosAuth.get(`/ticket/${ticketId}/comment/${commentId}`);
}