import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientePedidoPageRoutingModule } from './cliente-pedido-routing.module';

import { ClientePedidoPage } from './cliente-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientePedidoPageRoutingModule
  ],
  declarations: [ClientePedidoPage]
})
export class ClientePedidoPageModule {}
