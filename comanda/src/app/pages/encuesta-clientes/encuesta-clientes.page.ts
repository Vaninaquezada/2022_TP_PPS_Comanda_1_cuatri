import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Encuestas } from 'src/app/clases/encuestas';
import { User} from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { EncuestasFirebaseService } from 'src/app/services/encuestas-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { Photo } from '@capacitor/camera';
import { FotoService } from 'src/app/services/foto.service';

@Component({
  selector: 'app-encuesta-clientes',
  templateUrl: './encuesta-clientes.page.html',
  styleUrls: ['./encuesta-clientes.page.scss'],
})
export class EncuestaClientesPage implements OnInit {

  public forma: FormGroup;
  photo1: Photo = null;
  photo2: Photo = null;
  photo3: Photo = null;
  photoUrl1 = '';
  photoUrl2 = '';
  photoUrl3 = '';
  tomada1: boolean;
  tomada2: boolean;
  tomada3: boolean;
  
  constructor(
    private navegador: Router,
    private fb: FormBuilder,
    private usuarioService: UsuariosFirebaseService,
    private authSvc: AuthService,
    private utilidadesService: UtilidadesService,
    private encuestaService: EncuestasFirebaseService,
    private uploadPhoto: FotoService,
    
    ) { 
    

  }

  ngOnInit() {
    this.forma = this.fb.group({
      'notaLugar': ['', Validators.required],
      'notaEmpleados': ['', Validators.required],
      'recomendacion': ['', Validators.required],
      'comentarios': ['', Validators.required],      
    });
  }

  async enviarEncuesta(){
    // console.log(Number(this.forma.get('notaEmpleados').value));
    this.utilidadesService.PresentarLoading("Enviando Encuesta");
    await this.usuarioService.obtenerUsuario(localStorage.getItem("usuario"));
    
    let encuesta: Encuestas = {
      usuario: this.usuarioService.usuarioSeleccionado,
      tipoEncuesta: 'cliente',
      notaLugar: Number(this.forma.get('notaLugar').value) ,
      notaEmpleados: Number(this.forma.get('notaEmpleados').value),
      recomendacion: this.forma.get('recomendacion').value,
      comentarios: this.forma.get('comentarios').value,
      fecha: new Date(),
    };

    if(this.tomada1){
      encuesta.photourl1 = this.photoUrl1;
      if(this.tomada2){
        encuesta.photourl2 = this.photoUrl2;
        if(this.tomada3){
          encuesta.photourl3 = this.photoUrl3;
        }
      }
    }

    this.encuestaService.nuevaEncuesta(encuesta);
    
    this.navegador.navigate(['/principal']);
  }




  async getPhoto1() {
    this.photo1 = await this.uploadPhoto.takePhoto();
    this.photoUrl1 = this.photo1.dataUrl;
    this.tomada1 = true;
  }

  async getPhoto2() {
    this.photo2 = await this.uploadPhoto.takePhoto();
    this.photoUrl2 = this.photo2.dataUrl;
    this.tomada2 = true;
  }

  async getPhoto3() {
    this.photo3 = await this.uploadPhoto.takePhoto();
    this.photoUrl3 = this.photo3.dataUrl;
    this.tomada3 = true;
  }

}
