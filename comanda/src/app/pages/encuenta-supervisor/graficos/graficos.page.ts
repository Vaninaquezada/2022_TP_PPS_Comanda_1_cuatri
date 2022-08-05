import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { EncuestaSupervisor } from 'src/app/clases/encuesta-supervisor';
import { EncuentaGraficoBarrasComponent } from 'src/app/componentes/encuenta-grafico-barras/encuenta-grafico-barras.component';
import { EncuentaGraficoDoughnutComponent } from 'src/app/componentes/encuenta-grafico-doughnut/encuenta-grafico-doughnut.component';
import { EncuentaGraficoLineComponent } from 'src/app/componentes/encuenta-grafico-line/encuenta-grafico-line.component';
import { EncuentaGraficoPieComponent } from 'src/app/componentes/encuenta-grafico-pie/encuenta-grafico-pie.component';
import { AuthService } from 'src/app/services/auth.service';
import { EncuestasFirebaseService } from 'src/app/services/encuestas-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit {

  listadoUsuariosClientes: EncuestaSupervisor[];
  listadoEncuestaEmpleados: EncuestaSupervisor[];
  listadoEncuestaRespuestas: EncuestaSupervisor[];
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
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(false, 'empleadosMenu');
    this.menuController.enable(true, 'adminMenu');
  }
  navegar(ruta: string){
    console.log('entra en navegar');
    this.navegador.navigate([ruta]);
  }

  ngOnInit() {
    this.encuesta.getSupervisorCliente().subscribe(resultado => {
      this.listadoUsuariosClientes = resultado;
      console.log('entra en navegar',this.listadoUsuariosClientes);

    });
    this.encuesta.getSupervisorEmpleado().subscribe(resultado => {
      this.listadoEncuestaEmpleados = resultado;
      console.log('entra en navegar',this.listadoEncuestaEmpleados);
      console.log('entra en resultado',resultado);
    });
  }


  async presentModal(pregunta: string, quien: string) {
    this.dataModal(pregunta,this.listadoEncuestaEmpleados);
    let listadoUsuariosEmpleados= this.listadoUsuariosClientes;
    let preguntaText = this.pregunta;
    let respuesta=this.respuesta;


    if(quien === 'cliente'){
      this.dataModal(pregunta,this.listadoUsuariosClientes);
       listadoUsuariosEmpleados= this.listadoUsuariosClientes;
       preguntaText = this.pregunta;
       respuesta=this.respuesta;
  
    }

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

  async presentModalBar(pregunta: string, quien: string) {
    this.dataModal(pregunta,this.listadoEncuestaEmpleados);
    let listadoUsuariosEmpleados= this.listadoUsuariosClientes;
    let preguntaText = this.pregunta;
    let respuesta=this.respuesta;


    if(quien === 'cliente'){
      this.dataModal(pregunta,this.listadoUsuariosClientes);
       listadoUsuariosEmpleados= this.listadoUsuariosClientes;
       preguntaText = this.pregunta;
       respuesta=this.respuesta;
  
    }

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

  async presentModalLine(pregunta: string, quien: string) {
    this.dataModal(pregunta,this.listadoEncuestaEmpleados);
    let listadoUsuariosEmpleados= this.listadoUsuariosClientes;
    let preguntaText = this.pregunta;
    let respuesta=this.respuesta;


    if(quien === 'cliente'){
      this.dataModal(pregunta,this.listadoUsuariosClientes);
       listadoUsuariosEmpleados= this.listadoUsuariosClientes;
       preguntaText = this.pregunta;
       respuesta=this.respuesta;
  
    }

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

  async presentModalPie(pregunta: string, quien: string) {
    this.dataModal(pregunta,this.listadoEncuestaEmpleados);
    let listadoUsuariosEmpleados= this.listadoUsuariosClientes;
    let preguntaText = this.pregunta;
    let respuesta=this.respuesta;


    if(quien === 'cliente'){
      this.dataModal(pregunta,this.listadoUsuariosClientes);
       listadoUsuariosEmpleados= this.listadoUsuariosClientes;
       preguntaText = this.pregunta;
       respuesta=this.respuesta;
  
    }
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



  dataModal(pregunta, listado){
    this.respuesta = [];
    listado.forEach(element => {

      if(pregunta === 'respuesta1'){
       this.pregunta = element.pregunta1;
       console.log('respuesta1',element.respuesta1);
       this.respuesta.push(element.respuesta1);
      };
      if(pregunta === 'respuesta2'){
        this.pregunta = element.pregunta2;
        this.respuesta.push(element.respuesta2);

       };
       if(pregunta === 'respuesta3'){
        this.pregunta = element.pregunta3;
        this.respuesta.push(element.respuesta3);

       };
       if(pregunta === 'respuesta4'){
        this.pregunta = element.pregunta4;
        this.respuesta.push(element.respuesta4);

       };
     });
  }


}
