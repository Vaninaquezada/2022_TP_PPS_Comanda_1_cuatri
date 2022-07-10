import { Component, OnInit } from '@angular/core';
import { PlatoService } from 'src/app/services/plato.service';
import { Plato } from 'src/app/clases/plato';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-bartender-pedidos',
  templateUrl: './bartender-pedidos.page.html',
  styleUrls: ['./bartender-pedidos.page.scss'],
})
export class BartenderPedidosPage implements OnInit {

  subtipo: string;
  bebidasPendientes: Plato[];
  bebidasPreparando: Plato[];
 // Observable<any[]>;
  constructor(
    public productoService: ProductosService,
    public platoService: PlatoService,
    public pedidoService: PedidosService,
    private menuController: MenuController) {
      this.subtipo = localStorage.getItem("subtipo");
      console.log(this.subtipo);
      this.MenuView();
    }

  ngOnInit() {

    this.platoService
      .getPlato('pendiente', 'bebida')
      .then((p) => p.subscribe((data) => (this.bebidasPendientes = data)));
    this.platoService
      .getPlato('preparando', 'bebida')
      .then((p) => p.subscribe((data) => (this.bebidasPreparando = data)));
  console.log();
  }
  MenuView(){
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(false, 'adminMenu');
    this.menuController.enable(false, 'mozoMenu');
    this.menuController.enable(false, 'metreMenu');
    this.menuController.enable(false, 'cocineroMenu');
    this.menuController.enable(true, 'bartenderMenu');
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
