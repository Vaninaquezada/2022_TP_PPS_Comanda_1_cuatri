import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlatoService } from 'src/app/services/plato.service';
import { Plato } from 'src/app/clases/plato';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Pedidos } from 'src/app/clases/pedidos';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-cocinero-pedidos',
  templateUrl: './cocinero-pedidos.page.html',
  styleUrls: ['./cocinero-pedidos.page.scss'],
})
export class CocineroPedidosPage implements OnInit {
  comidasPendientes: Plato[];
  comidasPreparando: Plato[];
 // Observable<any[]>;
  constructor(
    public productoService: ProductosService,
    public platoService: PlatoService,
    public pedidoService: PedidosService,
    private modalController: ModalController,
    private router: Router,
    private authSvc: AuthService) { }

  ngOnInit() {

    this.platoService
      .getPlato('pendiente', 'comida')
      .then((p) => p.subscribe((data) => (this.comidasPendientes = data)));
    this.platoService
      .getPlato('preparando', 'comida')
      .then((p) => p.subscribe((data) => (this.comidasPreparando = data)));

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
  signOut(){
    this.authSvc.LogOut();
    this.router.navigate(['login']);
  }
}