import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Photo } from '@capacitor/camera';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { User,UsuarioBarcode} from 'src/app/clases/user';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { FotoService } from 'src/app/services/foto.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro-anonimo',
  templateUrl: './registro-anonimo.page.html',
  styleUrls: ['./registro-anonimo.page.scss'],
})
export class RegistroAnonimoPage implements OnInit {
  photo: Photo = null;
  registerForm: FormGroup;
  photoUrl = '';
  constructor(private usuarioService: UsuariosFirebaseService,
    private formBuild: FormBuilder,
    private auth: AuthService,
    private uploadPhoto: FotoService,
    private router: Router,
    private utilidadesService: UtilidadesService) {


    }

  ngOnInit() {
    this.registerForm = this.formBuild.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordR: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      nombre: new FormControl('', [Validators.required]),
    });

  }
  async register() {
    console.log('registro');
    if (this.registerForm.value.password === this.registerForm.value.passwordR) {
      this.utilidadesService.PresentarLoading('Creando usuario');
    if (this.registerForm.valid && this.photo !== null) {

      const usuario = this.registerForm.value as User;
      usuario.role = 'cliente';
      usuario.subTipo = 'anonimo';
      usuario.pushId = "0";
     // this.auth.SignUp(this.registerForm.value.email, this.registerForm.value.password);
     console.log('llora');
      this.usuarioService.registarUsuarioFoto(
        usuario,
        this.registerForm.value.password,
        this.photo
      );

      this.registerForm.reset();
      this.photo = null;
      this.photoUrl = '';
      this.utilidadesService.RemoverLoading();
      this.navegar('login' );
    }else{
      this.utilidadesService.RemoverLoading();
      this.utilidadesService.PresentarToastAbajo('Falta foto', 'danger');

    }
    }else{
      this.utilidadesService.RemoverLoading();
      this.utilidadesService.PresentarToastAbajo('Las contraseñas no coinciden', 'danger');

    }
  }



  async getPhoto() {
    this.photo = await this.uploadPhoto.takePhoto();
    this.photoUrl = this.photo.dataUrl;
  }

  navegar(ruta: string){
    this.registerForm.reset();
    this.photo = null;
    this.photoUrl = '';
    this.router.navigate([ruta]);
  }
}
