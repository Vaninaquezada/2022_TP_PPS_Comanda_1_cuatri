import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { SonidoService } from '../services/sonido.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  audio = new Audio();
  public user$: Observable<any> = this.authSvc.firebaseAuth.user;
  public role: string = localStorage.getItem('role');
  usuario: User;
  myvar= true;
  constructor(
    private navegador: Router,
    private usuarioService: UsuariosFirebaseService,
    private authSvc: AuthService,
    private menuControl: MenuController,
    private sonido: SonidoService
  ) {

  }

  ngOnInit() {

  }

  Navegar(ruta: string){
    console.log('entra en navegar');
    this.navegador.navigate([ruta]);
    this.menuControl.toggle();
  }

  Desconectarse(){

    this.authSvc.LogOut();
    this.sonido.sonidoLogOut();
    this.Navegar('home');
  }

  myMethod() {
    console.log('>>>>: ' + this.myvar);
    if (this.myvar) {
      this.sonido.activarSonido();
    } else {
      this.sonido.desactivarSonido();
    }
  }

}
