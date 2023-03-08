import { createStore, sample } from 'effector'

import { ViewerProfile, fetchViewerProfileFx } from '../../../shared/api'
import { initializeAuthFx } from '../../../shared/lib/firebase'

const $profile = createStore<ViewerProfile | null>(null).on(
  fetchViewerProfileFx.doneData,
  (_, profile) => profile.data,
)

export const $isAuthorized = $profile.map((profile) => profile !== null)
export const $viewerPhoto = $profile.map((profile) => profile?.imageUrl ?? null)
export const $viewerName = $profile.map((profile) => profile?.name ?? null)

sample({
  clock: initializeAuthFx.done,
  target: fetchViewerProfileFx,
})
