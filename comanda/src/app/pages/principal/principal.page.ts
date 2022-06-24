import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { MenuController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  code: any;
  constructor(private navegador: Router, private authSvc: AuthService, private barcodeScanner: BarcodeScanner, private utilidadesService: UtilidadesService, private menuController: MenuController) { 
    this.MenuView();
  }
  
  
  ngOnInit() {
  }

  MenuView(){
    this.menuController.enable(true, 'clientesMenu');
    this.menuController.enable(false, 'adminMenu');
  }


  Scan(): void{

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.code = barcodeData.text;
        switch (this.code) {
          case "JYCjbOgLWRTzkfyknquy": //Mesa 1
            this.utilidadesService.PresentarToastAbajo("Mesa 1", "success"); 
            this.Navegar('listado-productos');
            break;

          case "zZCtyY4gqhvEkkK2RyxD": //Mesa 2
            this.utilidadesService.PresentarToastAbajo("Mesa 2", "success"); 
            this.Navegar('listado-productos');
            
            break;

          case "BVIBfLHDswZd77dWWCLR": //Mesa 3
            this.utilidadesService.PresentarToastAbajo("Mesa 3", "success"); 
            this.Navegar('listado-productos');
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
