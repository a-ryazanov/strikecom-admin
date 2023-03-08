import { createStore, createEffect, sample } from 'effector'
import { User } from 'firebase/auth'
import { authStateChanged } from '../../../shared/lib/firebase'

const getTokenFx = createEffect((user: User) => user.getIdToken())

const $viewer = createStore<User | null>(null).on(authStateChanged, (_, payload) => payload)
export const $isAuthorized = $viewer.map((user) => user !== null)
export const $viewerPhoto = $viewer.map((user) => user?.photoURL ?? null)
export const $viewerName = $viewer.map((user) => user?.displayName ?? null)

export const $token = createStore<string | null>(null).on(
  getTokenFx.doneData,
  (_, payload) => payload,
)

sample({
  clock: authStateChanged,
  filter: (user): user is User => user !== null,
  target: getTokenFx,
})
