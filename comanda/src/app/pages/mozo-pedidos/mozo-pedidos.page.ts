import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mozo-pedidos',
  templateUrl: './mozo-pedidos.page.html',
  styleUrls: ['./mozo-pedidos.page.scss'],
})
export class MozoPedidosPage implements OnInit {
  subtipo: string;
  constructor(private router: Router,private authSvc: AuthService,private menuController: MenuController) {
    this.subtipo = localStorage.getItem('subtipo');
    console.log(this.subtipo);
    this.MenuView();
  }

  ngOnInit() {
  }

  navegar(ruta: string){
    console.log('entra en navegar');
    this.router.navigate([ruta]);
  }
  signOut(){
    this.authSvc.LogOut();
    this.router.navigate(['login']);
  }

  MenuView(){
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(false, 'adminMenu');
    this.menuController.enable(true, 'mozoMenu');
    this.menuController.enable(false, 'metreMenu');
    this.menuController.enable(false, 'cocineroMenu');
    this.menuController.enable(false, 'bartenderMenu');
  }
}
