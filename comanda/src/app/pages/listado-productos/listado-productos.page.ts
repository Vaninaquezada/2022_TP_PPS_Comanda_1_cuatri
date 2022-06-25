import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Pedidos } from 'src/app/clases/pedidos';
import { Productos } from 'src/app/clases/productos';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';


@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.page.html',
  styleUrls: ['./listado-productos.page.scss'],
})
export class ListadoProductosPage implements OnInit {

  listadoProductos: any;
  

  constructor(private navegador: Router,
      private usuariosService: UsuariosFirebaseService,
      private authSvc: AuthService,
      private emailService: EmailService,
      private productosService: ProductosService,
      private menuController: MenuController
      
      ) {
        this.MenuView();
        this.productosService.getAll().subscribe(resultado => {
        this.listadoProductos = resultado;
    });
  }

  ngOnInit() {
  }

  MenuView(){
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(false, 'empleadosMenu');
    this.menuController.enable(true, 'adminMenu');
  }

  Navegar(ruta: string){
    console.log('entra en navegar');
    this.navegador.navigate([ruta]);
  }

  Desconectarse(){
    this.authSvc.LogOut();
    this.Navegar('home');
  }
}
