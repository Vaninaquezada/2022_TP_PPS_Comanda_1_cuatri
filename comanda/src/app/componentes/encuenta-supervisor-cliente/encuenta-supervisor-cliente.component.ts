import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { EncuestaSupervisor } from 'src/app/clases/encuesta-supervisor';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { EncuestasFirebaseService } from 'src/app/services/encuestas-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-encuenta-supervisor-cliente',
  templateUrl: './encuenta-supervisor-cliente.component.html',
  styleUrls: ['./encuenta-supervisor-cliente.component.scss'],
})
export class EncuentaSupervisorClienteComponent implements OnInit {

  forma: FormGroup;
  usuario: User;
  valor = 'Buena';
  constructor(
    private navegador: Router,
    private fb: FormBuilder,
    private usuarioService: UsuariosFirebaseService,
    private authSvc: AuthService,
    private utilidadesService: UtilidadesService,
    private encuestaService: EncuestasFirebaseService,
    private modalController: ModalController,
    private navParams: NavParams
    ) {

  }

  ngOnInit() {
    this.usuario = this.navParams.data.usuario;

    this.forma = this.fb.group({
      pregunta1: ['', Validators.required],
      pregunta2: ['', Validators.required],
      pregunta3: ['', Validators.required],
      pregunta5: ['', Validators.required]
    });
  }

  async enviarEncuesta(){
    // console.log(Number(this.forma.get('notaEmpleados').value));
    //this.utilidadesService.PresentarLoading('Enviando Encuesta');

    const encuesta: EncuestaSupervisor = {
      usuario: this.usuario,
      tipoEncuesta: 'cliente',
      pregunta1:'Limpieza del cliente',
      respuesta1: this.forma.get('pregunta1').value,
      pregunta2: 'Comportamiento del cliente',
      respuesta2:Number(this.forma.get('pregunta2').value) ,
      pregunta3:'El cliente es problematico',
      respuesta3:Number(this.forma.get('pregunta3').value) ,
      pregunta4:'Trato al personal',
      respuesta4:this.valor,
      comentarios: this.forma.get('pregunta5').value,
      fecha: new Date(),
    };
    console.log('hola');
    console.log(this.valor);
    console.log(encuesta);
     this.utilidadesService.RemoverLoading();
    await this.encuestaService.nuevaEncuestaSupervisor(encuesta);
    this.utilidadesService.RemoverLoading();
    this.cerrarModal();

  }

  checkBoxLongiClick(e){
    this.valor = e.currentTarget.getAttribute('value');
  }


  cerrarModal() {

    this.modalController.dismiss();
  }

}
