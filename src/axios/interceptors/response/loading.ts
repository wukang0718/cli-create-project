import { AxiosResponse } from "axios";
import { hideLoading } from "../../utils/loading";
import { HEADER_NO_LOADING } from "../../utils/constants";

/**
 * 处理响应成功之后关闭loading的拦截器
 * @param result
 * @returns
 */
export default function handleResponseLoading(
  result: AxiosResponse
): AxiosResponse {
  const {
    config: { headers },
  } = result;
  // 如果 headers 中有 "NO-LOADING": true 就不处理loading
  if (!headers[HEADER_NO_LOADING]) {
    hideLoading();
  }
  return result;
}
