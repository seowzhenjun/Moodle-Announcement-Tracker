import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  list : any ;
 
  constructor(
    private router : Router,
    private _service : DataService) { }

  ngOnInit() {
    this._service.currentPayload.subscribe();
    this._service.currentEmailList.subscribe(
      list=>{
        this.list=list;
      });
  }

  showDetail(id,payload){
    this.router.navigate(['/main', id])
    .then(() => this._service.sendPayload(payload));
  }
}