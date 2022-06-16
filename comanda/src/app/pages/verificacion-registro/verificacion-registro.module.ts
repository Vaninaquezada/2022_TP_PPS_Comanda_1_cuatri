import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificacionRegistroPageRoutingModule } from './verificacion-registro-routing.module';

import { VerificacionRegistroPage } from './verificacion-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificacionRegistroPageRoutingModule
  ],
  declarations: [VerificacionRegistroPage]
})
export class VerificacionRegistroPageModule {}
