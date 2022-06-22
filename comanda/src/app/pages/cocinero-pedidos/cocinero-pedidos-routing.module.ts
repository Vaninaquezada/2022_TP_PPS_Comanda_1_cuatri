import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CocineroPedidosPage } from './cocinero-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: CocineroPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CocineroPedidosPageRoutingModule {}
