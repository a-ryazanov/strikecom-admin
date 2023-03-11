import { attach, Effect } from 'effector'
import { HTTPError } from 'ky'

import { formatToSearchParams } from '../lib/url'

import { makeRequestFx } from './http-client'
import { BaseRequestPayload, NewsListResponse, NewsRequestParams } from './types'

type FetchNewsFx = Effect<BaseRequestPayload, NewsListResponse, HTTPError>

export const fetchNewsFx = attach<NewsRequestParams, FetchNewsFx>({
  effect: makeRequestFx as FetchNewsFx,
  mapParams: (params) => ({
    url: 'news',
    options: {
      method: 'get',
      searchParams: formatToSearchParams(params),
    },
  }),
})
