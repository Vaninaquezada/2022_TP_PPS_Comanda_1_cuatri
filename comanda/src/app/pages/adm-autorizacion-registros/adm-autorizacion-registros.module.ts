import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmAutorizacionRegistrosPageRoutingModule } from './adm-autorizacion-registros-routing.module';

import { AdmAutorizacionRegistrosPage } from './adm-autorizacion-registros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmAutorizacionRegistrosPageRoutingModule
  ],
  declarations: [AdmAutorizacionRegistrosPage]
})
export class AdmAutorizacionRegistrosPageModule {}
