import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { GmailhttpService } from '../main/gmailhttp/gmailhttp.service';
import { CloudFunction } from '../main/gmailhttp/cloudFunction.service';

declare var window;

@Injectable()
export class AuthService {
  isLoggedIn = false;
  firstLogin = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private router : Router,
    private _http : GmailhttpService,
    private _cf : CloudFunction
  ){}

  logout(): void {
    if(this.firstLogin){
      window.plugins.googleplus.logout( 
        (msg)=> console.log(msg)
      );
    }
    let obj = JSON.parse(window.localStorage.getItem('obj'));
    this._cf.unsubscribe(obj.email,obj.regToken).subscribe(
      ()=> console.log('call success')
    );
    window.localStorage.removeItem('obj');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('historyId');
    this.router.navigate(['/login'],{replaceUrl:true});
  }
}