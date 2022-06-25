import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Pedidos } from 'src/app/clases/pedidos';
import { Plato } from 'src/app/clases/plato';
import { CuentaComponent } from 'src/app/componentes/cuenta/cuenta.component';
import { AuthService } from 'src/app/services/auth.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-pedidos-en-preparacion',
  templateUrl: './pedidos-en-preparacion.page.html',
  styleUrls: ['./pedidos-en-preparacion.page.scss'],
})
export class PedidosEnPreparacionPage implements OnInit {
  pedidosPreparando: Pedidos[];
  pedido: Pedidos;
  platos: Plato[];
  constructor(private modal: ModalController,
    private pedidoService: PedidosService,
    private preparacionService: PlatoService,
    private authSvc: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.pedidoService
      .getPedidos('preparando')
      .then((p) => p.subscribe((data) => (this.pedidosPreparando = data)));
  }
  async presentModal(pedido: Pedidos) {
   const pedidoId = pedido.pedidoId;
   const modal = await this.modal.create({
     component: CuentaComponent,
     swipeToClose: true,
     presentingElement: await this.modal.getTop(),
     backdropDismiss: false,
     componentProps: {
       pedido,
       pedidoId,
       boton: 'enpreparacion'
     },
   });
   return await modal.present();

 }

 singOut(){
  this.authSvc.LogOut();
  this.router.navigate(['login']);
}
}
