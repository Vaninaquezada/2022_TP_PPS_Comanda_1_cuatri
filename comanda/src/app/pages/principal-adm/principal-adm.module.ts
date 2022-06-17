import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalAdmPageRoutingModule } from './principal-adm-routing.module';

import { PrincipalAdmPage } from './principal-adm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalAdmPageRoutingModule
  ],
  declarations: [PrincipalAdmPage]
})
export class PrincipalAdmPageModule {}
