import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../../services/auth.service';
declare var window;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() userDetail : any;

  constructor(private router : Router,
  public authService : AuthService) { }

  //headerImgUrl : string = this.userDetail.imageUrl;
  ngOnInit() {
  }

  signOut(){
    this.authService.logout();
  }
  //   firebase.auth().signOut()
  //   .then(()=>this.router.navigate(['/login']))
  //   .catch(err => console.log(err));
  // }
}
