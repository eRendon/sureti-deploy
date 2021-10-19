export interface IOwner {
    owner_first_name: string
    owner_middle_name: string
    owner_last_name: string
    owner_identification_type: string
    owner_identification_number: string
    owner_identification_expedition_place: string
    owner_identification_issue_date: Date
    owner_gender: string
    filesProperty?: IDocumentFile[]
}

export interface IDocumentFile {
    file?: File
    doc_type: string
    text: string
}
