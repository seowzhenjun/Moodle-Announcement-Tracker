import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GmailhttpService } from '../gmailhttp/gmailhttp.service';
import { DataService } from '../data.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  list : any ;
  currentIndex : number[] = [-1];
  highlightedElement : emailList[] = []; 
  isHighlight : boolean ;
  showImportantEmail : boolean;
  
  constructor(
    private router : Router,
    private _service : DataService,
    private _date : DateService,
    private _http : GmailhttpService) { }

  ngOnInit() {
    this._service.updateView.subscribe(
      view => {
        if(view){
          this.updateView()
        }
      });
    this._service.isHighlight.subscribe(
      isHighlight=>{
        if(!isHighlight){
          this.currentIndex = [-1];
          this.highlightedElement=[];
        }
      this.isHighlight=isHighlight;
      }
    );
    this._service.showImportantEmail.subscribe(
      show=>this.showImportantEmail=show
    );
    this._service.currentEmailList.subscribe(
      list=>{
        this.list=this.checkUnread(list);
      });
  }
  
  showDetail(emailList){
    this.router.navigate(['/main', emailList.id])
    .then(() => {
      let obj = JSON.parse(window.localStorage.getItem('obj'));
      let email = JSON.parse(window.localStorage.getItem('email'));

      this._service.sendPayload(emailList);
      this._http.modify(emailList.id,obj.email,obj.accessToken).subscribe(
        (msg)=> {
          let temp = email.findIndex(x => x.id === emailList.id);
          let ind = email[temp].labelIds.indexOf("UNREAD");
          if(ind != -1){
            email[temp].fontWeight = 'normal';
            email[temp].opacity = '0.5';
            email[temp].labelIds.splice(ind,1);
            this._service.sendList(email);
            window.localStorage.setItem('email',JSON.stringify(email));
          }
        }
      );
    });
  }

  onContextMenu($event,i,element){
    $event.preventDefault();
    $event.stopPropagation();
    let hasHighlight : boolean ;
    let ind = this.currentIndex.findIndex(x=> x === i);
    let elementInd = this.highlightedElement.findIndex(x=> x.id === element.id);
    if(ind!==-1){
      this.currentIndex.splice(ind,1);
      this.highlightedElement.splice(elementInd,1);
    }
    else{
      this.currentIndex.push(i);
      this.highlightedElement.push(element);
    }
    hasHighlight = this.highlightedElement.length ? true : false;
    this._service.sendId(this.highlightedElement);
    this._service.sendHighlight(hasHighlight);
    this._service.sendFilterList(false);
  }

  updateView(){
    let email = JSON.parse(window.localStorage.getItem('email'));
    this.list = this.checkUnread(email);
  }

  checkUnread(list){
    for(var i=0; i<list.length; i++){
      for(var j=0; j<list[i].labelIds.length; j++){
        if(list[i].labelIds[j]=='UNREAD'){
          list[i].fontWeight = 'bold';
          list[i].opacity = 1;
        }
      }
      list[i].date = this._date.convertDate(list[i].internalDate);
    }
    return list;
  }
}

export interface emailList {
  snippet       : string;
  id            : string;
  email         : string;
  payload       : string;
  internalDate  : string;
  labelIds      : string[];
  from          : string;
  subject       : string;
  important     : boolean;
}