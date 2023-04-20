import {axiosAuth} from './axios'

export const createProject = (data) => {
    return axiosAuth.post(`/project`, data);
}

export const getAllProject = () => {
    return axiosAuth.get(`/project`);
}

export const getProjectById = (id) => {
    return axiosAuth.get(`/project/${id}`);
}

export const updateProject = (id, data) => {
    return axiosAuth.patch(`/project/${id}`, data);
}

export const getAllTicketByProjectId = (id) => {
    return axiosAuth.get(`/project/${id}/ticket`);
}

export const createSprint = (id, data) => {
    return axiosAuth.post(`/project/${id}/sprint`, data);
}

export const getAllSprint = (id) => {
    return axiosAuth.get(`/project/${id}/sprint`);
}

export const getSprintById = (projectId, sprintId) => {
    return axiosAuth.get(`/project/${projectId}/sprint/${sprintId}`);
}

export const updateSprint = (projectId, sprintId, data) => {
    return axiosAuth.patch(`/project/${projectId}/sprint/${sprintId}`, data);
}