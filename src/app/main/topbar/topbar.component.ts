import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<boolean>();

  toggle : boolean = true;
  highlighted : boolean ;
  star : string;
  element : any;

  constructor(
    private _service : DataService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this._service.isHighlight.subscribe(
      isHighlight => this.highlighted = isHighlight
    )
    this._service.currentElement.subscribe(
      element => {
        this.element = element;
        this.star = element.important? 'star' : 'star_border';
      }
    )
  }

  toggleMenu(){
    this.menuToggle.emit(this.toggle);
  }

  cancelHighlight(){
    this._service.sendHighlight(false);
  }

  markAsImportant(){
    let email = JSON.parse(window.localStorage.getItem('email'));
    let temp = email.findIndex(x => x.id === this.element.id);
    let message ;
    if(temp !== -1){
      message = email[temp].important? "Email marked as not important" : "Email marked as important";
      email[temp].important = !email[temp].important;
      window.localStorage.setItem('email',JSON.stringify(email));
      this._service.sendUpdateView();
    }
    else{
      message = "Something went wrong";
    }
    this.cancelHighlight();
    this.openSnackbar(message);
  }

  openSnackbar(message){
    this.snackBar.open(message,null,{duration : 2000});
    this.cancelHighlight();
  }
}
