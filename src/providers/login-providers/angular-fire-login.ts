import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

@Injectable()
export class AngularFireLoginService {

  constructor(public af: AngularFire) {
    console.log('Hello AngularFireLoginService Provider');
  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.logout();
  }
}

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyCyFf-QpYFGBUrtdHFsy15LZH50lgg68VI",
  authDomain: "ionic2do-17d4d.firebaseapp.com",
  databaseURL: "https://ionic2do-17d4d.firebaseio.com",
  storageBucket: "ionic2do-17d4d.appspot.com",
  messagingSenderId: "791578804923"
};
