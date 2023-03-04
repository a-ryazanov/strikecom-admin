import { attach, Effect } from 'effector'
import { HTTPError } from 'ky'
import { makeRequestFx } from './http-client'
import { BaseRequestPayload, CatalogsChecksumResponse } from './types'

export const fetchViewerProfileFx = attach({
  effect: makeRequestFx as Effect<BaseRequestPayload, CatalogsChecksumResponse, HTTPError>,
  mapParams: () => ({
    url: 'me',
    options: {
      method: 'get',
    },
  }),
})
