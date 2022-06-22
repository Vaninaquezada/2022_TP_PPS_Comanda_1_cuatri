import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePedidoPage } from './cliente-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: ClientePedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePedidoPageRoutingModule {}
