import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { MenuController } from '@ionic/angular';
import { Encuestas } from 'src/app/clases/encuestas';
import { EncuestasFirebaseService } from 'src/app/services/encuestas-firebase.service';
import { FotoService } from 'src/app/services/foto.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';


@Component({
  selector: 'app-encuesta-empleado',
  templateUrl: './encuesta-empleado.page.html',
  styleUrls: ['./encuesta-empleado.page.scss'],
})
export class EncuestaEmpleadoPage implements OnInit {

  photo: Photo = null;
  registerForm: FormGroup;
  photoUrl = '';

  constructor(private router: Router,
    private encuestaService: EncuestasFirebaseService,

    private usuarioService: UsuariosFirebaseService,
     private utilidadesService: UtilidadesService,
      private formBuild: FormBuilder, private uploadPhoto: FotoService) {
        
       }

  ngOnInit() {
    this.registerForm = this.formBuild.group({
      limpieza: new FormControl('', [Validators.required]),
      orden: new FormControl('', [Validators.required]),
      calificacion: new FormControl('', [Validators.required]),
    });

  }

  async getPhoto() {
    this.photo = await this.uploadPhoto.takePhoto();
    this.photoUrl = this.photo.dataUrl;
  }

  EstadoOrden($event) {
    this.registerForm.controls.orden.setValue($event.detail.value);
  }

  EstadoLimpieza($event) {
    this.registerForm.controls.limpieza.setValue($event.detail.value);
  }

  async enviarEncuesta() {
    await this.utilidadesService.PresentarLoading('Enviando encuesta..');
    await this.usuarioService.obtenerUsuario(localStorage.getItem("usuario"));

    if (this.registerForm.valid && this.photo !== null) {

      let encuesta: Encuestas = {
        usuario: this.usuarioService.usuarioSeleccionado,
        tipoEncuesta: 'empleado',
        puntuacionEspacioDeTrabajo: Number(this.registerForm.get('calificacion').value),
        ordenEspacioDeTrabajo: this.registerForm.get('orden').value,
        limpiezaEspacioDeTrabajo: this.registerForm.get('limpieza').value
      };
      await this.encuestaService.nuevaEncuesta(encuesta, this.photo);
      if (this.usuarioService.usuarioSeleccionado.subTipo === 'bartender') {
        this.router.navigate(['/bartender-pedidos']);
        this.utilidadesService.RemoverLoading();
      }
      if (this.usuarioService.usuarioSeleccionado.subTipo === 'cocinero') {
        this.router.navigate(['/cocinero-pedidos']);
        this.utilidadesService.RemoverLoading();
      }
      if (this.usuarioService.usuarioSeleccionado.subTipo === 'mozo') {
        this.router.navigate(['/mozo-pedidos']);
        this.utilidadesService.RemoverLoading();
      }
      if (this.usuarioService.usuarioSeleccionado.subTipo === 'metre') {
        this.router.navigate(['/lista-de-espera']);
        this.utilidadesService.RemoverLoading();
      }
    } else {
      this.utilidadesService.RemoverLoading();
      this.utilidadesService.PresentarToastAbajo('Falta foto', 'danger');
    }
  }




}
