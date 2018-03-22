import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule }         from '../shared.module';
import { MainComponent }        from './main.component';
import { SidebarComponent }     from './sidebar/sidebar.component';
import { TableComponent }       from './table/table.component';
import { TopbarComponent }      from './topbar/topbar.component';
import { DialogComponent }      from './dialog/dialog.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { SafeHtmlPipe }         from './email-detail/email-detail.component';

import { GmailhttpService }     from './gmailhttp/gmailhttp.service';
import { CloudFunction }        from './gmailhttp/cloudFunction.service';
import { oAuth2Service }        from './gmailhttp/oAuth2.service';
import { DataService }          from './data.service';

import { MainRoutingModule} from './main-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    SidebarComponent,
    TableComponent,
    TopbarComponent,
    EmailDetailComponent,
    DialogComponent,
    SafeHtmlPipe
  ],
  providers: [
    GmailhttpService,
    CloudFunction,
    oAuth2Service,
    DataService
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class MainModule {}