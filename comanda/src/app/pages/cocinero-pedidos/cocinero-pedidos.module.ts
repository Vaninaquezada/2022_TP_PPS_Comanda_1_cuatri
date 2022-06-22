import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CocineroPedidosPageRoutingModule } from './cocinero-pedidos-routing.module';

import { CocineroPedidosPage } from './cocinero-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CocineroPedidosPageRoutingModule
  ],
  declarations: [CocineroPedidosPage]
})
export class CocineroPedidosPageModule {}
