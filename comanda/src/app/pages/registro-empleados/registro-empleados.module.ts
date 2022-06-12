import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEmpleadosPageRoutingModule } from './registro-empleados-routing.module';

import { RegistroEmpleadosPage } from './registro-empleados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroEmpleadosPageRoutingModule
  ],
  declarations: [RegistroEmpleadosPage]
})
export class RegistroEmpleadosPageModule {}
