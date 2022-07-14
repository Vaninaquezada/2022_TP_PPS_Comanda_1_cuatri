import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { PlatoService } from 'src/app/services/plato.service';
import { Plato } from 'src/app/clases/plato';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Pedidos } from 'src/app/clases/pedidos';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { threadId } from 'worker_threads';
@Component({
  selector: 'app-cocinero-pedidos',
  templateUrl: './cocinero-pedidos.page.html',
  styleUrls: ['./cocinero-pedidos.page.scss'],
})
export class CocineroPedidosPage implements OnInit {
  comidasPendientes: Plato[];
  comidasPreparando: Plato[];
  comidasPedido: Plato[];
  platos: Plato[];
  pedido: Pedidos;
  pedidoTerminado: boolean;
  subtipo: string;
 // Observable<any[]>;
  constructor(
    public productoService: ProductosService,
    public platoService: PlatoService,
    public pedidoService: PedidosService,
    private router: Router,
    private authSvc: AuthService,
    private menuController: MenuController) {
      this.subtipo = localStorage.getItem("subtipo");
      console.log(this.subtipo);
      this.MenuView();
    }

  ngOnInit() {

    this.platoService
      .getPlato('pendiente', 'comida')
      .then((p) => p.subscribe((data) => (this.comidasPendientes = data)));
    this.platoService
      .getPlato('preparando', 'comida')
      .then((p) => p.subscribe((data) => (this.comidasPreparando = data)));
  }

  MenuView(){
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(false, 'adminMenu');
    this.menuController.enable(false, 'mozoMenu');
    this.menuController.enable(false, 'metreMenu');
    this.menuController.enable(true, 'cocineroMenu');
    this.menuController.enable(false, 'bartenderMenu');
  }


  public prepararPlato(plato: Plato) {
    this.platoService.updatePlatoState(
      plato.platoId,
      'preparando'
    );
  }
 public traerPedido(plato: Plato) {
    this.pedidoService
    .getPedidoById(plato.pedidoId)
    .then((p) => p.subscribe((data) => (this.pedido = data)));
  }

  async terminarPlato(plato: Plato) {
    this.platoService.updatePlatoState(
      plato.platoId,
      'terminado'
    );

    this.platoService.getPlatoByPedidoId(plato.pedidoId)
    .then(
      p => p.subscribe(data => {
        this.platos = data;
         this.verificarPedido();

         if(this.pedidoTerminado){
           this.pedidoService.terminarPedido(plato.pedidoId);
        }
      })
    );





  }

 async entregarPedido(pedido) {
    pedido.estado = 'aEntregar';
    this.pedidoService.updatePedido(pedido);
  }


verificarPedido(){

 // this.comidasPedido = this.pedido.platos;
 this.pedidoTerminado = this.platos.every( e => e.estado === 'terminado');
 console.log('terminado?',this.pedidoTerminado);
 console.log('platos?',this.platos);
}
  singOut(){
    this.authSvc.LogOut();
    this.router.navigate(['login']);
  }
}
