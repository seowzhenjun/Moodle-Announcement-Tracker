import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }            from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  ngOnInit() {
  }

  constructor(
      private router: Router,
      private route: ActivatedRoute
  ){}

  keyword(){
      this.router.navigate(['keyword'],{relativeTo: this.route});
  }
}
