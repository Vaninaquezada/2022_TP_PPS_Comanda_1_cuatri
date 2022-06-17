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
    private barcodeSanner: BarcodeScannerService,
    private uploadPhoto: FotoService,
    private utilidadesService: UtilidadesService) { }


  ngOnInit(): void {
    this.registerForm = this.formBuild.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', Validators.required),
      dni: new FormControl('', [Validators.required]),
    });
  }

  async register() {
    console.log('registro');
    this.utilidadesService.PresentarLoading('<img src="../assets/spinner.svg" class="img-align"  />   Creando usuario');
    if (this.registerForm.valid && this.photo !== null) {
      const usuario = this.registerForm.value as User;
      usuario.role = 'cliente';
      usuario.subTipo = 'registrado';
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
      name: user.name,
      lastName: user.lastName,
      dni: user.dni,
    });
  }
}
