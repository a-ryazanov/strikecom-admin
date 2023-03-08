import mergeDeep from '@tinkoff/utils/object/mergeDeep'
import { createEffect, attach, sample } from 'effector'
import ky, { HTTPError } from 'ky'

import { $token, refreshTokenFx } from '../lib/firebase'
import { showErrorMessageFx } from '../ui/notifications'

import { BaseRequestPayload } from './types'

const httpClient = ky.create({
  prefixUrl: `${window.ZBC_API_URL}/all`,
  headers: { Accept: 'application/json' },
  retry: {
    statusCodes: [401, 408, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRetry: [
      async ({ request }) => {
        const token = await refreshTokenFx()

        if (token === null) {
          return ky.stop
        }

        request.headers.set('Authorization', `Bearer ${token}`)
      },
    ],
  },
})

const rawRequestFx = createEffect<BaseRequestPayload, unknown, HTTPError>(({ url, options }) =>
  httpClient(url, options).then((response) => response.json()),
)

export const makeRequestFx = attach({
  effect: rawRequestFx,
  source: $token,
  mapParams: (params: BaseRequestPayload, token) =>
    token !== null
      ? mergeDeep(params, { options: { headers: { Authorization: `Bearer ${token}` } } })
      : params,
})

sample({
  clock: makeRequestFx.failData,
  filter: (error) => error.response.status === 403,
  fn: (error) => ({ text: `Отказано в доступе: ${error.request.url}` }),
  target: showErrorMessageFx,
})
