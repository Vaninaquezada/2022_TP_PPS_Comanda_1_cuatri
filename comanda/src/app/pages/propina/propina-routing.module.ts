import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropinaPage } from './propina.page';

const routes: Routes = [
  {
    path: '',
    component: PropinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropinaPageRoutingModule {}
