import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosEnPreparacionPageRoutingModule } from './pedidos-en-preparacion-routing.module';

import { PedidosEnPreparacionPage } from './pedidos-en-preparacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosEnPreparacionPageRoutingModule
  ],
  declarations: [PedidosEnPreparacionPage]
})
export class PedidosEnPreparacionPageModule {}
