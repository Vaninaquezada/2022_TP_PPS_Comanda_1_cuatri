import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorClientePageRoutingModule } from './error-cliente-routing.module';

import { ErrorClientePage } from './error-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorClientePageRoutingModule
  ],
  declarations: [ErrorClientePage]
})
export class ErrorClientePageModule {}
