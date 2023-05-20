import axios, { AxiosRequestConfig, Canceler } from 'axios';
import qs from 'qs';

function isFunction(val: unknown) {
  return toString.call(val) === `[object Function]`;
}

let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [
    config.method,
    config.url,
    qs.stringify(config.data),
    qs.stringify(config.params),
  ].join('&');

export class AxiosCanceler {
  /**
   * @description 添加请求
   * @param config
   * @return void
   */
  addPending(config: AxiosRequestConfig): void {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description 移除请求
   * @param config
   */
  removePending(config: AxiosRequestConfig): void {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel();
      pendingMap.delete(url);
    }
  }

  removeAllPending(): void {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
