import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosAConfirmarPage } from './pedidos-aconfirmar.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosAConfirmarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosAConfirmarPageRoutingModule {}
