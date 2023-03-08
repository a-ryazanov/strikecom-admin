import { attach, Effect } from 'effector'
import { HTTPError } from 'ky'
import { makeRequestFx } from './http-client'
import { BaseRequestPayload, ViewerProfileResponse } from './types'

export const fetchViewerProfileFx = attach({
  effect: makeRequestFx as Effect<BaseRequestPayload, ViewerProfileResponse, HTTPError>,
  mapParams: () => ({
    url: 'me',
    options: {
      method: 'get',
    },
  }),
})
