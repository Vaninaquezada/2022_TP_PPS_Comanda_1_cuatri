import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosEnPreparacionPage } from './pedidos-en-preparacion.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosEnPreparacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosEnPreparacionPageRoutingModule {}
