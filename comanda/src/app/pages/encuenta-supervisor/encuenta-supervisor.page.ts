import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-encuenta-supervisor',
  templateUrl: './encuenta-supervisor.page.html',
  styleUrls: ['./encuenta-supervisor.page.scss'],
})
export class EncuentaSupervisorPage implements OnInit {

  listadoUsuariosClientes: any;

  public role: string = localStorage.getItem('role');

  constructor(
    private navegador: Router,
    private usuarioService: UsuariosFirebaseService,
    private authSvc: AuthService,
    private utilidadesService: UtilidadesService,
    private emailService: EmailService,
    private menuController: MenuController
  ) {
    this.menuView();
    this.usuarioService.getAllClientes().subscribe(resultado => {
      this.listadoUsuariosClientes = resultado;
    });
  }

  ngOnInit() {
  }
  menuView(){
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(false, 'empleadosMenu');
    this.menuController.enable(true, 'adminMenu');
  }
  navegar(ruta: string){
    console.log('entra en navegar');
    this.navegador.navigate([ruta]);
  }

  desconectarse(){
    this.authSvc.LogOut();
    this.role = '';
    this.navegar('home');
  }
}
