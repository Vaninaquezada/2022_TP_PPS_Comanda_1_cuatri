import { Component, OnInit } from '@angular/core';
import { PlatoService } from 'src/app/services/plato.service';
import { Plato } from 'src/app/clases/plato';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-bartender-pedidos',
  templateUrl: './bartender-pedidos.page.html',
  styleUrls: ['./bartender-pedidos.page.scss'],
})
export class BartenderPedidosPage implements OnInit {

  bebidasPendientes: Plato[];
  bebidasPreparando: Plato[];
 // Observable<any[]>;
  constructor(
    public productoService: ProductosService,
    public platoService: PlatoService,
    public pedidoService: PedidosService) { }

  ngOnInit() {

    this.platoService
      .getPlato('pendiente', 'bebida')
      .then((p) => p.subscribe((data) => (this.bebidasPendientes = data)));
    this.platoService
      .getPlato('preparando', 'bebida')
      .then((p) => p.subscribe((data) => (this.bebidasPreparando = data)));
console.log();
  }
  public prepararPlato(plato: Plato) {
    this.platoService.updatePlatoState(
      plato.platoId,
      'preparando'
    );
  }

  public terminarPlato(plato: Plato) {
    this.platoService.updatePlatoState(
      plato.platoId,
      'terminado'
    );
  }

}
