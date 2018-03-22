import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { AuthService } from '../../services/auth.service';
import { MatSidenav } from '@angular/material';
import { CloudFunction } from '../gmailhttp/cloudFunction.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() userDetail : any;

  constructor(
    private router : Router,
    private sidenav : MatSidenav,
    public authService : AuthService,
    private _cf : CloudFunction,
    private _service : DataService
  ) {}

  //headerImgUrl : string = this.userDetail.imageUrl;
  ngOnInit() {
  }

  filterMsg(){
    this._cf.filterMsg('zjseo1@student.monash.edu','Michael Zenere ').subscribe(success=>console.log(success));
  }

  inbox(){
    this.router.navigate(['/main/table']);
    this._service.sendTitle('Inbox');
    this.sidenav.close();
  }

  settings(){
    this.router.navigate(['/main/settings']);
    this._service.sendTitle('Settings');
    this.sidenav.close();
  }

  help(){
    this.router.navigate(['/main/help']);
    this._service.sendTitle('Help and Feedback');
    this.sidenav.close();
  }

  signOut(){
    this.authService.logout();
  }
}
