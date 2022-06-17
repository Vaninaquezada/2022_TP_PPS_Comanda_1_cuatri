import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroDueniosSupervisoresPageRoutingModule } from './registro-duenios-supervisores-routing.module';

import { RegistroDueniosSupervisoresPage } from './registro-duenios-supervisores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroDueniosSupervisoresPageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [RegistroDueniosSupervisoresPage]
})
export class RegistroDueniosSupervisoresPageModule {}
