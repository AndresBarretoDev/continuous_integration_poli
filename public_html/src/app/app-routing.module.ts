import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { MedicalServicesComponent } from './pages/medical-services/medical-services.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterPatientComponent } from './pages/register-patient/register-patient.component';
import { UsersInformationComponent } from './pages/users-information/users-information.component';


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'home',
        component:HomepageComponent
      },
      {
        path:'medical',
        component:MedicalServicesComponent
      },
      {
        path:'register-patient',
        component:RegisterPatientComponent
      },
      {
        path:'user-information',
        component:UsersInformationComponent
      }
    ]
  },
  {
    path:'**',
    redirectTo:'/login'
  },
  // { path: '',   redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
