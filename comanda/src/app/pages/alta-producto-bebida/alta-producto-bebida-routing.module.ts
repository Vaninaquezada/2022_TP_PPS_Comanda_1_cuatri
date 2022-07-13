import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaProductoBebidaPage } from './alta-producto-bebida.page';

const routes: Routes = [
  {
    path: '',
    component: AltaProductoBebidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaProductoBebidaPageRoutingModule {}
