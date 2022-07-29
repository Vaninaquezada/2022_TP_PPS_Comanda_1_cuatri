import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListaDeEsperaFirebaseService } from '../services/lista-de-espera-firebase.service';
import { format, parseISO, addMinutes, subMinutes,getTime } from 'date-fns';
import { MesaService } from '../services/mesa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listaDeEspera: any;
  constructor(private navegador: Router, private listaService: ListaDeEsperaFirebaseService, private mesa:MesaService) {
    this.listaService.getAllToday().subscribe(resultado => {
      this.listaDeEspera = resultado;
      console.log(this.listaDeEspera);
    })
    console.log(getTime(new Date()));
    mesa.actualizarEstadoMesasSegunReservas();
  }

  Navegar(ruta: string){
    this.navegador.navigate([ruta]);
  }

}
