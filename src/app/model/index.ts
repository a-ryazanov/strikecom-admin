import { createEvent, sample } from 'effector'

import { fetchCatalogsChecksumFx } from '../../shared/api'
import { initializeAuthFx } from '../../shared/lib/firebase'

import '../../entitties/catalog/model/index'

export const initializeApp = createEvent()

sample({
  clock: initializeApp,
  target: [fetchCatalogsChecksumFx, initializeAuthFx],
})
