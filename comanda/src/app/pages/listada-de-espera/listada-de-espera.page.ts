import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { IngresoLocal } from 'src/app/clases/ingreso-local';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { ListaDeEsperaFirebaseService } from 'src/app/services/lista-de-espera-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

@Component({
  selector: 'app-listada-de-espera',
  templateUrl: './listada-de-espera.page.html',
  styleUrls: ['./listada-de-espera.page.scss'],
})
export class ListadaDeEsperaPage implements OnInit {

  listaDeEspera: any;

  constructor(private navegador: Router,
    private usuariosService: UsuariosFirebaseService,
    private listaEsperaService: ListaDeEsperaFirebaseService,
    private authSvc: AuthService,
    private emailService: EmailService,
    private menuController: MenuController   
    ) {
      this.MenuView();
      this.listaEsperaService.getAll().subscribe(resultado => {
        this.listaDeEspera = resultado;
    })
  }

  ngOnInit() {
  }
  
  MenuView(){
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(true, 'empleadosMenu');
    this.menuController.enable(false, 'adminMenu');
  }

  Habilitacion(ingreso: IngresoLocal){
    ingreso.estado = "aprobado";
    this.listaEsperaService.guardarCambios(ingreso);    
  }

  Cancelacion(ingreso: IngresoLocal){
    ingreso.estado = "cancelado";
    this.listaEsperaService.guardarCambios(ingreso);
  }

  Navegar(ruta: string){
    console.log("entra en navegar");
    this.navegador.navigate([ruta]);
  }

  Desconectarse(){
    this.authSvc.LogOut();
    this.Navegar("home");
  }
}