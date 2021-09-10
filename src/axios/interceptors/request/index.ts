import { AxiosInstance, AxiosRequestConfig } from "axios";
import handleRequestError from "./error";

/**
 * 给axios的实例添加拦截器
 * @param axiosService axios 的实例
 * @param requestInterceptorArray 需要添加在实例上的拦截器 二维数组[[拦截器的onFulfilled, 拦截器的onRejected],[]]
 * @returns 返回传入的axios的实例
 */
export function useBaseRequestInterceptor(
  axiosService: AxiosInstance,
  requestInterceptorArray: [
    (config: AxiosRequestConfig) => AxiosRequestConfig,
    ((error: any) => any) | undefined
  ][]
): AxiosInstance {
  requestInterceptorArray.forEach((interceptor) =>
    axiosService.interceptors.request.use(...interceptor)
  );
  return axiosService;
}

/**
 * 给axios的实例添加拦截器
 * 在所有拦截器之前会添加一个错误拦截器
 * @param axiosService axios 的实例
 * @param requestInterceptorArray 需要添加在实例上的拦截器 一维数组，只处理onFulfilled函数
 * @returns 返回传入的axios的实例
 */
export default function useRequestInterceptor(
  axiosService: AxiosInstance,
  requestInterceptorArray: Array<
    (config: AxiosRequestConfig) => AxiosRequestConfig
  > = []
) {
  const interceptors: [
    (config: AxiosRequestConfig) => AxiosRequestConfig,
    undefined
  ][] = requestInterceptorArray.map((interceptor) => [interceptor, undefined]);

  return useBaseRequestInterceptor(axiosService, [
    [(config: AxiosRequestConfig) => config, handleRequestError],
    ...interceptors,
  ]);
}
