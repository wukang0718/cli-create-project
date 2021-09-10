/**
 * 请求拦截器中对错误的处理
 * @param error 请求发送之前的错误
 * @returns 返回一个 rejected 状态的promise
 */
export default function handleRequestError(error: any): Promise<any> {
  return Promise.reject(error);
}
