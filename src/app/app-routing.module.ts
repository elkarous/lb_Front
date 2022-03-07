import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./SuperAdmin/dashboard/dashboard.component";
import {AuthGuard} from "./Authentification/guards/auth.guard";
import {ResetPasswordComponent} from "./Authentification/reset-password/reset-password.component";
import {UpdateProfilComponent} from "./update-profil/update-profil.component";
import {ListUserComponent} from "./user/list-user/list-user.component";
import {AddUserComponent} from "./user/add-user/add-user.component";
import {ProprietiesComponent} from "./proprieties/proprieties.component";
import {PreviousComponent} from "./previous/previous.component";
import {ForecastComponent} from "./forecast/forecast.component";
import {DashAgentComponent} from "./Agent/dash-agent/dash-agent.component";
import {DashHomeComponent} from "./SuperAdmin/dash-home/dash-home.component";
import {TemplatePasswordComponent} from "./template-password/template-password.component";
import {ProfileComponent} from "./Agent/profile/profile.component";
import {DashAdminComponent} from "./Admin/dash-admin/dash-admin.component";
import {ListAgentComponent} from "./Admin/list-agent/list-agent.component";
import {AddAgentComponent} from "./Admin/add-agent/add-agent.component";
import {HomeAgentComponent} from "./Admin/home-agent/home-agent.component";
import {CampingComponent} from "./camping/camping.component";
import {CampStatComponent} from "./camp-stat/camp-stat.component";



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashAgent', component: DashAgentComponent,children:[
      {path: 'profile', component: ProfileComponent},
      {path: 'resetPassword', component: TemplatePasswordComponent},
      {path: 'proprieties', component: ProprietiesComponent},
      {path: 'previous', component: PreviousComponent},
      {path: 'forecast', component: ForecastComponent},
    ]},
  {path: 'dashAdmin', component:DashAdminComponent,children:[
      {path: '',component: HomeAgentComponent},
      {path: 'listAgent', component: ListAgentComponent },
      {path: 'addAgent', component: AddAgentComponent},
      {path: 'proprieties', component: ProprietiesComponent},
      {path: 'history', component: PreviousComponent},
      {path: 'forecast', component: ForecastComponent},
    ]},

  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {path: '',component: ListUserComponent},
      {path: 'campStat',component: CampStatComponent},
      {path: 'updateProfile', component: UpdateProfilComponent},
      {path: 'resetPassword', component: TemplatePasswordComponent},
      {path: 'listUsers', component: ListUserComponent },
      {path: 'addUser', component: AddUserComponent},
      {path: 'proprieties', component: ProprietiesComponent},
      {path: 'proprieties/:id', component: CampingComponent},
      {path: 'previous', component: PreviousComponent},
      {path: 'forecast', component: ForecastComponent},

    ]
  },
  {path: 'resetPassword/:token', component: ResetPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
