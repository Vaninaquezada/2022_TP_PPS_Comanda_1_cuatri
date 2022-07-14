import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropinaPageRoutingModule } from './propina-routing.module';

import { PropinaPage } from './propina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PropinaPageRoutingModule
  ],
  declarations: [PropinaPage]
})
export class PropinaPageModule {}
