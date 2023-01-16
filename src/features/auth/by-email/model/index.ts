import { createEvent, createStore, sample } from 'effector'

import { signInWithEmailAndPasswordFx } from '../../../../shared/lib/firebase'

import { errorMessagesMap } from '../lib/error-messages-map'

import { FormValues } from './types'

export const submitForm = createEvent<FormValues>()

export const $errorMessage = createStore<string | null>(null)
  .on(signInWithEmailAndPasswordFx.failData, (_, error) => errorMessagesMap[error.code])
  .reset(submitForm)

export const $isLoading = signInWithEmailAndPasswordFx.pending

sample({
  clock: submitForm,
  target: signInWithEmailAndPasswordFx,
})
