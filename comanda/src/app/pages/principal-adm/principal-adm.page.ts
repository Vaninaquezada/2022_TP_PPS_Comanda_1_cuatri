import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-principal-adm',
  templateUrl: './principal-adm.page.html',
  styleUrls: ['./principal-adm.page.scss'],
})
export class PrincipalAdmPage implements OnInit {
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
    this.MenuView();
    this.usuarioService.getAllClientes().subscribe(resultado => {
      this.listadoUsuariosClientes = resultado;
    })
  }

  ngOnInit() {
  }
  MenuView(){
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(false, 'empleadosMenu');
    this.menuController.enable(true, 'adminMenu');
  }

  Habilitacion(user: User){
    user.verificadoPorAdm = !user.verificadoPorAdm;
    this.usuarioService.guardarCambios(user);
    if(user.verificadoPorAdm){
      this.emailService.sendEmail(user,"Felicidades, tu habilitación fue Aprobada. Ya puedes ingresar con tus credenciales.");
    }else{
      this.emailService.sendEmail(user,"Lo sentimos, tu habilitación fue Rechazada. Por cualquier consulta no dudes en responder a este correo electronico.");
    }    
  }

  Navegar(ruta: string){
    console.log("entra en navegar");
    this.navegador.navigate([ruta]);
  }

  Desconectarse(){
    this.authSvc.LogOut();
    this.role = "";
    this.Navegar("home");
  }


}
