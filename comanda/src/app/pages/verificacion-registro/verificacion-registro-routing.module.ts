import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificacionRegistroPage } from './verificacion-registro.page';

const routes: Routes = [
  {
    path: '',
    component: VerificacionRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificacionRegistroPageRoutingModule {}
