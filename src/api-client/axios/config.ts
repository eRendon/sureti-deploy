import axios, {AxiosError, AxiosInstance} from "axios";
import { authStorage, modalStore } from '@/storage'

/** ToDo Config Axios
 * Const to create instance and config
 * @const { apiClient }
 * @type AxiosInstance
 */

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://sureti-client-api.oiti.cloud',
  // baseURL: 'http://71516d6a71f2.ngrok.io/proline/web/client',
  headers: {
    'Content-Type': 'application/json'
  }
})

export { apiClient }

/** ToDo Interceptor request
 * Interceptor to see the progress to upload fetch and download fetch, add more function in this interceptor
 */

apiClient.interceptors.request.use((config) => {
  let progressEvent;
  config.onUploadProgress = function (progressEvent: any) {
    // Do whatever you want with the native progress event
  }
  config.onDownloadProgress = function (progressEvent) {
    // Do whatever you want with the native progress event
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/** ToDo Interceptor Response
 * Interceptor to validate user session, add more function in this interceptor
 */

apiClient.interceptors.response.use((response) => {
  return response
}, async (error) => {
  if (error && error.response) {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 401) {
      modalStore.actions.alert({ text: 'Su sesión ha expirado', show: true})
      await authStorage.actions.logOut()
    }
  }
  return Promise.reject(error);
})
