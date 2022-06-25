import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosAEntregarPage } from './pedidos-aentregar.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosAEntregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosAEntregarPageRoutingModule {}
