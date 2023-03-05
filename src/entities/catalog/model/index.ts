import { createStore, sample } from 'effector'

import { Catalogs, fetchCatalogsChecksumFx, fetchCatalogsFx } from '../../../shared/api'
import { getFromLocalStorage, setToLocalStorage } from '../../../shared/lib/local-storage'

import { CATALOGS_CHECKSUM_LS_KEY } from '../lib'

const $referencesChecksum = createStore<number | null>(
  getFromLocalStorage(CATALOGS_CHECKSUM_LS_KEY),
)

export const $catalogs = createStore(
  getFromLocalStorage<Catalogs | null>(CATALOGS_CHECKSUM_LS_KEY),
).on(fetchCatalogsFx.doneData, (_, payload) => payload.data)

sample({
  clock: fetchCatalogsChecksumFx.doneData,
  source: $referencesChecksum,
  filter: (source, payload) => source !== payload.data.checkSum,
  fn: (source, payload) => payload.data.checkSum,
  target: [$referencesChecksum, fetchCatalogsFx],
})

$referencesChecksum.updates.watch((value) => setToLocalStorage(CATALOGS_CHECKSUM_LS_KEY, value))
