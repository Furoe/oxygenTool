import { message } from 'antd';
import { ResultEnum } from '@/enums/httpEnum';
import { ResultData } from '@/types/http.d';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { AxiosCanceler } from './AxiosCanceler';

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_DEV_PATH
    : import.meta.env.VITE_PROD_PATH,
  timeout: ResultEnum.TIMEOUT,
  withCredentials: true,
});

const axiosCanceler = new AxiosCanceler();

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    axiosCanceler.addPending(config);
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default axiosInstance;
