import { AxiosError } from "axios";
import { ElMessage } from "element-plus";
import { hideLoading } from "../../utils/loading";
import { HEADER_NO_LOADING } from "@/axios/utils/constants";

/**
 * 处理 axios 实例的响应错误
 * @param error 响应错误消息
 * @returns rejected 状态的promise
 */
export default function handleResponseError(
  error: AxiosError
): Promise<AxiosError> {
  if (!error.config.headers[HEADER_NO_LOADING]) {
    hideLoading();
  }
  // 给服务器上传错误日志
  ElMessage.error(error.message);
  return Promise.reject(error);
}
