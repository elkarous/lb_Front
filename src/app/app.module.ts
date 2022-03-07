import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptorService} from "./Authentification/services/jwt-interceptor.service";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import { DashboardComponent } from './SuperAdmin/dashboard/dashboard.component';
import { PasswordComponent } from './Authentification/password/password.component';
import { MatDialogModule} from "@angular/material/dialog";
import {AuthGuard} from "./Authentification/guards/auth.guard";
import { MatProgressBarModule} from "@angular/material/progress-bar";
import { ResetPasswordComponent } from './Authentification/reset-password/reset-password.component';
import {MatCardModule} from "@angular/material/card";
import { UpdateProfilComponent } from './update-profil/update-profil.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import { AddUserComponent } from './user/add-user/add-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {NgxEchartsModule} from "ngx-echarts";
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { NavbarComponent } from './Agent/navbar/navbar.component';
import { DashAgentComponent } from './Agent/dash-agent/dash-agent.component';
import { DashAdminComponent } from './Admin/dash-admin/dash-admin.component';
import { ProprietiesComponent } from './proprieties/proprieties.component';
import { PreviousComponent } from './previous/previous.component';
import { ForecastComponent } from './forecast/forecast.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
import { MapsComponent } from './maps/maps.component';
import {AgmCoreModule} from "@agm/core";
import { DashHomeComponent } from './SuperAdmin/dash-home/dash-home.component';
import { TemplatePasswordComponent } from './template-password/template-password.component';
import { ProfileComponent } from './Agent/profile/profile.component';
import { AddAgentComponent } from './Admin/add-agent/add-agent.component';
import { ListAgentComponent } from './Admin/list-agent/list-agent.component';
import { HomeAgentComponent } from './Admin/home-agent/home-agent.component';
import { AgentTableComponent } from './agent-table/agent-table.component';
import {MatListModule} from "@angular/material/list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {AgmSnazzyInfoWindowModule} from "@agm/snazzy-info-window";
import { CampingComponent } from './camping/camping.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {AgmMarkerClustererModule} from "@agm/markerclusterer";
import {CsvModule} from "@ctrl/ngx-csv";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CampStatComponent } from './camp-stat/camp-stat.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    PasswordComponent,
    ResetPasswordComponent,
    UpdateProfilComponent,
    AddUserComponent,
    ListUserComponent,
    UpdateUserComponent,
    NavbarComponent,
    DashAgentComponent,
    DashAdminComponent,
    ProprietiesComponent,
    PreviousComponent,
    ForecastComponent,
    MapsComponent,
    DashHomeComponent,
    TemplatePasswordComponent,
    ProfileComponent,
    AddAgentComponent,
    ListAgentComponent,
    HomeAgentComponent,
    AgentTableComponent,
    CampingComponent,
    CampStatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatRadioModule,
    MatTooltipModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQxPaPvhEAr2TCGh9qeN4XI1tIBV9PtIQ'
    }),
    MatListModule,
    MatButtonToggleModule,
    AgmSnazzyInfoWindowModule,
    MatGridListModule,
    AgmMarkerClustererModule,
    CsvModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatChipsModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}
