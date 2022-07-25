import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuentaSupervisorPageRoutingModule } from './encuenta-supervisor-routing.module';

import { EncuentaSupervisorPage } from './encuenta-supervisor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncuentaSupervisorPageRoutingModule
  ],
  declarations: [EncuentaSupervisorPage]
})
export class EncuentaSupervisorPageModule {}
