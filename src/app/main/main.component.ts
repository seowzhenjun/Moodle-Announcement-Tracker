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

  userdetail : any = {};
  nextPageToken : string;
  fetch : boolean = true;

  constructor(
    private _http    : GmailhttpService,
    private _service : DataService,
    private _user    : UserInfoService,
    private _db      : ReadDatabase ) 
    {}

  ngOnInit() {
    let obj = JSON.parse(window.localStorage.getItem('obj'));
    if(obj !== ""){
      this.userdetail = obj;
      // Use email from local storage if any
      let localStorageEmail = window.localStorage.getItem('email');
      if(localStorageEmail !== null){
        this._db.getAccessToken(obj.email);
        this._service.sendList(JSON.parse(localStorageEmail));
      }
      else{
        this.listMsg();
      }
    }

    document.addEventListener("deviceready",()=>{
      window.FirebasePlugin.onNotificationOpen(function(notification) {
        this._db.getAccessToken(obj.email);
          // console.log(notification);
          // cordova.plugins.notification.local.schedule({
          //   title: 'My first notification',
          //   text: 'Thats pretty easy...',
          //   foreground: true,
          //   actions: [
          //     { id: 'yes', title: 'Yes' },
          //     { id: 'no',  title: 'No' }
          //   ]
          // });
      }, function(error) {
          console.error(error);
      });
    },false);
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
          this._db.getEmailDetail(msgArr,true);
          this.fetch = true;
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
}