import { createEvent, sample } from 'effector'
import { signInWithGoogleFx } from '../../../../shared/lib/firebase'

export const signInWithGoogle = createEvent<never>()

sample({
  clock: signInWithGoogle,
  target: signInWithGoogleFx,
})
