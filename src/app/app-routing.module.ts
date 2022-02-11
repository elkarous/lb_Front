import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./Authentification/guards/auth.guard";
import {ResetPasswordComponent} from "./Authentification/reset-password/reset-password.component";
import {UpdateProfilComponent} from "./user/update-profil/update-profil.component";
import {ListUserComponent} from "./user/list-user/list-user.component";
import {AddUserComponent} from "./user/add-user/add-user.component";



const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {path: 'updateProfile', component: UpdateProfilComponent},
      {path: 'listUsers', component: ListUserComponent },
      {path: 'addUser', component: AddUserComponent}
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
