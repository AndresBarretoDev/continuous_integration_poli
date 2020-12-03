import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { MedicalServicesComponent } from './medical-services/medical-services.component';
import { ComponentsModule } from '../components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { UsersInformationComponent } from './users-information/users-information.component';



@NgModule({
  declarations: [HomepageComponent, LoginComponent, MedicalServicesComponent, DashboardComponent, RegisterPatientComponent, UsersInformationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
