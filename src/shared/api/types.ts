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

export enum ViewerRole {
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}
export interface ViewerProfile {
  id: number
  uuid: string
  email: string
  name: string
  imageUrl: string
  roles: Array<ViewerRole>
}
export type ViewerProfileResponse = BaseResponse<ViewerProfile>
