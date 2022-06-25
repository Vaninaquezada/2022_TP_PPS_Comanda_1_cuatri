import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pedidos } from 'src/app/clases/pedidos';
import { Plato } from 'src/app/clases/plato';
import { CuentaComponent } from 'src/app/componentes/cuenta/cuenta.component';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-pedidos-aconfirmar',
  templateUrl: './pedidos-aconfirmar.page.html',
  styleUrls: ['./pedidos-aconfirmar.page.scss'],
})
export class PedidosAConfirmarPage implements OnInit {
  pedidosConfirmar: Pedidos[];
  pedido: Pedidos;
  platos: Plato[];
  constructor(private pedidoService: PedidosService,private preparacionService: PlatoService,private modal: ModalController) { }

  ngOnInit() {

    this.pedidoService
    .getPedidos('pendiente')
    .then((p) => p.subscribe((data) => (this.pedidosConfirmar = data)));

  }


  async confirmarPedido(pedido: Pedidos) {
    pedido.estado = 'preparando';
    this.pedidoService.confirmarPedido(pedido);
    this.preparacionService
      .tieneComidasForPedido(pedido.pedidoId);
    //  .then((val) => (val ? this.notificationService.nuevasComidas() : null));
    this.preparacionService
      .tieneBebidasForPedido(pedido.pedidoId);
     // .then((val) => (val ? this.notificationService.nuevasBebidas() : null));
  }

   rechazarPedido(pedido: Pedidos) {
    this.pedidoService.deletePedido(pedido);
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
        boton: 'aconfirmar'
      },
    });
    return await modal.present();

  }


}
