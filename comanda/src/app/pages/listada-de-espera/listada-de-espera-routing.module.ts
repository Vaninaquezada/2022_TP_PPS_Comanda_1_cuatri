import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadaDeEsperaPage } from './listada-de-espera.page';

const routes: Routes = [
  {
    path: '',
    component: ListadaDeEsperaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadaDeEsperaPageRoutingModule {}
