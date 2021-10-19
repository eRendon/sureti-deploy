import { ISurePromise } from '@/interfaces/ISurePromise'
import { AxiosResponse } from 'axios'

const surePromise = <T> (promise: Promise<AxiosResponse>): Promise<ISurePromise<T>> => (
    promise
        .then((result) => {
            const { data, status, request } = result
            return {
                success: true,
                data: data.data,
                status,
                blob: request.responseType === 'blob' ? data : null,
                header: data.header
            }
        })
        .catch(error => {
            if (!!error.isAxiosError && !error.response) {
                throw error
            } else {
                const { data, status } = error.response
                return Promise.resolve({ success: false, data: data.data, status, header: data.header })
            }

        })
)

export default surePromise
