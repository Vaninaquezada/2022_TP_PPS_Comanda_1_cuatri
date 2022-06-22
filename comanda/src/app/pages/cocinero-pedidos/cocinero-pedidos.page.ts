import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PreparacionService } from 'src/app/services/preparacion.service';
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
    public preparacionService: PreparacionService,
    public pedidoService: PedidosService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.preparacionService
      .getPreparaciones('pendiente', 'comida')
      .then((p) => p.subscribe((data) => (this.comidasPendientes = data)));
    this.preparacionService
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
  public prepararPreparacion(preparacion: Plato) {
    this.preparacionService.updatePreparacionState(
      preparacion.preparacionId,
      'preparando'
    );
  }

  public terminarPreparacion(preparacion: Plato) {
    this.preparacionService.updatePreparacionState(
      preparacion.preparacionId,
      'terminado'
    );
  }

}
