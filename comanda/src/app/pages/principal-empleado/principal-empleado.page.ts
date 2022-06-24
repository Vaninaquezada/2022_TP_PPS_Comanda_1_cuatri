import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-principal-empleado',
  templateUrl: './principal-empleado.page.html',
  styleUrls: ['./principal-empleado.page.scss'],
})
export class PrincipalEmpleadoPage implements OnInit {

  constructor(
    private router:Router,
    private menuController: MenuController
    ) {
      this.MenuView();
    }

  ngOnInit() {
  }

  MenuView(){
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(true, 'empleadosMenu');
    this.menuController.enable(false, 'adminMenu');
  }
  navegar(ruta: string){
    this.router.navigate([ruta]);
  }

}
