import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { MenuController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';
import { ListaDeEsperaFirebaseService } from 'src/app/services/lista-de-espera-firebase.service';
import { MesaService } from 'src/app/services/mesa.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';


@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
})
export class MesaPage implements OnInit {

  code: any;
  listaDeEspera: any;
  listaMesas: any;
  mostrar: boolean;
  
  constructor(
    private navegador: Router,
    private authSvc: AuthService,
    private mesaService: MesaService,
    private barcodeScanner: BarcodeScanner,
    private utilidadesService: UtilidadesService,
    private menuController: MenuController,
    private listaEsperaService: ListaDeEsperaFirebaseService
  )
  {
    this.MenuView();
    this.listaEsperaService.getAll().subscribe(resultado => {
      this.listaDeEspera = resultado;

    })
    this.mesaService.getAll().subscribe(resultado => {
      this.listaMesas = resultado;
    })

  }

  ngOnInit() {
  }

  MenuView(){
    this.menuController.enable(true, 'clientesMenu');
    this.menuController.enable(false, 'adminMenu');
    this.menuController.enable(false, 'empleadosMenu');
  }

  Scan(): void{
    for (let index = 0; index < this.listaDeEspera.length; index++) {
      const element = this.listaDeEspera[index];
      console.log(element.id)
      if(element.cliente.email == localStorage.getItem("usuario")){
        // console.log("coincide mail")
        if(element.estado == "aprobado"){          
          
          this.barcodeScanner.scan().then(barcodeData => {
            console.log('Barcode data', barcodeData);
            this.code = barcodeData.text;

              switch (this.code) {
                case "JYCjbOgLWRTzkfyknquy": //Mesa 1
                  for (let index = 0; index < this.listaMesas.length; index++) {
                    const element = this.listaMesas[index];
                    if(element.id == "JYCjbOgLWRTzkfyknquy"){
                      if(element.estado == "libre"){
                        this.utilidadesService.PresentarToastAbajo("Mesa 1", "success");                  
                        this.mesaService.update("JYCjbOgLWRTzkfyknquy", {estado: "ocupado"});
                        this.mostrar = true;               
                        break;
                      }else{
                        this.utilidadesService.PresentarToastAbajo("Mesa 1 no disponible", "danger");
                        break;
                      }
                    }
                  }
                  break;
                  
      
                case "zZCtyY4gqhvEkkK2RyxD": //Mesa 2
                  for (let index = 0; index < this.listaMesas.length; index++) {
                    const element = this.listaMesas[index];
                    if(element.id == "zZCtyY4gqhvEkkK2RyxD"){
                      if(element.estado == "libre"){
                        this.utilidadesService.PresentarToastAbajo("Mesa 2", "success");                  
                        this.mesaService.update("zZCtyY4gqhvEkkK2RyxD", {estado: "ocupado"});
                        this.mostrar = true;                
                        break;
                      }else{
                        this.utilidadesService.PresentarToastAbajo("Mesa 2 no disponible", "danger");
                        break;
                      }
                    }
                  }
                  break;
      
                case "BVIBfLHDswZd77dWWCLR": //Mesa 3
                  for (let index = 0; index < this.listaMesas.length; index++) {
                    const element = this.listaMesas[index];
                    if(element.id == "BVIBfLHDswZd77dWWCLR"){
                      if(element.estado == "libre"){
                        this.utilidadesService.PresentarToastAbajo("Mesa 3", "success");                  
                        this.mesaService.update("BVIBfLHDswZd77dWWCLR", {estado: "ocupado"});
                        this.mostrar = true;        
                        break;
                      }else{
                        this.utilidadesService.PresentarToastAbajo("Mesa 3 no disponible", "danger");
                        break;
                      }
                    }
                  }
                  break;          
              
                default:
                  this.utilidadesService.PresentarToastAbajo("PROBA CON OTRO CODIGO", "danger"); 
                  break;
              }           
      
           }).catch(err => {
               console.log('Error', err);
           });  


        }else{
          this.utilidadesService.PresentarToastAbajo("Aun no fue aprobado por el metre", "warning"); 
        }
      }else{
        this.utilidadesService.PresentarToastAbajo("Ustedes no esta en la lista de espera", "danger"); 
      }
    } 

  }

  
  Navegar(ruta: string){
    console.log("entra en navegar");
    this.navegador.navigate([ruta]);
  }

}
