import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaClientesPageRoutingModule } from './lista-clientes-routing.module';

import { ListaClientesPage } from './lista-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ListaClientesPageRoutingModule
  ],
  declarations: [ListaClientesPage]
})
export class ListaClientesPageModule {}
