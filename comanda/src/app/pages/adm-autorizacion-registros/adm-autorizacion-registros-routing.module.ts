import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmAutorizacionRegistrosPage } from './adm-autorizacion-registros.page';

const routes: Routes = [
  {
    path: '',
    component: AdmAutorizacionRegistrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmAutorizacionRegistrosPageRoutingModule {}
