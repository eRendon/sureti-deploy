import {computed, defineComponent, onMounted, ref, watch} from 'vue'
import {loaderStore, userStorage} from '@/storage'
import { IDocumentFile } from '@/interfaces/IOwner'
import {IDocument, IFilterDocument, IGuaranteeDocument, IUserDocument} from '@/interfaces/IFiles'
import { fileRequest, userRequest } from '@/api-client'
import { IInformation } from '@/interfaces/IUser'
import {is} from "@vee-validate/rules";

interface PublicProfile {
    [key: string]: string | undefined,
}

export default defineComponent({
    name: 'PublicProfile',
    setup() {

        const profile = computed(() => userStorage.getters.getStateProfile())
        const publicProfile = ref<PublicProfile>({})
        const documents = ref<IDocument[]>([])

        watch(() => profile.value, (profile) => {
            const {
                // address,
                // birth_date,
                // birth_place,
                // city,
                // contact_cell_phone,
                // country,
                // credit_score,
                first_name,
                gender,
                identification_expedition_date,
                identification_expedition_place,
                identification_number,
                identification_type,
                last_name,
                middle_name
            } : IInformation = profile
            publicProfile.value = {
                // address,
                // birth_date,
                // birth_place,
                // city,
                // contact_cell_phone,
                // country,
                // credit_score,
                first_name,
                gender,
                identification_expedition_date,
                identification_expedition_place,
                identification_number,
                identification_type,
                last_name,
                middle_name
            }
        })

        const files = ref<IDocumentFile[]>([
            {
                doc_type: 'CEDULA VISTA FRONTAL',
                text: 'Cédula vista frontal'
            },
            {
                doc_type: 'CEDULA VISTA TRASERA',
                text: 'Cédula vista trasera'
            }
        ])

        const onSelectDocument = (fileDocument: IDocumentFile, files: File[]): void => {
            fileDocument.file = files[0]
        }

        const uploadDocumentFiles = () => {
            console.log(files)
            if (verifyFilesSchema.value) {
                loaderStore.actions.loadingOverlay({ spinnerDots: true }).present()
                files.value.map(async (file) => {
                    if (file.file) {
                        await uploadDocumentFile(file)
                    }
                    return file
                })

                loaderStore.actions.loadingOverlay().dismiss()
            }
        }

        const uploadDocumentFile = async (document: IDocumentFile) => {
            const { user_id } = profile.value
            const userDocument: IUserDocument = {}
            userDocument.file = document.file
            userDocument.user_id = user_id
            userDocument.doc_type = document.doc_type
            userDocument.file_name = document.file?.name
            userDocument.description = document.text
            const { data, success } = await fileRequest.sendUserDocument(userDocument)
            console.log('response upload dpocument', data)
            if (success) {

            }
        }

        const getDocuments = async () => {
            const filter: IFilterDocument = {
                user_id: profile.value.user_id!
            }
            const { data, success } = await fileRequest.getDocument(filter)
            console.log('getDocuments', data)
            if (success) {
                documents.value = data.filter((document) => {
                    if (document.doc_type === 'CEDULA VISTA FRONTAL' || document.doc_type === 'CEDULA VISTA TRASERA') {
                        return document
                    }
                })
            }
        }

        onMounted(async () => {
            await getDocuments()
        })

        const onUpdatePublicProfile = async () => {
            if (verifySchema.value) {
                const { data, success } = await userRequest.updateInformation(publicProfile.value)
                console.log(data)
                 if (success) {
                     // await uploadDocumentFiles(files.value)
                     await userStorage.actions.getProfile()
                 }
            }
        }

        const verifySchema = computed(() => {
            let isValid = true
            Object.keys(publicProfile.value).map((obj, key) => {
                if (!publicProfile.value[obj]) {
                    isValid = false
                }
                return obj
            })
            return isValid
        })

        const verifyFilesSchema = computed(() => {
            let isValid = false
            files.value.map((file) => {
                if (file.file) {
                    isValid = true
                }
                return file
            })
            return isValid
        })

        return {
            files,
            publicProfile,
            onSelectDocument,
            onUpdatePublicProfile,
            verifySchema,
            verifyFilesSchema,
            uploadDocumentFiles,
            documents
        }
    }
})