import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReservaMesasPageRoutingModule } from './reserva-mesas-routing.module';
import { ReservaMesasPage } from './reserva-mesas.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaMesasPageRoutingModule
  ],
  declarations: [ReservaMesasPage]
})
export class ReservaMesasPageModule {}
