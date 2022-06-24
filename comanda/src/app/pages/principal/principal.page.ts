import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { MenuController } from '@ionic/angular';
import { IngresoLocal } from 'src/app/clases/ingreso-local';

import { AuthService } from 'src/app/services/auth.service';
import { ListaDeEsperaFirebaseService } from 'src/app/services/lista-de-espera-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  
  public forma: FormGroup;
  code: any;
  constructor(private navegador: Router,
    private authSvc: AuthService,
    private fb: FormBuilder,
    private usuarioService: UsuariosFirebaseService,
    private barcodeScanner: BarcodeScanner,
    private utilidadesService: UtilidadesService,
    private menuController: MenuController,
    private listaEsperaService: ListaDeEsperaFirebaseService
    ) { 
    this.MenuView();
  }
  
  
  ngOnInit() {
    this.forma = this.fb.group({      
      'cantidadPersonas': ['', Validators.required],
    });
  }

  MenuView(){
    this.menuController.enable(true, 'clientesMenu');
    this.menuController.enable(false, 'adminMenu');
    this.menuController.enable(false, 'empleadosMenu');
  }


  async Scan(){

    await this.usuarioService.obtenerUsuario(localStorage.getItem("usuario"));

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.code = barcodeData.text;
        switch (this.code) {
          case "listaDeEspera": //Ingreso lista de espera
            this.utilidadesService.PresentarLoading("Ingresando a lista de espera.");            

            let ingreso: IngresoLocal = {
              cliente: this.usuarioService.usuarioSeleccionado,
              estado: 'esperando',
              cantidadPersonas: Number(this.forma.get('cantidadPersonas').value),
              fechaIngreso: new Date(),
            };
            
            this.listaEsperaService.nuevoIngreso(ingreso);

            this.Navegar('mesa');
            break;
        
          default:
            this.utilidadesService.PresentarToastAbajo("Código Invalido", "danger"); 
            break;
        }
       

     }).catch(err => {
         console.log('Error', err);
     });   

  }

  Navegar(ruta: string){
    console.log("entra en navegar");
    this.navegador.navigate([ruta]);
  }

}
