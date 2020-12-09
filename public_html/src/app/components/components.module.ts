import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { GlobalAlertComponent } from './global-alert/global-alert.component';



@NgModule({
  declarations: [NavigationComponent, GlobalAlertComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
  ],
  exports:[NavigationComponent]
})
export class ComponentsModule { }
