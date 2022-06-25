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
  selector: 'app-pedidos-aentregar',
  templateUrl: './pedidos-aentregar.page.html',
  styleUrls: ['./pedidos-aentregar.page.scss'],
})
export class PedidosAEntregarPage implements OnInit {
  pedidosEntregar: Pedidos[];
  pedido: Pedidos;
  platos: Plato[];
  constructor(private pedidoService: PedidosService,
    private preparacionService: PlatoService,
     private modal: ModalController, private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
    this.pedidoService
    .getPedidos('terminado')
    .then((p) => p.subscribe((data) => (this.pedidosEntregar = data)));
  }


  public entregarPedido(pedido: Pedidos) {
    pedido.estado = 'confirmarEntrega';
    this.pedidoService.updatePedido(pedido);
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
        boton: 'aentregar'
      },
    });
    return await modal.present();

  }

  singOut(){
    this.authSvc.LogOut();
    this.router.navigate(['login']);
  }
}
