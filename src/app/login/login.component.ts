import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { GmailhttpService } from '../main/gmailhttp/gmailhttp.service';
import { UserInfoService } from '../services/user-info.service';
import { AuthService } from '../services/auth.service';

declare var window;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  CLIENT_ID : string ='MY_CLIENT_ID';
  SCOPES    : string = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/pubsub';

  constructor(
    public authService: AuthService,
    private router : Router,
    private _user : UserInfoService,
    private _http : GmailhttpService
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
        window.FirebasePlugin.getToken(token =>{
          obj['regToken']=token;
          // Get user's refresh token
          this._http.getRefreshToken(obj.serverAuthCode).subscribe(
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
              this._http.addData(obj.email,token,obj.refreshToken).subscribe();
            },
            err=>console.log(err)
          );
          // save this server-side and use it to push notifications to this device
          window.localStorage.setItem('obj',JSON.stringify(obj));
          this._user.sendUserInfo(obj);
          this.authService.firstLogin = true;
          this.authService.isLoggedIn = true;
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/main/table';
    
          // Redirect the user
          this.router.navigate([redirect],{skipLocationChange:true});
        }, function(error) {
            console.error(error);
        });
        // USer is signing in to the app for the first time
        // if (!firebase.auth().currentUser) {
        //   // Set auth persistance to LOCAL so that the user remain login after closing the app
        //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(
        //     ()=>{
        //       firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj.idToken)).then((success) => 
        //       {
        //         // Get user's regToken
        //         window.FirebasePlugin.getToken(token =>{
        //           // Get user's refresh token
        //           this._http.getRefreshToken(obj.serverAuthCode).subscribe(
        //             // Save the tokens to firebase database
        //             tokenObj=>{
        //               let refreshToken : string ;
        //               let accessToken : string ;
        //               for(let key in tokenObj){
        //                 if(key === 'refresh_token'){
        //                   refreshToken = tokenObj[key];
        //                 }
        //                 if(key === 'access_token'){
        //                   accessToken = tokenObj[key];
        //                 }
        //               }
        //               console.log(refreshToken);
        //               this._http.addData(obj.email,token,accessToken,refreshToken).subscribe(
        //                 ()=> console.log('call success!')
        //               );
        //             },
        //             err=>console.log(err)
        //           );
        //           // save this server-side and use it to push notifications to this device
        //           this._user.sendUserInfo(obj);
        //           this.authService.isLoggedIn = true;
        //           // Get the redirect URL from our auth service
        //           // If no redirect has been set, use the default
        //           let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/main/table';
            
        //           // Redirect the user
        //           this.router.navigate([redirect]);
        //         }, function(error) {
        //             console.error(error);
        //         });
        //       })
        //       .catch(err => console.log(err));
        //     });
        // }
      },
      err => {
      }
    );
  }
 
  logout() {
    this.authService.logout();
  }
}