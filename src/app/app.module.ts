import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GuestComponent } from './guest/guest.component';
import { MemberComponent } from './member/member.component';
import { AdminComponent } from './member/admin/admin.component';
import { InchargeComponent } from './member/incharge/incharge.component';
import { TechnicianComponent } from './member/technician/technician.component';
import { AdministratorComponent } from './member/administrator/administrator.component';
import { FormsModule } from '@angular/forms';
import { HodComponent } from './hod/hod.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GuestComponent,
    MemberComponent,
    AdminComponent,
    InchargeComponent,
    TechnicianComponent,
    AdministratorComponent,
    HodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
