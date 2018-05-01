import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';

import { SharedModule }         from '../../shared.module';
import { FilterComponent }    from './filter.component';
import { NewFilterComponent }   from './new-filter/new-filter.component';
import { CurrentFilterComponent } from './current-filter/current-filter.component';

import { FilterRoutingModule} from './filter-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FilterRoutingModule
  ],
  declarations: [
    FilterComponent,
    NewFilterComponent,
    CurrentFilterComponent
  ],
  providers: []
})
export class FilterModule {}