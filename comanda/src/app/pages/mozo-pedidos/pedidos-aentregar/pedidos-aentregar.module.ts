import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosAEntregarPageRoutingModule } from './pedidos-aentregar-routing.module';

import { PedidosAEntregarPage } from './pedidos-aentregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosAEntregarPageRoutingModule
  ],
  declarations: [PedidosAEntregarPage]
})
export class PedidosAEntregarPageModule {}
