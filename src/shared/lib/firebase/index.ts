import { createEffect } from 'effector'
import {
  getAuth,
  signInWithEmailAndPassword as signInWithEmail,
  signInWithPopup,
  GoogleAuthProvider,
  AuthError,
  UserCredential,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'

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
auth.useDeviceLanguage()

interface EmailAndPassword {
  email: string
  password: string
}
export const signInWithEmailAndPasswordFx = createEffect<
  EmailAndPassword,
  UserCredential,
  AuthError
>(({ email, password }: EmailAndPassword) => signInWithEmail(auth, email, password))

export const signInWithGoogleFx = createEffect<never, UserCredential, AuthError>(() => {
  const provider = new GoogleAuthProvider()

  return signInWithPopup(auth, provider)
})
