import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncuentaSupervisorPage } from './encuenta-supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: EncuentaSupervisorPage
  },
  {
    path: 'lista-empleados',
    loadChildren: () => import('./lista-empleados/lista-empleados.module').then( m => m.ListaEmpleadosPageModule)
  },
  {
    path: 'lista-clientes',
    loadChildren: () => import('./lista-clientes/lista-clientes.module').then( m => m.ListaClientesPageModule)
  },
  {
    path: 'graficos',
    loadChildren: () => import('./graficos/graficos.module').then( m => m.GraficosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncuentaSupervisorPageRoutingModule {}
