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
import { BarcodeScannerService } from 'src/app/services/barcode-scanner.service';
import { Router } from '@angular/router';
import { PushOneSignalService } from 'src/app/services/push-one-signal.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  photo: Photo = null;
  registerForm: FormGroup;
  photoUrl = '';
  constructor(
    private usuarioService: UsuariosFirebaseService,
    private formBuild: FormBuilder,
    private auth: AuthService,
    private uploadPhoto: FotoService,
    private router: Router,
    private utilidadesService: UtilidadesService,
    private pushOneSignal: PushOneSignalService) {


     }


  ngOnInit(): void {
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
      nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      dni: new FormControl('', [Validators.required, Validators.max(99999999),Validators.pattern('^[0-9]+$')]),
    });
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get errorControl() {
    return this.registerForm.controls;
  }
  async register() {
    console.log('registro');
    if (this.registerForm.value.password === this.registerForm.value.passwordR) {
      this.utilidadesService.PresentarLoading('Dando de alta cliente');
    if (this.registerForm.valid && this.photo !== null) {
      const usuario = this.registerForm.value as User;
      usuario.role = 'cliente';
      usuario.subTipo = 'registrado';
      usuario.pushId = '0';
     // this.auth.SignUp(this.registerForm.value.email, this.registerForm.value.password);
     console.log('llora');
      this.usuarioService.registarUsuarioFoto(
        usuario,
        this.registerForm.value.password,
        this.photo
      );
      this.usuarioService.obtenerPushIdAdmins().then(response=>{
        this.pushOneSignal.enviarNotifClienteParaHabilitar( this.usuarioService.adminsPushIds,'Info adicional bla');
      });

      this.registerForm.reset();
      this.photo = null;
      this.photoUrl = '';
      this.navegar('login' );
      
    }else{
      this.utilidadesService.RemoverLoading();
      this.utilidadesService.PresentarToastAbajo('Falta foto', 'danger');
    }
    }else{
      this.utilidadesService.PresentarToastAbajo('Las contraseñas no coinciden', 'danger');
      this.utilidadesService.RemoverLoading();
    }
  }



  async getPhoto() {
    this.photo = await this.uploadPhoto.takePhoto();
    this.photoUrl = this.photo.dataUrl;
  }

  async getBarcodeData(user: UsuarioBarcode) {
    this.registerForm.patchValue({
      nombre: user.nombre,
      apellido: user.apellido,
      dni: user.dni,
    });
  }

  navegar(ruta: string){
    this.registerForm.reset();
    this.photo = null;
    this.photoUrl = '';
    this.router.navigate([ruta]);
  }
}
