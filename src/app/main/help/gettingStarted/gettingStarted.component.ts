import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { SetKeywords } from '../../../services/setKeywords.service';
@Component({
  selector: 'app-gettingStarted',
  templateUrl: './gettingStarted.component.html',
  styleUrls: ['./gettingStarted.component.css']
})
export class GettingStartedComponent implements OnInit {

    isLinear = true;
    form    : FormGroup;
    facFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    facultyList : string[] = ['Engineering','Business','Accounting','Law'];
    commonWords : string[] = ['Forum','Monash University','Examination'];
    constructor(
        private fb: FormBuilder,
        private _setKey : SetKeywords) {
        this.form = fb.group({
            'faculty' : ''
        })
    }
    
    ngOnInit(){}

    submit() : void {
        console.log(this.form.controls['faculty'].value);
        this._setKey.setKeywords(this.form.controls['faculty'].value);
    }

}
