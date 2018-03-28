import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { GmailhttpService } from '../main/gmailhttp/gmailhttp.service';
import { CloudFunction } from '../main/gmailhttp/cloudFunction.service';
import { oAuth2Service } from '../main/gmailhttp/oAuth2.service';

import { UserInfoService } from '../services/user-info.service';
import { AuthService } from '../services/auth.service';
import { SetKeywords } from '../services/setKeywords.service';

declare var window;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  CLIENT_ID : string = '115491863039-5pg6f5sdgeg696rh8fq85golnk53lm92.apps.googleusercontent.com';
  SCOPES    : string = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify';

  constructor(
    public authService: AuthService,
    private router    : Router,
    private _user     : UserInfoService,
    private _http     : GmailhttpService,
    private _cf       : CloudFunction,
    private _oauth2   : oAuth2Service,
    private _db       : SetKeywords
  ) {}

  ngOnInit(){}

  login() {
    window.plugins.googleplus.login(
      {
          'scopes'      : this.SCOPES,
          'webClientId' : this.CLIENT_ID,
          'offline'     : true
      },
      obj => {
        // Get user's regToken
        window.FirebasePlugin.onTokenRefresh(token =>{
          obj['regToken']=token;
          // Get user's refresh token
          this._oauth2.getRefreshToken(obj.serverAuthCode).subscribe(
            // Save the tokens to firebase database
            tokenObj=>{
              let refreshToken : string ;
              let accessToken : string ;
              for(let key in tokenObj){
                if(key === 'refresh_token'){
                  obj['refreshToken']=tokenObj[key];
                }
                if(key === 'access_token'){
                  obj['accessToken']=tokenObj[key];
                }
              }
              this._cf.addData(obj.email,token,obj.refreshToken).subscribe();
            },
            err=>console.log(err)
          );
          // save this server-side and use it for push notifications to this device
          window.localStorage.setItem('obj',JSON.stringify(obj));
          this._db.setupDb();
          this.authService.firstLogin = true;
          this.authService.isLoggedIn = true;
          
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/main/table';
          this.router.navigate([redirect],{replaceUrl:true});
        }, function(error) {
            console.error(error);
        });
      },
      err => {
      }
    );
  }
}