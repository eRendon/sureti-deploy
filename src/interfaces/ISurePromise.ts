export interface ISurePromise <T> {
  success: boolean
  data: T
  status: number
  header: Header
  blob?: Blob
}

interface Header {
  status: number
  message: string
}
