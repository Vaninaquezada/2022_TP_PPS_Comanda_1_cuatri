import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Pedidos } from 'src/app/clases/pedidos';
import { Plato } from 'src/app/clases/plato';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
})
export class CuentaComponent implements OnInit {
  pedido: Pedidos;
  propina: number;
  platos: Plato[];
  idPedido: string;
  estado: 'string';
  pedidosPreparando: Pedidos[];
  pedidosEntregar: Pedidos[];
  acobrar = false;
  aconfirmar = false;
  aentregar = false;
  enpreparar = false;
  pagar = false;
  constructor(
    private preparacionService: PlatoService,
    private pedidoService: PedidosService,
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
   this.pedido = this.navParams.data.pedido;

      this.preparacionService.getPlatoByPedidoId(this.pedido.pedidoId)
      .then(
        p => p.subscribe(data => {this.platos = data;})
      );
      this.mostrarBoton(this.navParams.data.boton);
  }

  confirmar() {
    this.pedido.estado = 'aPagar';
    this.pedidoService.updatePedido(this.pedido).then(
      () => this.cerrarModal()
    );
    this.cerrarModal() ;
  }

  cerrarModal() {
    this.acobrar = false;
    this.aconfirmar = false;
    this.aentregar = false;
    this.enpreparar = false;
    this.pagar = false;
    this.modalController.dismiss();
  }
  public cobrarPedido(pedido: Pedidos) {
    pedido.estado = 'aPagar';
    this.pedidoService.updatePedido(pedido);
    this.cerrarModal() ;
  }

  mostrarBoton(opcion){
    switch (opcion) {
      case 'acobrar':
        this.acobrar = true;
        break;
      case 'aconfirmar':
          this.aconfirmar = true;
          break;
      case 'aentregar':
            this.aentregar = true;
            break;
      case 'enpreparacion':
          this.enpreparar = true;
          break;
      case 'pagar':
          this.pagar = true;
          break;
    }
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
     this.cerrarModal() ;
  }

   rechazarPedido(pedido: Pedidos) {
    this.pedidoService.deletePedido(pedido);
    this.cerrarModal() ;
  }
  public entregarPedido(pedido: Pedidos) {
    pedido.estado = 'confirmarEntrega';
    this.pedidoService.updatePedido(pedido);
    this.cerrarModal() ;
  }

}
