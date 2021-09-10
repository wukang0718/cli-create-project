import { ElLoading, ILoadingInstance } from "element-plus";

let loadingCount = 0;
let loading: ILoadingInstance | null = null;

/**
 * 500ms 之后展示loading
 */
export function showLoading(): NodeJS.Timeout {
  loadingCount++;
  return setTimeout(() => {
    if (!loading && loadingCount) {
      loading = ElLoading.service();
    }
  }, 500);
}

/**
 * 如果没有loading中的接口，就关闭loading
 */
export function hideLoading() {
  loadingCount--;
  if (loadingCount === 0 && loading) {
    loading.close();
    loading = null;
  }
}
