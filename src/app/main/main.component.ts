import { Component, OnInit, HostListener } from '@angular/core';
import * as firebase from 'firebase';

import { GmailhttpService } from './gmailhttp/gmailhttp.service';
import { DataService } from './data.service';
import { UserInfoService } from '../services/user-info.service';
import { ReadDatabase } from '../services/readDatabase.service';

declare var window;
declare var cordova;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @HostListener('window:scroll',['$event'])
  checkSCrollHeight($event){
    if($event.srcElement.scrollingElement.scrollHeight - $event.srcElement.scrollingElement.scrollTop < window.innerHeight*1.2){
      if(this.fetch){
        this.fetch = !this.fetch;
        this.listMsg(this.nextPageToken);
      }
    }
  }

  emailList : any = [{}];
  userdetail : any = {};
  nextPageToken : string;
  fetch : boolean = true;
  serverAuthCode : string ;
  regToken : string ;
  splice = false;

  constructor(
    private _http : GmailhttpService,
    private _service : DataService,
    private _user : UserInfoService,
    private _db : ReadDatabase ) 
    {}

  ngOnInit() {
    this._user.currentMessage.subscribe(obj => {
      if(obj !== ""){
        // Use email from local storage if any
        let localStorageEmail = window.localStorage.getItem('email');
        if(localStorageEmail !== null){
          this._db.getAccessToken(obj.email);
          this._service.sendList(JSON.parse(localStorageEmail));
          this.userdetail = obj;
        }
        else{
          this.userdetail = obj;
          this.listMsg();
          this.serverAuthCode = obj.serverAuthCode;
        }
      } 
    });
    // firebase.messaging().onMessage( message => {
    //   console.log(message);
    // cordova.plugins.notification.local.schedule({
    //   title: 'My first notification',
    //   text: 'Thats pretty easy...',
    //   foreground: true,
    //   actions: [
    //     { id: 'yes', title: 'Yes' },
    //     { id: 'no',  title: 'No' }
    //   ]
    // });
    // });

    // window.FirebasePlugin.onNotificationOpen(function(notification) {
    //     console.log(notification);
    //     cordova.plugins.notification.local.schedule({
    //       title: 'My first notification',
    //       text: 'Thats pretty easy...',
    //       foreground: true,
    //       actions: [
    //         { id: 'yes', title: 'Yes' },
    //         { id: 'no',  title: 'No' }
    //       ]
    //     });
    // }, function(error) {
    //     console.error(error);
    // });
  }

  listMsg(nextPageToken?){
    let obj = JSON.parse(window.localStorage.getItem('obj'));
    if(!nextPageToken){
      nextPageToken = null;
    }
    this._http.listMsg(obj.email,obj.accessToken,nextPageToken)
    .subscribe(
      result => {
        this.getMsg(obj, result);
      },
      err => console.log(err)
    );
  }
  
  getMsg(obj, result){
    var promiseArr = [];
    for(let key in result){
      if(key === "nextPageToken"){
        this.nextPageToken = result[key];
      }
      if(key === "messages"){
        for(var i=0; i< result[key].length; i++){
          promiseArr[i] = new Promise ((resolve) =>{
              this._http.getMsg(obj.email,result[key][i].id,obj.accessToken)
              .subscribe(
              result => resolve(result),
              err => console.log(err)
            );
          }) 
        }
        Promise.all(promiseArr).then(val => {
          let msgArr = this.sortMsg(val);
          this.getEmailDetail(msgArr);
        });
      }
    };
  }

  sortMsg(msgArr){
    let swap : boolean = true;
    let temp;
    while(swap){
    swap = false;
      for (var i = 0 ; i < msgArr.length-1; i ++){
          if (msgArr[i].internalDate<msgArr[i+1].internalDate){
              temp = msgArr[i+1];
              msgArr[i+1] = msgArr[i];
              msgArr[i] = temp;
              swap = true;
          }
      }
    }
    return msgArr;
  }

  getEmailDetail(email){
    var arr : any =[];
    for(var i=0; i<email.length; i++){
      //var htmlBody = this.getBody(email[i].payload);
      //console.log(htmlBody);
      var item = email[i].payload.headers;
      let body : any = {};
      body['snippet'] = email[i].snippet;
      body['id']=email[i].id;
      body['payload']=email[i].payload;
      for(var x=0; x<item.length; x++){

        if(item[x].name === "From"){
          body['from'] = item[x].value.split('<')[0];
        }
        if(item[x].name === "Subject"){
          body['subject'] = item[x].value;
        }
      }
      this.emailList.push(body);
    }
    this.fetch = true;
    window.localStorage.setItem('email',JSON.stringify(this.emailList));
    if(!this.splice){
      this.emailList.splice(0,1);
      this.splice = !this.splice;
    }
    this._service.sendList(this.emailList);
  }

  // history(){
  //   let obj = JSON.parse(window.localStorage.getItem('obj'));
  //   let hist = window.localStorage.getItem('historyId');
  //   this._http.historyList(obj.email,obj.accessToken,hist).subscribe(
  //     changes => console.log(changes)
  //   );
  // }
}