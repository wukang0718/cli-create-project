import { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import handleResponseError from "./error";

/**
 * 给axios的实例添加拦截器
 * @param axiosService axios 的实例
 * @param responseInterceptorArray 需要添加在实例上的拦截器 二维数组[[拦截器的onFulfilled, 拦截器的onRejected],[]]
 * @returns 返回传入的axios的实例
 */
export function useBaseResponseInterceptor(
  axiosService: AxiosInstance,
  responseInterceptorArray: [
    (result: AxiosResponse) => any,
    ((error: AxiosError) => any) | undefined
  ][]
): AxiosInstance {
  responseInterceptorArray.forEach((interceptor) =>
    axiosService.interceptors.response.use(...interceptor)
  );
  return axiosService;
}

/**
 * 给axios的实例添加拦截器
 * 在所有拦截器之前会添加一个错误拦截器
 * @param axiosService axios 的实例
 * @param responseInterceptorArray 需要添加在实例上的拦截器 一维数组，只处理onFulfilled函数
 * @returns 返回传入的axios的实例
 */
export default function useResponseInterceptor(
  axiosService: AxiosInstance,
  responseInterceptorArray: Array<(result: AxiosResponse) => any> = []
) {
  const interceptors: [(result: AxiosResponse) => any, undefined][] =
    responseInterceptorArray.map((interceptor) => [interceptor, undefined]);

  return useBaseResponseInterceptor(axiosService, [
    ...interceptors,
    [(res: AxiosResponse) => res, handleResponseError],
  ]);
}
