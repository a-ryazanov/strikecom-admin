import { createEvent, createStore, sample } from 'effector'
import { combineEvents } from 'patronum'

import { fetchCatalogsChecksumFx } from '../../shared/api'
import { initializeAuthFx } from '../../shared/lib/firebase'

const appInitialized = combineEvents({
  events: [fetchCatalogsChecksumFx.done, initializeAuthFx.done],
})

export const initializeApp = createEvent()
export const $isAppInitialized = createStore(false).on(appInitialized, () => true)

sample({
  clock: initializeApp,
  target: [fetchCatalogsChecksumFx, initializeAuthFx],
})
