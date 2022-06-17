import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroDueniosSupervisoresPage } from './registro-duenios-supervisores.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroDueniosSupervisoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroDueniosSupervisoresPageRoutingModule {}
