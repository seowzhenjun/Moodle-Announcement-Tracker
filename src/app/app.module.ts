// import { BrowserModule } from '@angular/platform-browse
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared.module';
import { PageNotFoundComponent} from './pageNotFound/pageNotFound.component';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserInfoService } from './services/user-info.service';
import { ReadDatabase } from './services/readDatabase.service';
import { SetKeywords } from './services/setKeywords.service';
import { DateService } from './services/date.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    MainModule,
    LoginModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [UserInfoService,AuthGuard,AuthService,ReadDatabase,SetKeywords,DateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
