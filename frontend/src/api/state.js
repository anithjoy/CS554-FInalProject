import { axiosNoAuth, axiosAuth } from "./axios";

export const createState = (data, companyId) => {
  return axiosNoAuth.post(`/state?companyId=${companyId}`, data);
};

export const getAllState = (companyId) => {
  return axiosNoAuth.get(`/state?companyId=${companyId}`);
};

export const getStateById = (id) => {
  return axiosNoAuth.get(`/state/${id}`);
};

export const updateState = (id, data, companyId) => {
  return axiosNoAuth.patch(`/state/${id}?companyId=${companyId}`, data);
};
