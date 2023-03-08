import { createEffect, createEvent, createStore, attach } from 'effector'
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  AuthError,
  User,
  UserCredential,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'

import { EmailAndPassword } from './types'

const app = initializeApp({
  apiKey: 'AIzaSyBqMWYu8ke0r0ONrI3SKR2C2h2Q4N261vc',
  authDomain: 'strikecom-7ad08.firebaseapp.com',
  databaseURL: 'https://strikecom-7ad08.firebaseio.com',
  projectId: 'strikecom-7ad08',
  storageBucket: 'strikecom-7ad08.appspot.com',
  messagingSenderId: '438907362423',
  appId: '1:438907362423:web:748c474db86a8bca',
})

const auth = getAuth(app)

export const authStateChanged = createEvent<User | null>()

const $user = createStore<User | null>(null).on(authStateChanged, (_, user) => user)
const getTokenFx = createEffect((user: User | null) => user?.getIdToken() ?? null)

export const $token = createStore<string | null>(null).on(getTokenFx.doneData, (_, token) => token)

export const refreshTokenFx = attach({
  effect: getTokenFx,
  source: $user,
})

export const initializeAuthFx = createEffect<void, void, AuthError>(() => {
  auth.useDeviceLanguage()

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(
      async (user) => {
        authStateChanged(user)

        await getTokenFx(user)

        resolve()
      },
      (error) => {
        reject(error)
      },
    )
  })
})

export const signInWithEmailAndPasswordFx = createEffect<
  EmailAndPassword,
  UserCredential,
  AuthError
>(({ email, password }) => signInWithEmailAndPassword(auth, email, password))

export const signInWithGoogleFx = createEffect<void, UserCredential, AuthError>(() => {
  const provider = new GoogleAuthProvider()

  return signInWithPopup(auth, provider)
})

export const signOutFx = createEffect<void, void, AuthError>(() => {
  return signOut(auth)
})
