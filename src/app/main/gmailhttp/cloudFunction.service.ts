import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class CloudFunction { 

    constructor(private http: HttpClient) { }
    
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