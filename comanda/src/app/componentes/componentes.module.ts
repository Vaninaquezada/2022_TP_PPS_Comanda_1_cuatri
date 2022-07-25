import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarcodeDniComponent } from './barcode-dni/barcode-dni.component';
import { FotosProductoComponent } from './fotos-producto/fotos-producto.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import {SwiperModule} from 'swiper/angular';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { QrpropinaComponent } from './qrpropina/qrpropina.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncuentaSupervisorEmpleadoComponent } from './encuenta-supervisor-empleado/encuenta-supervisor-empleado.component';
import { EncuentaSupervisorClienteComponent } from './encuenta-supervisor-cliente/encuenta-supervisor-cliente.component';
import { EncuentaGraficoBarrasComponent } from './encuenta-grafico-barras/encuenta-grafico-barras.component';
import { EncuentaGraficoDoughnutComponent } from './encuenta-grafico-doughnut/encuenta-grafico-doughnut.component';
import { EncuentaSupervisorPage } from '../pages/encuenta-supervisor/encuenta-supervisor.page';
import { EncuentaGraficoLineComponent } from './encuenta-grafico-line/encuenta-grafico-line.component';
import { EncuentaGraficoPieComponent } from './encuenta-grafico-pie/encuenta-grafico-pie.component';


@NgModule({
  declarations: [FotosProductoComponent,CuentaComponent,EncuentaSupervisorClienteComponent,
    EncuentaSupervisorEmpleadoComponent,
    EncuentaGraficoBarrasComponent,
    EncuentaGraficoDoughnutComponent,EncuentaGraficoLineComponent,EncuentaGraficoPieComponent],
  imports: [
    CommonModule,
    SwiperModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule

  ],
  exports: [BarcodeDniComponent,EncuentaSupervisorClienteComponent
    ,EncuentaGraficoBarrasComponent,EncuentaSupervisorEmpleadoComponent,
    FotosProductoComponent,CuentaComponent,QrpropinaComponent,EncuentaGraficoBarrasComponent,EncuentaGraficoDoughnutComponent,
    EncuentaGraficoLineComponent,EncuentaGraficoPieComponent]
})
export class ComponentesModule { }
