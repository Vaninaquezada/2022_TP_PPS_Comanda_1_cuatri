import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosACobrarPageRoutingModule } from './pedidos-acobrar-routing.module';

import { PedidosACobrarPage } from './pedidos-acobrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosACobrarPageRoutingModule
  ],
  declarations: [PedidosACobrarPage]
})
export class PedidosACobrarPageModule {}
