import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlatoService } from 'src/app/services/plato.service';
import { Plato } from 'src/app/clases/plato';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Pedidos } from 'src/app/clases/pedidos';
@Component({
  selector: 'app-cocinero-pedidos',
  templateUrl: './cocinero-pedidos.page.html',
  styleUrls: ['./cocinero-pedidos.page.scss'],
})
export class CocineroPedidosPage implements OnInit {
  comidasPendientes: Plato[];
  comidasPreparando: Plato[];

  constructor(
    public productoService: ProductosService,
    public platoService: PlatoService,
    public pedidoService: PedidosService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.platoService
      .getPreparaciones('pendiente', 'comida')
      .then((p) => p.subscribe((data) => (this.comidasPendientes = data)));
    this.platoService
      .getPreparaciones('preparando', 'comida')
      .then((p) => p.subscribe((data) => (this.comidasPreparando = data)));
  }
 /* async presentModal() {
    const modal = await this.modalController.create({
      component: AltaProductoComponent,
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      backdropDismiss: false,
      componentProps: {
        tipo: 'comida',
      },
    });
    return await modal.present();
  }
*/
  public prepararPreparacion(plato: Plato) {
    this.platoService.updatePreparacionState(
      plato.platoId,
      'preparando'
    );
  }

  public terminarPreparacion(plato: Plato) {
    this.platoService.updatePreparacionState(
      plato.platoId,
      'terminado'
    );
  }

}
