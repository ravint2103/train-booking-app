import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgDatepickerModule } from 'ng2-datepicker';

import { AppComponent } from './app.component';
import { LoginComponent } from '../app/pages/login/login.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { TrainListComponent } from './pages/train-list/train-list.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReservationComponent,
    TrainListComponent,
    MyAccountComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
