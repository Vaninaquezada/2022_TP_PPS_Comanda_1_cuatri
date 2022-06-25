import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarcodeDniComponent } from './barcode-dni/barcode-dni.component';
import { FotosProductoComponent } from './fotos-producto/fotos-producto.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import {SwiperModule} from 'swiper/angular';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [FotosProductoComponent,CuentaComponent],
  imports: [
    CommonModule,
    SwiperModule,
    IonicModule

  ],
  exports: [BarcodeDniComponent,FotosProductoComponent,CuentaComponent]
})
export class ComponentesModule { }
