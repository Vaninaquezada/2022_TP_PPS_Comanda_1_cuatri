import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MozoPedidosPageRoutingModule } from './mozo-pedidos-routing.module';

import { MozoPedidosPage } from './mozo-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MozoPedidosPageRoutingModule
  ],
  declarations: [MozoPedidosPage]
})
export class MozoPedidosPageModule {}
