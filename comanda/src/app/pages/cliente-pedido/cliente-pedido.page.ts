import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Pedidos } from 'src/app/clases/pedidos';
import { Productos } from 'src/app/clases/productos';
import { User } from 'src/app/clases/user';
import { FotosProductoComponent } from 'src/app/componentes/fotos-producto/fotos-producto.component';
import { AuthService } from 'src/app/services/auth.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';


@Component({
  selector: 'app-cliente-pedido',
  templateUrl: './cliente-pedido.page.html',
  styleUrls: ['./cliente-pedido.page.scss'],
})
export class ClientePedidoPage implements OnInit {

  productos: Productos[];
  pedido: Pedidos;
  cliente: User = null;

  constructor(private productoService: ProductosService,
    private pedidoService: PedidosService,
    private nav: NavController,
    private auth: AuthService,
    private modal: ModalController,
    private usuarios: UsuariosFirebaseService) {}

  ngOnInit(){
   // this.cliente = this.auth.getAuth();
    this.productoService
      .getProductos()
      .then((p) => p.subscribe((data) => (this.productos = data)));

    this.pedido = {
      pedidoId: this.usuarios.crearId(),
      mesaId: '',
      numeroMesa: 0,
      tiempoEstimado: 0,
      precioTotal: 0,
      estado: 'pendiente',
      platos: [],
    };
  }

  getComidas(): Productos[] {
    return this.productos.filter((p) => p.tipoProducto === 'comida');
  }

  getBebidas(): Productos[] {
    return this.productos.filter((p) => p.tipoProducto === 'bebida');
  }

  getProductoTotalCount(): number {
    return this.pedido.platos.length;
  }

  getProductoCount(productoId: string): number {
    return this.pedido.platos.filter(
      (prep) => prep.producto.id === productoId
    ).length;
  }

  getPrecioTotal(): number {
    if (this.pedido.platos.length > 0) {
      return this.pedido.platos
        .map((prep) => prep.producto.precio)
        .reduce((prev, cur) => prev + cur);
    }
    return 0;
  }

  getTiempoEstimado(): number {
    if (this.pedido.platos.length > 0) {
      return Math.max(
        ...this.pedido.platos.map((prep) => prep.producto.tiempoPromedioMinutos)
      );
    }
    return 0;
  }

  removeProducto(productoId: string) {
    const index = this.pedido.platos.findIndex(
      (prep) => prep.producto.id === productoId
    );
    if (index > -1) {
      this.pedido.platos.splice(index, 1);
    }
  }

  addProducto(producto: Productos) {
    this.pedido.platos.push({
      producto,
      estado: 'confirmandoPedido',
      pedidoId: this.pedido.pedidoId,
    });
  }

  realizarPedido() {
    this.pedido.mesaId = this.cliente.mesaId;
    this.pedido.numeroMesa = this.cliente.numeroMesa;
  // this.pedido.mesaId = 'BVIBfLHDswZd77dWWCLR';
  // this.pedido.numeroMesa = 3;
    this.pedido.precioTotal = this.getPrecioTotal();
    this.pedido.tiempoEstimado = this.getTiempoEstimado();
    this.pedidoService.crearPedido(this.pedido);
    this.nav.navigateBack('principal');
  }

  async detalleFoto(producto: Productos) {
    const fotos = [producto.photourl1, producto.photourl2, producto.photourl3];
    const modal = await this.modal.create({
      component: FotosProductoComponent,
      swipeToClose: true,
      presentingElement: await this.modal.getTop(),
      backdropDismiss: true,
      componentProps: {
        fotos,
        titulo: producto.nombre
      },
    });
    return await modal.present();
  }

}
