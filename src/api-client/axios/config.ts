import axios, { AxiosError } from "axios";
import { authStorage, modalStore } from '@/storage'

const apiClient = axios.create({
  baseURL: 'https://sureti-client-api.oiti.cloud',
  // baseURL: 'http://71516d6a71f2.ngrok.io/proline/web/client',
  headers: {
    'Content-Type': 'application/json'
  }
})

export { apiClient }

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
