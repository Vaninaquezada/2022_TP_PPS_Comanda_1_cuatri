import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mozo-pedidos',
  templateUrl: './mozo-pedidos.page.html',
  styleUrls: ['./mozo-pedidos.page.scss'],
})
export class MozoPedidosPage implements OnInit {

  constructor(private router: Router,private authSvc: AuthService ) { }

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
}
