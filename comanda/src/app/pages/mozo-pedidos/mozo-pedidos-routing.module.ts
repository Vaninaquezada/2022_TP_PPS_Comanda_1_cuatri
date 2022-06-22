import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MozoPedidosPage } from './mozo-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: MozoPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MozoPedidosPageRoutingModule {}
