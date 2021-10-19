import { ISurePromise } from '@/interfaces/ISurePromise';
import { AxiosService } from '../axios';
import { IDocument, IFilterDocument, IGuaranteeDocument, IPaymentDocument, IUserDocument } from '@/interfaces/IFiles';
import { Blob } from 'buffer'
import { ILoadingDots } from '@/interfaces/ILoader'
import { loaderStore } from '@/storage'

export default class File {

    public async sendUserDocument (userDocument: IUserDocument): Promise<ISurePromise<any>> {
        const axiosService = new AxiosService()
        const formData = appendForm(userDocument)
        return await axiosService.postData(formData, '/user/document')
    }

    public async sendGuaranteeDocument (guaranteeDocument: IGuaranteeDocument): Promise<ISurePromise<any>> {
        const axiosService = new AxiosService()
        const formData = appendForm(guaranteeDocument)
        formData.append('guarantee_id', guaranteeDocument.guarantee_id!)
        return await axiosService.postData(formData, '/user/guarantee/document')
    }

    public async sendPaymentDocument (paymentDocument: IPaymentDocument): Promise<ISurePromise<any>> {
        const axiosService = new AxiosService()
        const formData = appendForm(paymentDocument)
        formData.append('payment_id', paymentDocument.payment_id)
        return await axiosService.postData(formData, '/user/payment/document')
    }

    async getDocument (filter: IFilterDocument): Promise<ISurePromise<IDocument[]>> {
        const axiosService: AxiosService<IDocument[], IFilterDocument> = new AxiosService()
        try {
            return await axiosService.getData(filter, '/user/documents')
        } catch (e) {
            throw e
        } finally {

        }
    }

    async downloadPhoto (user_id: string, document_id: string): Promise<ISurePromise<Blob>> {
        const stateDots: ILoadingDots = {
            spinnerDots: true
        }
        loaderStore.actions.loadingOverlay(stateDots).present()
        const axiosService: AxiosService<Blob, null> = new AxiosService()

        try {
            return await axiosService.getData(null, `/user/document/download/${user_id}/${document_id}`, {
                responseType: 'blob',
                headers: { 'Content-Type': 'application/octet-stream' }
            })
        } catch (e) {
            throw e
        } finally {
          loaderStore.actions.loadingOverlay().dismiss()
        }
    }

}


function appendForm (objectData: IUserDocument): FormData {
    const formData = new FormData()
    formData.append('user_id', objectData.user_id!)
    formData.append('file', objectData.file!)
    formData.append('doc_type', objectData.doc_type!)
    formData.append('file_name', objectData.file_name!)
    formData.append('description', objectData.description!)
    return formData
}
