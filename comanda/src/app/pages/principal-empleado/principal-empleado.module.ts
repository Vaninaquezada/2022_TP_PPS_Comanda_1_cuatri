import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalEmpleadoPageRoutingModule } from './principal-empleado-routing.module';

import { PrincipalEmpleadoPage } from './principal-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalEmpleadoPageRoutingModule
  ],
  declarations: [PrincipalEmpleadoPage]
})
export class PrincipalEmpleadoPageModule {}
