import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosAConfirmarPageRoutingModule } from './pedidos-aconfirmar-routing.module';

import { PedidosAConfirmarPage } from './pedidos-aconfirmar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosAConfirmarPageRoutingModule
  ],
  declarations: [PedidosAConfirmarPage]
})
export class PedidosAConfirmarPageModule {}
