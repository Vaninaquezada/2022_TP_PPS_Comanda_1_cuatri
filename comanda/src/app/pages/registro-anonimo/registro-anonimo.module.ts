import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAnonimoPageRoutingModule } from './registro-anonimo-routing.module';

import { RegistroAnonimoPage } from './registro-anonimo.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistroAnonimoPageRoutingModule
  ],
  declarations: [RegistroAnonimoPage]
})
export class RegistroAnonimoPageModule {}
