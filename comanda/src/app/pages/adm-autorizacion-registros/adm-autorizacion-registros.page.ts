import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

@Component({
  selector: 'app-adm-autorizacion-registros',
  templateUrl: './adm-autorizacion-registros.page.html',
  styleUrls: ['./adm-autorizacion-registros.page.scss'],
})
export class AdmAutorizacionRegistrosPage implements OnInit {
  listadoUsuarios: any;

  constructor(private navegador: Router,
    private usuariosService: UsuariosFirebaseService,
    private authSvc: AuthService,
    private emailService: EmailService,
    private menuController: MenuController   
    ) {
      this.MenuView();
      this.usuariosService.getAll().subscribe(resultado => {
        this.listadoUsuarios = resultado;
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
    this.usuariosService.guardarCambios(user);
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
    this.Navegar("home");
  }
}
