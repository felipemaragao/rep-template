import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,

    PanelModule,
    ChartModule,

    DashboardRoutingModule
  ],
  providers: [DecimalPipe]
})
export class DashboardModule { }
