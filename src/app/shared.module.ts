import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatSelectModule
} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  imports: [
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule
  ],
  exports: [
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule
  ]
})
export class SharedModule {}