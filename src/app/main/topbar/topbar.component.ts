import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Input() title : string;
  @Output() menuToggle = new EventEmitter<boolean>();

  toggle      : boolean = true;
  highlighted : boolean ;
  star        : string = 'star';
  element     : any;
  fileNameDialogRef: MatDialogRef<DialogComponent>;

  constructor(
    private _service : DataService,
    private snackBar : MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this._service.isHighlight.subscribe(
      isHighlight => this.highlighted = isHighlight
    )
    this._service.currentElement.subscribe(
      element => {
        this.element = element;
        //this.star = element.important? 'star' : 'star_border';
      }
    )
    this._service.markAsImportant.subscribe(
      important => {
        if(important){
          this.markAsImportant();
        }
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
    let temp ;
    let message = "Email marked as important";
    for(let i=0; i<this.element.length; i++){
      temp = email.findIndex(x => x.id === this.element[i].id);
      if(temp !== -1){
        email[temp].important = true;
      }
    }
    window.localStorage.setItem('email',JSON.stringify(email));
    this._service.sendUpdateView();
    // if(temp !== -1){
    //   message = email[temp].important? "Email marked as not important" : "Email marked as important";
    //   if(!email[temp].important){
    //     this.openDialog();
    //   }
    //   email[temp].important = !email[temp].important;
    //   window.localStorage.setItem('email',JSON.stringify(email));
    //   this._service.sendUpdateView();
    // }
    // else{
    //   message = "Something went wrong";
    // }
    this.cancelHighlight();
    this.openSnackbar(message);
  }

  openSnackbar(message){
    this.snackBar.open(message,null,{duration : 2000});
  }

  openDialog(){
    let dialogList : dialogList[] = [];
    for(let i=0; i<this.element.length; i++){
      let body = {} as dialogList;
      body['from']    = this.element[i].from;
      body['subject'] = this.element[i].subject;
      body['id']      = this.element[i].id;
      body['email']   = this.element[i].email;
      dialogList.push(body);
    }
    this.fileNameDialogRef = this.dialog.open(DialogComponent, {
      data : dialogList,
      autoFocus: false
    });
  }

  showChange($event){
    console.log($event);
  }
}

export interface dialogList {
  from    : string;
  subject : string;
  id      : string;
  email   : string;
}