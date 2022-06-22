import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BartenderPedidosPageRoutingModule } from './bartender-pedidos-routing.module';

import { BartenderPedidosPage } from './bartender-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BartenderPedidosPageRoutingModule
  ],
  declarations: [BartenderPedidosPage]
})
export class BartenderPedidosPageModule {}
