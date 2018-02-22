import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class GmailhttpService {

  clientID = "MY_CLIENT_ID";
  clientSecret = "MY_SECRET";

  constructor(private http: HttpClient) { }

  listMsg(email,accessToken,nextPageToken? : string){
    const maxResults = '15';
    const labelIds = "INBOX";
    const url = `https://www.googleapis.com/gmail/v1/users/${email}/messages`;
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };
    let params :any;
    if(nextPageToken !== null){
      params = new HttpParams().set('maxResults', maxResults).set('pageToken',nextPageToken).set('labelIds',labelIds);
    }
    else{
      params = new HttpParams().set('maxResults', maxResults).set('labelIds',labelIds);
    }
    const requestOptions = {
      headers : new HttpHeaders (headerDict),
      params : params
    };

    return this.http.get(url,requestOptions);
  }

  getMsg(email,id,accessToken){
    const url = `https://www.googleapis.com/gmail/v1/users/${email}/messages/${id}`;
    const headerDict = {
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };
    
    const requestOptions = {
      headers : new HttpHeaders (headerDict)
    };

    return this.http.get(url,requestOptions);
  }

  historyList(email,accessToken,startHistoryId){
    const url = `https://www.googleapis.com/gmail/v1/users/${email}/history`;
    const headerDict = {
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };
    let params :any;
    params = new HttpParams().set('startHistoryId',startHistoryId)
    .set('historyTypes','messageAdded')
    .append('historyTypes','messageDeleted')
    .append('historyTypes','labelAdded')
    const requestOptions = {
      headers : new HttpHeaders (headerDict),
      params: params
    };

    return this.http.get(url,requestOptions);
  }

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

  addData(email,regToken,refreshToken){
    const url = 'https://us-central1-moodle-announcement-trac-347e7.cloudfunctions.net/addData';
    const body = {
      name        : email,
      regToken    : regToken,
      refreshToken: refreshToken
    };
    return this.http.post(url,body);
  }

  unsubscribe(email,regToken){
    const url = 'https://us-central1-moodle-announcement-trac-347e7.cloudfunctions.net/unsubscribe';
    const body = {
      name    : email,
      regToken: regToken
    };
    return this.http.post(url,body);
  }
}
