import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosACobrarPage } from './pedidos-acobrar.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosACobrarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosACobrarPageRoutingModule {}
