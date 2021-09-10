import { AxiosRequestConfig } from "axios";
import { showLoading } from "../../utils/loading";
import { HEADER_NO_LOADING } from "../../utils/constants";

/**
 * 处理 请求时展示 loading 的拦截器
 * @param config
 * @returns
 */
export default function handleRequestLoading(
  config: AxiosRequestConfig
): AxiosRequestConfig {
  const { headers } = config;
  // 如果 headers 中有 "NO-LOADING": true 就不展示loading
  if (!headers[HEADER_NO_LOADING]) {
    showLoading();
  }
  return config;
}
