import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared.module';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserInfoService } from './services/user-info.service';
import { ReadDatabase } from './services/readDatabase.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    MainModule,
    LoginModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [UserInfoService,AuthGuard,AuthService,ReadDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
