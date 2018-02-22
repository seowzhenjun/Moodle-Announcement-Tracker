import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class DataService {
  private payload = new BehaviorSubject<any>("");
  private emailList = new BehaviorSubject<any>("");
  private newEmail = new BehaviorSubject<any>("");
  currentPayload = this.payload.asObservable();
  currentEmailList = this.emailList.asObservable();
  currentNewEmail = this.newEmail.asObservable();
  
  constructor() { }

  sendPayload(message: any) {
    this.payload.next(message);
  }

  sendList(list: any){
    this.emailList.next(list);
  }

  sendNewEmail(email: any){
    this.newEmail.next(email);
  }
}