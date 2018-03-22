import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator,MatTableDataSource,MatSort} from '@angular/material';

import {ReadDatabase} from '../../../services/readDatabase.service';

@Component({
  selector: 'app-current-filter',
  templateUrl: './current-filter.component.html',
  styleUrls: ['./current-filter.component.css']
})
export class CurrentFilterComponent {
    displayedColumns = ['from', 'subject','email'];
    currentFilterList = new MatTableDataSource();
    length ;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _db : ReadDatabase
    ){}

    ngOnInit(){
        this._db.getFilterList().subscribe(
            data=>{
                this.currentFilterList.data = data;
                this.length = this.currentFilterList.data.length;
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
}

export interface filterList {
    position: number;
    from    : string;
    subject : string;
    email   : string;
  }