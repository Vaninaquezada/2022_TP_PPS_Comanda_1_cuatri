import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListaDeEsperaFirebaseService } from '../services/lista-de-espera-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listaDeEspera: any;
  constructor(private navegador: Router, private listaService: ListaDeEsperaFirebaseService) {
    this.listaService.getAllToday().subscribe(resultado => {
      this.listaDeEspera = resultado;
      console.log(this.listaDeEspera);
    })
    
  }

  Navegar(ruta: string){
    this.navegador.navigate([ruta]);
  }

}
