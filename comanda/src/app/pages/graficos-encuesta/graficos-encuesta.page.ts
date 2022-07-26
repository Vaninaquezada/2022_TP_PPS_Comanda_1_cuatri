import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Encuestas } from 'src/app/clases/encuestas';
import { EncuentaGraficoBarrasComponent } from 'src/app/componentes/encuenta-grafico-barras/encuenta-grafico-barras.component';
import { EncuentaGraficoDoughnutComponent } from 'src/app/componentes/encuenta-grafico-doughnut/encuenta-grafico-doughnut.component';
import { EncuentaGraficoLineComponent } from 'src/app/componentes/encuenta-grafico-line/encuenta-grafico-line.component';
import { EncuentaGraficoPieComponent } from 'src/app/componentes/encuenta-grafico-pie/encuenta-grafico-pie.component';
import { AuthService } from 'src/app/services/auth.service';
import { EncuestasFirebaseService } from 'src/app/services/encuestas-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-graficos-encuesta',
  templateUrl: './graficos-encuesta.page.html',
  styleUrls: ['./graficos-encuesta.page.scss'],
})
export class GraficosEncuestaPage implements OnInit {
  listadoUsuariosClientes: Encuestas[];
  listadoEncuesta: Encuestas[];
  listadoEncuestaRespuestas: Encuestas[];
  respuesta= [];
  pregunta= '';

  constructor(
    private navegador: Router,
    private usuarioService: UsuariosFirebaseService,
    private authSvc: AuthService,
    private utilidadesService: UtilidadesService,
    private menuController: MenuController,
    private modal: ModalController,
    private  encuesta: EncuestasFirebaseService
  ) {
    this.menuView();

  }

  menuView(){
    this.menuController.enable(true, 'clientesMenu');
    this.menuController.enable(false, 'empleadosMenu');
    this.menuController.enable(false, 'adminMenu');
  }
  navegar(ruta: string){
    console.log('entra en navegar');
    this.navegador.navigate([ruta]);
  }

  ngOnInit() {
    this.encuesta.getAll().subscribe(resultado => {
      this.listadoEncuesta = resultado;
      console.log('entra en navegar',this.listadoUsuariosClientes);

    });
  }


  async presentModal(pregunta: string) {
    this.dataModal(pregunta);

   const listadoUsuariosEmpleados= this.listadoEncuesta;
   const preguntaText = this.pregunta;
   const respuesta= this.respuesta;


    const modal = await this.modal.create({
      component: EncuentaGraficoDoughnutComponent,
      swipeToClose: true,
      presentingElement: await this.modal.getTop(),
      backdropDismiss: false,
      componentProps: {
        listadoUsuariosEmpleados,
        preguntaText,
        respuesta,

      },
    });
    return await modal.present();

  }

  async presentModalBar(pregunta: string) {
    this.dataModal(pregunta);

   const listadoUsuariosEmpleados= this.listadoEncuesta;
   const preguntaText = this.pregunta;
   const respuesta=this.respuesta;

   console.log('listadoEncuestaEmpleados'+ this.listadoEncuesta);


    const modal = await this.modal.create({
      component: EncuentaGraficoBarrasComponent,
      swipeToClose: true,
      presentingElement: await this.modal.getTop(),
      backdropDismiss: false,
      componentProps: {
        listadoUsuariosEmpleados,
        preguntaText,
        respuesta,

      },
    });
    return await modal.present();

  }

  async presentModalLine(pregunta: string) {
    this.dataModal(pregunta);

   const listadoUsuariosEmpleados= this.listadoEncuesta;
   const preguntaText = this.pregunta;
   const respuesta=this.respuesta;

   console.log('listadoEncuestaEmpleados'+ this.listadoEncuesta);


    const modal = await this.modal.create({
      component: EncuentaGraficoLineComponent,
      swipeToClose: true,
      presentingElement: await this.modal.getTop(),
      backdropDismiss: false,
      componentProps: {
        listadoUsuariosEmpleados,
        preguntaText,
        respuesta,

      },
    });
    return await modal.present();

  }

  async presentModalPie(pregunta: string) {
    this.dataModal(pregunta);
   const listadoUsuariosEmpleados= this.listadoEncuesta;
   const preguntaText = this.pregunta;
   const respuesta=this.respuesta;

   console.log('listadoEncuestaEmpleados'+ this.listadoEncuesta);


    const modal = await this.modal.create({
      component: EncuentaGraficoPieComponent,
      swipeToClose: true,
      presentingElement: await this.modal.getTop(),
      backdropDismiss: false,
      componentProps: {
        listadoUsuariosEmpleados,
        preguntaText,
        respuesta,

      },
    });
    return await modal.present();

  }



  dataModal(pregunta){
    this.respuesta = [];
    console.log( this.listadoEncuesta);
    this.listadoEncuesta.forEach(element => {
      console.log(element);

      if(pregunta === 'notaEmpleados'){


        console.log(pregunta);
       this.pregunta = 'Puntuacion  Empleados';
       this.respuesta.push(element.notaEmpleados);
       console.log(this.respuesta);
      };
      if(pregunta === 'notaLugar'){
        this.pregunta = 'Puntuacion Lugar';
        this.respuesta.push(element.notaLugar);

       };
       if(pregunta === 'recomendacion'){
        this.pregunta = 'Recomendacion';
        this.respuesta.push(element.recomendacion);

       };

     });
  }



}
