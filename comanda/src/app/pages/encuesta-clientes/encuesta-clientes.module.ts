import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuestaClientesPageRoutingModule } from './encuesta-clientes-routing.module';

import { EncuestaClientesPage } from './encuesta-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EncuestaClientesPageRoutingModule
  ],
  declarations: [EncuestaClientesPage]
})
export class EncuestaClientesPageModule {}
