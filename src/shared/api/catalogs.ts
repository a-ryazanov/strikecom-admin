import { attach, Effect } from 'effector'

import { HTTPError } from 'ky'
import { makeRequestFx } from './http-client'
import { BaseRequestPayload, CatalogsChecksumResponse, CatalogsResponse } from './types'

export const fetchCatalogsChecksumFx = attach({
  effect: makeRequestFx as Effect<BaseRequestPayload, CatalogsChecksumResponse, HTTPError>,
  mapParams: () => ({
    url: 'references-checksum',
    options: {
      method: 'get',
    },
  }),
})

export const fetchCatalogsFx = attach({
  effect: makeRequestFx as Effect<BaseRequestPayload, CatalogsResponse, HTTPError>,
  mapParams: () => ({
    url: 'references',
    options: {
      method: 'get',
    },
  }),
})
