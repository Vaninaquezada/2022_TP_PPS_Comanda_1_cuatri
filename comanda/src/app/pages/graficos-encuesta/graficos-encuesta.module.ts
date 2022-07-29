import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficosEncuestaPageRoutingModule } from './graficos-encuesta-routing.module';

import { GraficosEncuestaPage } from './graficos-encuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficosEncuestaPageRoutingModule
  ],
  declarations: [GraficosEncuestaPage]
})
export class GraficosEncuestaPageModule {}
