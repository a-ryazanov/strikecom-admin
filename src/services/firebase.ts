import { Store } from 'vuex'
import * as fb from 'firebase/app'
import 'firebase/auth'

// eslint-disable-next-line import/no-cycle
import { api } from '@/services/api'

import { SET_USER } from '@/store/modules/auth/mutation-types'


class Firebase {
    app : fb.app.App

    user : fb.User | null = null

    constructor() {
        this.app = fb.initializeApp({
            apiKey: 'AIzaSyBqMWYu8ke0r0ONrI3SKR2C2h2Q4N261vc',
            authDomain: 'strikecom-7ad08.firebaseapp.com',
            databaseURL: 'https://strikecom-7ad08.firebaseio.com',
            projectId: 'strikecom-7ad08',
            storageBucket: 'strikecom-7ad08.appspot.com',
            messagingSenderId: '438907362423',
            appId: '1:438907362423:web:748c474db86a8bca',
        })

        fb.auth().useDeviceLanguage()
    }

    initAuthStateObserver(store : Store<any>) : Promise<void> {
        return new Promise((resolve) => {
            this.app.auth().onAuthStateChanged(
                async (user) => {
                    this.user = user
                    let userInfo = null

                    await this.updateFirebaseIdToken()

                    if (user) {
                        userInfo = (await api.fetchUserInfo()).data
                    }

                    store.commit(SET_USER, userInfo)

                    resolve()
                },
            )
        })
    }

    async signInWithEmailAndPassword(email : string, password : string) : Promise<void> {
        await this.app.auth().signInWithEmailAndPassword(email, password)
    }

    async signInWithGoogle() : Promise<void> {
        const provider = new fb.auth.GoogleAuthProvider()

        await this.app.auth().signInWithPopup(provider)
    }

    async signOut() : Promise<void> {
        await this.app.auth().signOut()
    }

    async updateFirebaseIdToken() : Promise<void> {
        let authToken = null

        if (this.user) {
            authToken = await this.user.getIdToken()
        }

        api.setAuthToken(authToken)
    }
}

export const firebase = new Firebase()
