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

interface BaseResponse<D, M = unknown> {
  data: D
  meta?: M
}

export interface ListResponseMeta {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
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

export interface News {
  id: number
  title: string
  content: string
  createdAt: number
  date: number
  sourceLink: string
  published: boolean
  photoUrls: Array<string>
  tags: Array<string>
  views: number
}

export type NewsListResponse = BaseResponse<Array<News>, ListResponseMeta>
