import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SetKeywords } from '../../services/setKeywords.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    private _service : DataService,
    private setKeywords : SetKeywords,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    markAsImportant(){
      this.setKeywords.setKeywords(this.data);
      this.setKeywords.setImportantMsgId(this.data,true);
      this._service.sendMarkAsImportant();
    }

    cancel(){
      this._service.sendHighlight(false);
    }
}
