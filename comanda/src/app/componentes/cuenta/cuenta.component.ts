import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  @Input() pedido: Pedidos;
  @Input() propina: number;
  preparaciones: Plato[];

  constructor(
    private preparacionService: PlatoService,
    private pedidoService: PedidosService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.preparacionService.getPreparacionesByPedidoId(this.pedido.pedidoId)
      .then((p) => p.subscribe(
        (data) => this.preparaciones = data
      ));
  }

  confirmar() {
    this.pedido.estado = 'aPagar';
    this.pedidoService.updatePedido(this.pedido).then(
      () => this.cerrarModal()
    );

  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
