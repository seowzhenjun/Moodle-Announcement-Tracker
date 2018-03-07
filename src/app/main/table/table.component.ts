import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GmailhttpService } from '../gmailhttp/gmailhttp.service';
import { DataService } from '../data.service';
import { DateService} from '../../services/date.service';
// declare var Hammer;
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  list : any ;
  currentIndex : number ; 
  isHighlight : boolean ;

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
          this.currentIndex =null;
        }
      this.isHighlight=isHighlight;
      }
    );
    this._service.currentPayload.subscribe();
    this._service.currentEmailList.subscribe(
      list=>{
        this.list=this.checkUnread(list);
      });
  }
  
  showDetail(id,payload){
    this.router.navigate(['/main', id])
    .then(() => {
      let obj = JSON.parse(window.localStorage.getItem('obj'));
      let email = JSON.parse(window.localStorage.getItem('email'));

      this._service.sendPayload(payload);
      this._http.modify(id,obj.email,obj.accessToken).subscribe(
        (msg)=> {
          let temp = email.findIndex(x => x.id === id);
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
    this.currentIndex = i;
    this._service.sendId(element);
    this._service.sendHighlight(true);
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