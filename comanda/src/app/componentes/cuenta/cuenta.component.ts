import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Pedidos } from 'src/app/clases/pedidos';
import { Plato } from 'src/app/clases/plato';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PlatoService } from 'src/app/services/plato.service';
import { PushOneSignalService } from 'src/app/services/push-one-signal.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

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
  estado: string;
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
    private navParams: NavParams,
    private usuarioService: UsuariosFirebaseService,
    private pushOneSignal: PushOneSignalService
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
        this.estado = 'Pendiente cobro';

        break;
      case 'aconfirmar':
          this.aconfirmar = true;
          this.estado = 'Pendiente confirmacion';
          break;
      case 'aentregar':
            this.aentregar = true;
            this.estado = 'Pendiente Entregar';
            break;
      case 'enpreparacion':
          this.enpreparar = true;
          this.estado = 'En preparacion';
          break;
      case 'pagar':
          this.pagar = true;
          this.estado = 'Pendiente pagar';
          break;
    }
  }

  async confirmarPedido(pedido: Pedidos) {
    pedido.estado = 'preparando';
    this.pedidoService.confirmarPedido(pedido);
    console.log('Cocinero?: '+await this.preparacionService.tieneComidasForPedido(pedido.pedidoId));
    if(await this.preparacionService.tieneComidasForPedido(pedido.pedidoId)){
      //notifico a cocineros
      this.usuarioService.obtenerPushIdCocineros().then(response => {
        console.log("this.cocinerosPushIds" + JSON.stringify(this.usuarioService.cocinerosPushIds));
        this.pushOneSignal.enviarNotifPedidoParaCocineros(this.usuarioService.cocinerosPushIds, "Info adicional bla");
      });
    }
    console.log('Bartender?: '+await this.preparacionService.tieneBebidasForPedido(pedido.pedidoId));
    if(await this.preparacionService.tieneBebidasForPedido(pedido.pedidoId)){
      //notif bartender
      this.usuarioService.obtenerPushIdBartenders().then(response => {
        console.log("this.metrePushIds" + JSON.stringify(this.usuarioService.bartendersPushIds));
        this.pushOneSignal.enviarNotifPedidoParaBArtenders(this.usuarioService.bartendersPushIds, "Info adicional bla");
      });
    };
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
