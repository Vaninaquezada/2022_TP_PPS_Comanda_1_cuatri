import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaProductoBebidaPageRoutingModule } from './alta-producto-bebida-routing.module';

import { AltaProductoBebidaPage } from './alta-producto-bebida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AltaProductoBebidaPageRoutingModule
  ],
  declarations: [AltaProductoBebidaPage]
})
export class AltaProductoBebidaPageModule {}
