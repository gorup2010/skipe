import axios, { AxiosError, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import { getAuth } from './auth';

const defaultsConfigs : CreateAxiosDefaults = {
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
}

export const api = axios.create(defaultsConfigs);

const onResponseSuccess = (response: AxiosResponse) => {
  return response.data;
}

const onResponseError = (error: AxiosError) => {
  return Promise.reject(error);
}

const onBeforeRequets = (config: InternalAxiosRequestConfig) => {
  const auth = getAuth();
  if (auth) {
    config.headers.Authorization = `Bearer: ${auth.jwt}`
  }
  return config;
}

api.interceptors.request.use(onBeforeRequets)
api.interceptors.response.use(onResponseSuccess, onResponseError);