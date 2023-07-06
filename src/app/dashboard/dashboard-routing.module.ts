import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


export const rotas: Routes = [
  {
    path: '', component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ADVOGADO'] }
  },
];


@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

