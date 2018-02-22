import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { MainComponent }  from './main.component';
import { SharedModule } from '../shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableComponent } from './table/table.component';
import { TopbarComponent } from './topbar/topbar.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { SafeHtmlPipe } from './email-detail/email-detail.component';
import { GmailhttpService } from './gmailhttp/gmailhttp.service';
import { DataService } from './data.service';

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
    SafeHtmlPipe
  ],
  providers: [
    GmailhttpService,
    DataService]
})
export class MainModule {}