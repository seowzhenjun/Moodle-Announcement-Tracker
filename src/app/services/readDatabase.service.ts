import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { GmailhttpService } from '../main/gmailhttp/gmailhttp.service';
import { oAuth2Service } from '../main/gmailhttp/oAuth2.service';
import { DataService } from '../main/data.service';
declare var window;

@Injectable()
export class ReadDatabase {

    database : any = firebase.database();
    constructor(
        private _http    : GmailhttpService,
        private _service : DataService,
        private _oAuth2  : oAuth2Service
    ){}

    getAccessToken(email){
        let dbRef = this.database.ref('GmailSub');
        let obj = JSON.parse(window.localStorage.getItem('obj'));
        dbRef.orderByChild('userName').equalTo(email).once('value').then(
            snapshot => {
                let dbkey = Object.keys(snapshot.val())[0];
                snapshot.forEach(childSnapshot=>{
                    this._oAuth2.getAccessToken(childSnapshot.val().refreshToken).subscribe(
                        accessToken => {
                            for ( var key in accessToken){
                                if (key === 'access_token'){
                                    obj['accessToken']=accessToken[key];
                                    window.localStorage.setItem('obj',JSON.stringify(obj));
                                }
                            }
                            this.partialSync(childSnapshot.val().historyId,obj,dbkey);
                        },
                        err => console.log(err)
                    )
                });
            }
        )
    }

    partialSync(historyId,obj,dbKey){
        if(window.localStorage.getItem('historyId') === null){
            window.localStorage.setItem('historyId',historyId);
        }
        else{
            let historyId = window.localStorage.getItem('historyId');
            this._http.historyList(obj.email,obj.accessToken,historyId).subscribe(
                res => {
                    for(var key in res){
                        if(key==='historyId'){
                            window.localStorage.setItem('historyId',res[key]);
                            this.database.ref(`GmailSub/${dbKey}`).update({
                                historyId : res[key]
                            })
                        }
                        if(key==='history'){
                            this.changeLocalEmail(res[key]);
                        }
                    }
                }
            );
        }
    }

    changeLocalEmail(list){
        console.log(list);
        let obj = JSON.parse(window.localStorage.getItem('obj'));
        list.forEach(element => {
            if(element.messagesAdded){
                element.messagesAdded.forEach(
                    msg=>{
                        this._http.getMsg(obj.email,msg.message.id,obj.accessToken).subscribe(
                            newEmail => {
                                this.getEmailDetail(newEmail,false);
                            },
                            err => console.log(err)
                        );
                    }
                )
            }
            if(element.messagesDeleted){
                element.messagesDeleted.forEach(
                    msg=>{
                        this.deleteEmail(msg.message.id);
                    }
                );
            }
            if(element.labelsAdded){
                element.labelsAdded.forEach(
                    msg =>{
                        if(msg.labelIds[0] === 'TRASH'){
                            this.deleteEmail(msg.message.id);
                        }
                    }
                )
            }
        })
    }

    getEmailDetail(email,push){

        let list = JSON.parse(window.localStorage.getItem('email'));
        let emailList:emailList[] = list === null? [] : list; 
        for(var i=0; i<email.length; i++){
            let item = email[i].payload.headers;
            let body = {} as emailList;
      
            body['snippet']     = email[i].snippet;
            body['id']          = email[i].id;
            body['payload']     = email[i].payload;
            body['internalDate']= email[i].internalDate;
            body['labelIds']    = email[i].labelIds;
            body['important']   = false;
            for(var x=0; x<item.length; x++){
      
              if(item[x].name === "From"){
                body['from'] = item[x].value.split('<')[0];
              }
              if(item[x].name === "Subject"){
                body['subject'] = item[x].value;
              }
            }
            //console.log(body);
            if(push){
                emailList.push(body);
            }
            else{
                console.log(body);
                emailList.unshift(body);
            }
          }
          //console.log(emailList);
        window.localStorage.setItem('email',JSON.stringify(emailList));
        this._service.sendList(emailList);
      }

    deleteEmail(id){
        let emailList = JSON.parse(window.localStorage.getItem('email'));
        let index = emailList.findIndex(x => x.id === id);
        emailList.splice(index,1);
        window.localStorage.setItem('email',JSON.stringify(emailList));
        this._service.sendList(emailList);
    }
}

export interface emailList {
    snippet       : string;
    id            : string;
    payload       : string;
    internalDate  : string;
    labelIds      : string[];
    from          : string;
    subject       : string;
    important     : boolean;
  }