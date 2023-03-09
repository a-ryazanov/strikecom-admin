import { attach, Effect } from 'effector'
import { HTTPError } from 'ky'

import { makeRequestFx } from './http-client'
import { BaseRequestPayload, NewsListResponse } from './types'

export const fetchNewsFx = attach({
  effect: makeRequestFx as Effect<BaseRequestPayload, NewsListResponse, HTTPError>,
  mapParams: () => ({
    url: 'news',
    options: {
      method: 'get',
    },
  }),
})
