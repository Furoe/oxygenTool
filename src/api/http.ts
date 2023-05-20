import { ContentTypeEnum, RequestHttpEnum } from '@/enums/httpEnum';
import axiosInstance from './axios';

export const get = (url: string, params?: object) => {
  return axiosInstance({
    url,
    method: RequestHttpEnum.GET,
    params: params,
  });
};

export const post = (url: string, data?: object, headersType?: string) => {
  return axiosInstance({
    url,
    method: RequestHttpEnum.POST,
    data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON,
    },
  });
};

export const patch = (url: string, data?: object, headersType?: string) => {
  return axiosInstance({
    url,
    method: RequestHttpEnum.PATCH,
    data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON,
    },
  });
};

export const put = (url: string, data?: object, headersType?: string) => {
  return axiosInstance({
    url,
    method: RequestHttpEnum.PUT,
    data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON,
    },
  });
};

export const del = (url: string, params?: object) => {
  return axiosInstance({
    url,
    method: RequestHttpEnum.DELETE,
    params,
  });
};
