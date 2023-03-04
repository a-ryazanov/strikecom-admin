import { createEffect } from 'effector'
import ky, { HTTPError } from 'ky'
import { BaseRequestPayload } from './types'

const httpClient = ky.create({
  prefixUrl: `${window.ZBC_API_URL}/all`,
  headers: { Accept: 'application/json' },
})

export const makeRequestFx = createEffect<BaseRequestPayload, unknown, HTTPError>(
  ({ url, options }) => httpClient(url, options).then((response) => response.json()),
)
