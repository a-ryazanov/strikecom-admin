import { createEvent, sample } from 'effector'
import { signInWithGoogleFx } from '../../../../shared/lib/firebase'

export const signInWithGoogle = createEvent<void>()

sample({
  clock: signInWithGoogle,
  target: signInWithGoogleFx,
})
