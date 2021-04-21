import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { GuestComponent } from './guest/guest.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './member/admin/admin.component';
import { AdministratorComponent } from './member/administrator/administrator.component';
import { InchargeComponent } from './member/incharge/incharge.component';
import { TechnicianComponent } from './member/technician/technician.component';
import { HodComponent } from './hod/hod.component';


const routes: Routes = [
  {path:"member",component:MemberComponent},
  {path:"guest",component:GuestComponent},
  {path:"home",component:HomeComponent},
  {path:"member/admin",component:AdminComponent},
  {path:"member/administrator",component:AdministratorComponent},
  {path:"member/incharge",component:InchargeComponent},
  {path:"member/technician",component:TechnicianComponent},
  {path:"member/hod",component:HodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
