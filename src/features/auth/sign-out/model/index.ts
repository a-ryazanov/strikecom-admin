import { createEvent, sample } from 'effector'

import { signOutFx } from '../../../../shared/lib/firebase'

export const signOut = createEvent<void>()
export const $isSignOutProcessing = signOutFx.pending

sample({
  clock: signOut,
  target: signOutFx,
})
