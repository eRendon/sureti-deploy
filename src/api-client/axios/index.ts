import { apiClient } from './config'
import { ISurePromise } from '@/interfaces/ISurePromise'
import surePromise from '../../utils/surePromise'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { loaderStore } from '../../storage'
import { ILoadingDots } from '@/interfaces/ILoader'

export class AxiosService<T, P> {
  async postData (postData: P, url: string): Promise<ISurePromise<T>> {
    // const stateDots: ILoadingDots = {
    //   spinnerDots: true
    // }
    // loaderStore.actions.loadingOverlay(stateDots).present()
    try {
      return await surePromise(apiClient.post<AxiosResponse>(url, postData))
    } catch (err) {
      // @ts-ignore
      if (err && err.response) {
        const axiosError = err as AxiosError
      } else {

      }
      throw err
    } finally {
      // loaderStore.actions.loadingOverlay(stateDots).dismiss()
    }
  }

  async getData (getData: P, url: string, config?: AxiosRequestConfig): Promise<ISurePromise<T>> {
    // const stateDots: ILoadingDots = {
    //   spinnerDots: true
    // }
    // loaderStore.actions.loadingOverlay(stateDots).present()
    try {
      let dataUrl = ''
      if (getData != undefined) {
        dataUrl = `${url}?${jsonToURLEncoded(getData)}`
      } else {
        dataUrl = url
      }
      return await surePromise(apiClient.get<AxiosResponse>(dataUrl, config))
    } catch (err) {
      // @ts-ignore
      if (err && err.response) {
        const axiosError = err as AxiosError
      } else {

      }
      throw err
    } finally {
      // loaderStore.actions.loadingOverlay(stateDots).dismiss()
    }
  }

  async putData(putData: T, url: string): Promise<ISurePromise<P>> {

    try {
      return surePromise(apiClient.put<AxiosResponse>(url, putData))
    } catch (err) {
      // @ts-ignore
      if (err && err.response) {
        const axiosError = err as AxiosError
      } else {

      }
      throw err
    } finally {

    }
  }
}

const jsonToURLEncoded = (jsonString: any) => {
  return Object.keys(jsonString)
    .map(function (key) {
      return (
        encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key])
      )
    })
    .join('&')
}
