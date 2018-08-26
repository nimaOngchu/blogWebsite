import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { CoreModule } from './core.module';
import { Router } from '../../../node_modules/@angular/router';

@Injectable()
export class AuthService {

  authState: any = null;
  constructor(public afAuth: AngularFireAuth, private route: Router) {
    this.afAuth.authState.subscribe(data => this.authState = data );
  }
  get Authenticated(): boolean {
    return this.authState !== null;
  }

  get CurrentUserId(): string {
    // if Autheticated return this.authState.uid else return null
    return this.Authenticated ? this.authState.uid : null;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.route.navigateByUrl('/');
  }
}
