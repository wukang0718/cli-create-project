import axios from "axios";
import useRequestInterceptor from "./interceptors/request";
import useResponseInterceptor from "./interceptors/response";
import {
  handleAServiceRequestToken,
  handleBServiceRequestToken,
} from "./interceptors/request/token";
import handleResponseFilter from "./interceptors/response/filterResponse";
import handleRequestLoading from "./interceptors/request/loading";
import handleResponseLoading from "./interceptors/response/loading";

axios.defaults.timeout = 60 * 1000; // 设置超时时间是1分钟

/**
 * 给a服务器发送请求的axios实例
 */
export const aService = useRequestInterceptor(
  useResponseInterceptor(
    axios.create({
      baseURL: "/aServer",
    }),
    [handleResponseLoading, handleResponseFilter]
  ),
  [handleAServiceRequestToken, handleRequestLoading]
);

/**
 * 给b服务器发送请求的axios实例
 */
export const bService = useRequestInterceptor(
  useResponseInterceptor(
    axios.create({
      baseURL: "/bServer",
    }),
    [handleResponseLoading, handleResponseFilter]
  ),
  [handleBServiceRequestToken, handleRequestLoading]
);

export default axios;
