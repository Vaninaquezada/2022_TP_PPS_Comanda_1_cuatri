import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MozoPedidosPage } from './mozo-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: MozoPedidosPage
  },
  {
    path: 'pedidos-acobrar',
    loadChildren: () => import('../mozo-Pedidos/pedidos-acobrar/pedidos-acobrar.module').then( m => m.PedidosACobrarPageModule)
  },
  {
    path: 'pedidos-aentregar',
    loadChildren: () => import('../mozo-Pedidos/pedidos-aentregar/pedidos-aentregar.module').then( m => m.PedidosAEntregarPageModule)
  },
  {
    path: 'pedidos-aconfirmar',
    loadChildren: () => import('../mozo-Pedidos/pedidos-aconfirmar/pedidos-aconfirmar.module').then( m => m.PedidosAConfirmarPageModule)
  },
  {
    path: 'pedidos-en-preparacion',
    loadChildren: () => import('../mozo-Pedidos/pedidos-en-preparacion/pedidos-en-preparacion.module')
    .then( m => m.PedidosEnPreparacionPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MozoPedidosPageRoutingModule {}
