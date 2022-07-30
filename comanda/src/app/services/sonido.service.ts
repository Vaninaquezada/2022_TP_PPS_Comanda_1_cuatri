import { Injectable } from '@angular/core';
import { User } from '../clases/user';
import { UsuariosFirebaseService } from './usuarios-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class SonidoService {

  audio = new Audio();
  usuario: User;
  constructor(private usuarioService: UsuariosFirebaseService,) {
    this.usuario = this.usuarioService.usuarioSeleccionado;
   }

  sonidoLogin(){
    this.audio.src= '/assets/sound/login.aac';
    this.audio.load();
    this.usuario = this.usuarioService.usuarioSeleccionado;
    console.log('sonido ' + this.usuario);
    if(this.usuario.sonido === true ){

          this.audio.play();
    }

  }
  returnSonido(){
    this.usuario = this.usuarioService.usuarioSeleccionado;
    return this.usuario.sonido;
  }

  desactivarSonido(){
    this.usuario = this.usuarioService.usuarioSeleccionado;
    this.usuario.sonido = false;
    this.usuarioService.guardarCambios(this.usuario);
  }
  activarSonido(){
    this.usuario = this.usuarioService.usuarioSeleccionado;
    this.usuario.sonido = true;
    this.usuarioService.guardarCambios(this.usuario);
  }

  sonidoLogOut(){
    this.audio.src= '/assets/sound/out2.aac';
    this.audio.load();
    this.usuario = this.usuarioService.usuarioSeleccionado;
    console.log('sonido ' + this.usuario);
    if(this.usuario.sonido === true ){

      this.audio.play();
    }
  }
}
