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
  audio = new Audio();
  public role: string = localStorage.getItem('role');
  usuario: User;
  constructor(
    private navegador: Router,
    private usuarioService: UsuariosFirebaseService,
    private authSvc: AuthService,
    private menuControl: MenuController
  ) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuarioSeleccionado;
  }

  Navegar(ruta: string){
    console.log('entra en navegar');
    this.navegador.navigate([ruta]);
    this.menuControl.toggle();
  }

  Desconectarse(){
    this.audio.src ='src/assets/sound/out.acc';
    this.audio.load();

   if( typeof this.usuario.sonido === 'undefined') {
     this.usuario.sonido = true;
    }else {
      if ( this.usuario.sonido) {
        this.audio.play();
      }
    }


    this.authSvc.LogOut();
    this.Navegar('home');
  }

}
