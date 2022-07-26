import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficosEncuestaPage } from './graficos-encuesta.page';

const routes: Routes = [
  {
    path: '',
    component: GraficosEncuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficosEncuestaPageRoutingModule {}
