import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { MenuController } from '@ionic/angular';
import { IngresoLocal } from 'src/app/clases/ingreso-local';

import { AuthService } from 'src/app/services/auth.service';
import { ListaDeEsperaFirebaseService } from 'src/app/services/lista-de-espera-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { PushOneSignalService } from 'src/app/services/push-one-signal.service';
import { MesaService } from 'src/app/services/mesa.service';
import { User } from 'src/app/clases/user';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  listaMesas: any;
  usuario: User;
  mesaNumero: string;

  public forma: FormGroup;
  code: any;
  constructor(private navegador: Router,
    private authSvc: AuthService,
    private fb: FormBuilder,
    private mesaService: MesaService,
    private usuarioService: UsuariosFirebaseService,
    private barcodeScanner: BarcodeScanner,
    private utilidadesService: UtilidadesService,
    private menuController: MenuController,
    private listaEsperaService: ListaDeEsperaFirebaseService,
    private pushOneSignal: PushOneSignalService
  ) {
    this.MenuView();
    this.mesaService.getAll().subscribe(resultado => {
      this.listaMesas = resultado;
    })
  }


  ngOnInit() {
    this.forma = this.fb.group({
      'cantidadPersonas': ['', Validators.required],
    });
    this.usuario = this.usuarioService.usuarioSeleccionado;
  }

  MenuView() {
    this.menuController.enable(true, 'clientesMenu');
    this.menuController.enable(false, 'adminMenu');
    this.menuController.enable(false, 'empleadosMenu');
  }


  async Scan() {
    await this.mesaService.actualizarEstadoMesasSegunReservas();
    await this.usuarioService.obtenerUsuario(localStorage.getItem("usuario"));
    // this.utilidadesService.PresentarLoading("Ingresando a lista de espera.");            
    /*
                 let ingreso: IngresoLocal = {
                   cliente: this.usuarioService.usuarioSeleccionado,
                   estado: 'esperando',
                   cantidadPersonas: Number(this.forma.get('cantidadPersonas').value),
                   fechaIngreso: new Date(),
                 };
                
                 this.listaEsperaService.nuevoIngreso(ingreso);
    
                 
                this.usuarioService.obtenerPushIdMetres().then(response=>{
                  console.log("this.metrePushIds"+JSON.stringify(this.usuarioService.metresPushIds));
                  this.pushOneSignal.enviarNotifAnonimoPendienteDelMetre( this.usuarioService.metresPushIds,"Info adicional bla");
                });
                this.Navegar('mesa');
    */
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.code = barcodeData.text;

      switch (this.code) {
        case "listaDeEspera": //Ingreso lista de espera

          let ingreso: IngresoLocal = {
            cliente: this.usuarioService.usuarioSeleccionado,
            estado: 'esperando',
            cantidadPersonas: Number(this.forma.get('cantidadPersonas').value),
            fechaIngreso: new Date(),
          };

          this.listaEsperaService.nuevoIngreso(ingreso);

          this.usuarioService.obtenerPushIdMetres().then(response => {
            console.log("this.metrePushIds" + JSON.stringify(this.usuarioService.metresPushIds));
            this.pushOneSignal.enviarNotifAnonimoPendienteDelMetre(this.usuarioService.metresPushIds, "Info adicional bla");
          });
          this.Navegar('mesa');
          break;

        case "JYCjbOgLWRTzkfyknquy": //Mesa 1
          for (let index = 0; index < this.listaMesas.length; index++) {
            const element = this.listaMesas[index];
            if (element.id == "JYCjbOgLWRTzkfyknquy") {
              if (element.estado == "Esperando reserva" && element.usuarioConReserva === this.usuario.id) {
                this.utilidadesService.PresentarToastAbajo("Mesa 1", "success");
                this.mesaService.update("JYCjbOgLWRTzkfyknquy", { estado: "ocupado", cliente: this.usuario.id });
                this.usuario.mesaId = "JYCjbOgLWRTzkfyknquy";
                this.usuario.numeroMesa = 1;
                this.usuarioService.guardarCambios(this.usuario);
                this.Navegar('mesa');
                break;
              } else {
                this.utilidadesService.PresentarToastAbajo("Mesa 1 no disponible", "danger");
                break;
              }
            }
          }
          break;

        case "zZCtyY4gqhvEkkK2RyxD": //Mesa 2
          for (let index = 0; index < this.listaMesas.length; index++) {
            const element = this.listaMesas[index];
            if (element.id == "zZCtyY4gqhvEkkK2RyxD") {
              if (element.estado == "Esperando reserva" && element.usuarioConReserva === this.usuario.id) {
                this.utilidadesService.PresentarToastAbajo("Mesa 2", "success");
                this.mesaService.update("zZCtyY4gqhvEkkK2RyxD", { estado: "ocupado", cliente: this.usuario.id });
                this.usuario.mesaId = "zZCtyY4gqhvEkkK2RyxD";
                this.usuario.numeroMesa = 2;
                this.usuarioService.guardarCambios(this.usuario);
                this.Navegar('mesa');
                break;
              } else {
                this.utilidadesService.PresentarToastAbajo("Mesa 2 no disponible", "danger");
                break;
              }
            }
          }
          break;

        case "BVIBfLHDswZd77dWWCLR": //Mesa 3
          for (let index = 0; index < this.listaMesas.length; index++) {
            const element = this.listaMesas[index];
            if (element.id == "BVIBfLHDswZd77dWWCLR") {
              if (element.estado == "Esperando reserva" && element.usuarioConReserva === this.usuario.id) {
                this.utilidadesService.PresentarToastAbajo("Mesa 3", "success");
                this.mesaService.update("BVIBfLHDswZd77dWWCLR", { estado: "ocupado", cliente: this.usuario.id });
                this.usuario.mesaId = "BVIBfLHDswZd77dWWCLR";
                this.usuario.numeroMesa = 3;
                this.usuarioService.guardarCambios(this.usuario);
                this.Navegar('mesa');
                break;
              } else {
                this.utilidadesService.PresentarToastAbajo("Mesa 3 no disponible", "danger");
                break;
              }
            }
          }
          break;
        default:
          this.utilidadesService.PresentarToastAbajo("Código Invalido", "danger");
          break;
      }}).catch(err => {
      console.log('Error', err);
    });

  }

  Navegar(ruta: string) {
    console.log("entra en navegar");
    this.navegador.navigate([ruta]);
  }


}
