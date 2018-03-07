import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';

import { SharedModule }         from '../../shared.module';
import { SettingsComponent }    from './settings.component';
import { KeywordComponent }     from './keyword/keyword.component';

import { SettingsRoutingModule} from './settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent,
    KeywordComponent
  ],
  providers: []
})
export class SettingsModule {}