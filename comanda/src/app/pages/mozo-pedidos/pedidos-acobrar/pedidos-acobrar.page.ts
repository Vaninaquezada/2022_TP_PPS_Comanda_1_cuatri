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
  selector: 'app-pedidos-acobrar',
  templateUrl: './pedidos-acobrar.page.html',
  styleUrls: ['./pedidos-acobrar.page.scss'],
})
export class PedidosACobrarPage implements OnInit {

  pedidosCobrar: Pedidos[];
  pedido: Pedidos;
  platos: Plato[];
  constructor(private pedidoService: PedidosService,
    private modal: ModalController,private router: Router,private authSvc: AuthService, private preparacionService: PlatoService) { }

  ngOnInit() {
    this.pedidoService
    .getPedidos('aCobrar')
    .then((p) => p.subscribe((data) => (this.pedidosCobrar = data)));
  }


  public cobrarPedido(pedido: Pedidos) {
    pedido.estado = 'aPagar';
    this.pedidoService.updatePedido(pedido);
    // liberar mesa
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
        boton: 'acobrar'
      },
    });
    return await modal.present();

  }
  singOut(){
    this.authSvc.LogOut();
    this.router.navigate(['login']);
  }
}
