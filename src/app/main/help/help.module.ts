import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ReactiveFormsModule }      from '@angular/forms';

import { SharedModule }             from '../../shared.module';
import { HelpComponent }            from './help.component';
import { GettingStartedComponent}   from './gettingStarted/gettingStarted.component';

import { HelpRoutingModule} from './help-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HelpRoutingModule
  ],
  declarations: [
    HelpComponent,
    GettingStartedComponent
  ],
  providers: []
})
export class HelpModule {}