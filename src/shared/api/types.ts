import { Options } from 'ky'

declare global {
  interface Window {
    ZBC_API_URL: string
  }
}

export interface BaseRequestPayload {
  url: string
  options: Options
}

interface BaseResponse<T> {
  data: T
  meta: any
}

interface CatalogsChecksum {
  checkSum: number
}
export type CatalogsChecksumResponse = BaseResponse<CatalogsChecksum>

export type Catalogs = Record<string, Array<Record<string, string | number>>>
export type CatalogsResponse = BaseResponse<Catalogs>
