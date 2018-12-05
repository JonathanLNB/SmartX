import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {promise} from "selenium-webdriver";
import Promise = promise.Promise;
// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public afAuth: AngularFireAuth) { }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        })
    })
  }
}
