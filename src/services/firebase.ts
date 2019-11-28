import { Store } from 'vuex';
import * as fb from 'firebase/app';
import 'firebase/auth';

import { api } from '@/services/api';

import { SET_USER } from '@/store/modules/auth/mutation-types';


class Firebase {
    app: fb.app.App

    constructor() {
      this.app = fb.initializeApp({
        apiKey: 'AIzaSyBqMWYu8ke0r0ONrI3SKR2C2h2Q4N261vc',
        authDomain: 'strikecom-7ad08.firebaseapp.com',
        databaseURL: 'https://strikecom-7ad08.firebaseio.com',
        projectId: 'strikecom-7ad08',
        storageBucket: 'strikecom-7ad08.appspot.com',
        messagingSenderId: '438907362423',
        appId: '1:438907362423:web:748c474db86a8bca',
      });
    }

    initAuthStateObserver(store: Store<any>): Promise<void> {
      return new Promise((resolve) => {
        this.app.auth().onAuthStateChanged(
          async (user) => {
            if (user) {
              const authToken = await user.getIdToken();

              api.setAuthToken(authToken);

              const { data: userInfo } = await api.fetchUserInfo();

              store.commit(SET_USER, userInfo);
            } else {
              store.commit(SET_USER, null);

              api.setAuthToken(null);
            }

            resolve();
          },
        );
      });
    }

    async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
      try {
        await this.app.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        throw e;
      }
    }

    async signOut(): Promise<void> {
      await this.app.auth().signOut();
    }
}

export const firebase = new Firebase();
