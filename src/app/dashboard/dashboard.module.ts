import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomepageComponent } from 'src/app/dashboard/containers/homepage/homepage.component';
import { DashboardRoutingModule } from 'src/app/dashboard/dashboard-routing.module';

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: []
})
export class DashboardModule { }
