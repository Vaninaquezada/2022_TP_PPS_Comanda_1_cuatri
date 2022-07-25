import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { EncuentaSupervisorEmpleadoComponent }
from 'src/app/componentes/encuenta-supervisor-empleado/encuenta-supervisor-empleado.component';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.page.html',
  styleUrls: ['./lista-empleados.page.scss'],
})
export class ListaEmpleadosPage implements OnInit {

  listadoUsuariosClientes: any;

  public role: string = localStorage.getItem('role');

  constructor(
    private navegador: Router,
    private usuarioService: UsuariosFirebaseService,
    private authSvc: AuthService,
    private utilidadesService: UtilidadesService,
    private emailService: EmailService,
    private menuController: MenuController,
    private modal: ModalController,
  ) {
    this.menuView();
    this.usuarioService.getAllEmpleados().subscribe(resultado => {
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

  async presentModal(usuario: User) {
    const modal = await this.modal.create({
      component: EncuentaSupervisorEmpleadoComponent,
      swipeToClose: true,
      presentingElement: await this.modal.getTop(),
      backdropDismiss: false,
      componentProps: {
        usuario,

      },
    });
    return await modal.present();

  }

}
