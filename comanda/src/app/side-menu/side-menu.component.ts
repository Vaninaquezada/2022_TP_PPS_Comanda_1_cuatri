import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  public role: string = localStorage.getItem('role');
  usuario: User;
  existe = false;
  constructor(
    private navegador: Router,
    private usuarioService: UsuariosFirebaseService,
    private authSvc: AuthService,
    private menuControl: MenuController
  ) { }

  ngOnInit() {
    try {
          this.usuario = this.usuarioService.usuarioSeleccionado;
          if (this.usuario !== undefined){
            if (this.usuario.encuestaCompletada !== undefined || this.usuario.encuestaCompletada !== null){
                this.existe = true;
            }
          }
    } catch (error) {
    }

  }

  Navegar(ruta: string){
    console.log("entra en navegar");
    this.navegador.navigate([ruta]);
    this.menuControl.toggle();
  }

  Desconectarse(){
    this.authSvc.LogOut();    
    this.Navegar("home");
  }

}
