import { apiClient } from './config'
import { ISurePromise } from '@/interfaces/ISurePromise'
import surePromise from '../../utils/surePromise'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'


export class AxiosService<T, P> {

  /** ToDo Post Data
   * Post fetch whit axios instance in apiClient
   * @param postData
   * @param url
   * @type P
   * @type string
   * @return Promise<ISurePromise<T>>
   */

  async postData (postData: P, url: string): Promise<ISurePromise<T>> {
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

  /** ToDo Get Data
   * Post fetch whit axios instance in apiClient
   * @param getData
   * @param config
   * @param url
   * @type P
   * @type string
   * @type AxiosRequestConfig?
   * @return Promise<ISurePromise<T>>
   */

  async getData (getData: P, url: string, config?: AxiosRequestConfig): Promise<ISurePromise<T>> {
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

  /** ToDo Put Data
   * Post fetch whit axios instance in apiClient
   * @param putData
   * @param url
   * @type T
   * @type string
   * @return Promise<ISurePromise<P>>
   */

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

/** ToDo JSON Utl Encode Helper
 * Encode params into url to getData
 * @param jsonString
 * @type { [key: string]: number } ? need refactor types
 * @return string
 */

const jsonToURLEncoded = (jsonString: any): string => {
  return Object.keys(jsonString)
    .map(function (key) {
      return (
        encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key])
      )
    })
    .join('&')
}
