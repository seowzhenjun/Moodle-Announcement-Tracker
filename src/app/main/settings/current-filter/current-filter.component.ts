import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator,MatTableDataSource,MatSort} from '@angular/material';

import {ReadDatabase} from '../../../services/readDatabase.service';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-current-filter',
  templateUrl: './current-filter.component.html',
  styleUrls: ['./current-filter.component.css']
})
export class CurrentFilterComponent {
    displayedColumns = ['from', 'subject','email'];
    currentFilterList = new MatTableDataSource();
    length ;
    currentIndex : number[] = [-1];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _db : ReadDatabase,
        private _service : DataService
    ){}

    ngOnInit(){
        this._db.getFilterList().subscribe(
            data=>{
                this.currentFilterList.data = data;
                this.length = this.currentFilterList.data.length;
            }
        );

        this._service.isHighlight.subscribe(
            isHighlight=>{
              if(!isHighlight){
                this.currentIndex = [-1];
              }
            }
        );
    }

    ngAfterViewInit() {
        this.currentFilterList.paginator = this.paginator;
        this.currentFilterList.sort = this.sort;
    }
    
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.currentFilterList.filter = filterValue;
    }

    onContextMenu($event,element){
        $event.preventDefault();
        $event.stopPropagation();
        let hasHighlight : boolean ;
        let ind = this.currentIndex.findIndex(x=> x === element.position);
        if(ind!==-1){
            this.currentIndex.splice(ind,1);
        }
        else{
            this.currentIndex.push(element.position);
        }
        hasHighlight = this.currentIndex.length>1 ? true : false;
        this._service.sendHighlight(hasHighlight);
        this._service.sendFilterList(true);
    }
}

export interface filterList {
    position: number;
    from    : string;
    subject : string;
    email   : string;
  }