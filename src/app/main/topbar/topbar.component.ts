import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  @Output() menuToggle = new EventEmitter<boolean>();

  toggle : boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(){
    this.menuToggle.emit(this.toggle);
  }
}
