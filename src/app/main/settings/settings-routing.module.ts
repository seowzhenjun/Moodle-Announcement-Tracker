import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent}     from './settings.component';
import { NewFilterComponent }   from './new-filter/new-filter.component';
import { CurrentFilterComponent } from './current-filter/current-filter.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';

const mainRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component : SettingsComponent
      },
      {
        path: 'newFilter',
        component : NewFilterComponent
      },
      {
        path : 'currentFilter',
        component : CurrentFilterComponent
      },
      {
        path : 'generalSettings',
        component : GeneralSettingsComponent
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