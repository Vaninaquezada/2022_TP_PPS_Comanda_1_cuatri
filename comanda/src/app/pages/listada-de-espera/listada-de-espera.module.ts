import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadaDeEsperaPageRoutingModule } from './listada-de-espera-routing.module';

import { ListadaDeEsperaPage } from './listada-de-espera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadaDeEsperaPageRoutingModule
  ],
  declarations: [ListadaDeEsperaPage]
})
export class ListadaDeEsperaPageModule {}
