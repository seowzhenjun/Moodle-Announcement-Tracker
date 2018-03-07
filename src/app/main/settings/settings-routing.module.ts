import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent}     from './settings.component';
import { KeywordComponent}      from './keyword/keyword.component';

const mainRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component : SettingsComponent
      },
      {
        path: 'keyword',
        component : KeywordComponent
      }
    ] 
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SettingsRoutingModule { }