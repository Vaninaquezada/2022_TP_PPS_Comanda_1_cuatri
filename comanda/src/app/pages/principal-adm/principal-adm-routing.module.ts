import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalAdmPage } from './principal-adm.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalAdmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalAdmPageRoutingModule {}
