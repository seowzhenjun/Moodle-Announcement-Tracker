import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { HelpComponent }          from './help.component';
import { GettingStartedComponent} from './gettingStarted/gettingStarted.component';

const helpRoutes: Routes = [
  {
    path: '',
    children : [
      {
        path: '',
        component : HelpComponent,
      },
      {
        path: 'gettingStarted',
        component : GettingStartedComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(helpRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HelpRoutingModule { }