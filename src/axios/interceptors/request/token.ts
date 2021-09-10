import { AxiosRequestConfig } from "axios";

/**
 * 处理 a 服务的token
 * @param config 请求的axios参数
 * @returns 处理后的请求的axios参数
 */
export function handleAServiceRequestToken(config: AxiosRequestConfig) {
  const token = "a-service-token"; // 这里要根据项目获取真实的token，从vuex或者本地存储中获取
  config.headers["token"] = token;
  return config;
}

/**
 * 处理 b 服务的token
 * @param config 请求的axios参数
 * @returns 处理后的请求的axios参数
 */
export function handleBServiceRequestToken(config: AxiosRequestConfig) {
  const token = "b-service-token"; // 这里要根据项目获取真实的token，从vuex或者本地存储中获取
  config.headers["token"] = token;
  return config;
}
