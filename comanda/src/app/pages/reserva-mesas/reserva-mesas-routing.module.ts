import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaMesasPage } from './reserva-mesas.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaMesasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaMesasPageRoutingModule {}
