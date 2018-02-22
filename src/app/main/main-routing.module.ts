import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }            from '../services/auth-guard.service';
import { MainComponent }        from './main.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { TableComponent }       from './table/table.component';

const mainRoutes: Routes = [
  {
    path: 'main',  
    component: MainComponent,
    canActivate: [AuthGuard],
    children : [
      {
        path: 'table',
        component : TableComponent,
      },
      { 
        path: ':id', 
        component: EmailDetailComponent
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
export class MainRoutingModule { }