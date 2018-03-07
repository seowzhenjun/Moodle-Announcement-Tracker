import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class oAuth2Service { 

    clientID = "115491863039-5pg6f5sdgeg696rh8fq85golnk53lm92.apps.googleusercontent.com";
    clientSecret = "NSruyviJurAinT3fxdYztTYu";

    constructor(private http: HttpClient) { }
    
    getRefreshToken(serverAuthCode){
        const url = 'https://www.googleapis.com/oauth2/v4/token';
        const redirectURI = 'http://localhost:8000';
        const grantType = 'authorization_code';
        const headerDict = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
    
        let body = `code=${serverAuthCode}&client_id=${this.clientID}&client_secret=${this.clientSecret}&grant_type=${grantType}&redirect_uri=${redirectURI}`;
        const requestOptions = {
          headers : new HttpHeaders (headerDict)
        };
        
        return this.http.post(url,body.toString(), requestOptions);
    }

    getAccessToken(refreshToken){
    const url = 'https://www.googleapis.com/oauth2/v4/token';
    const grantType = 'refresh_token';
    const headerDict = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    let body = `client_id=${this.clientID}&client_secret=${this.clientSecret}&refresh_token=${refreshToken}&grant_type=${grantType}`;
    const requestOptions = {
        headers : new HttpHeaders (headerDict)
    };

    return this.http.post(url,body,requestOptions);
    }
      
}