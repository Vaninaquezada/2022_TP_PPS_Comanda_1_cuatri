import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PedidoEstado, Pedidos } from '../clases/pedidos';
import { Plato } from '../clases/plato';
import { TipoProducto } from '../clases/productos';
import { PlatoService } from './plato.service';
import { filter, map, reduce } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private preparacionService: PlatoService
  ) {}

  async crearPedido(pedido: Pedidos): Promise<void> {
    pedido.platos.forEach((p) => {
      p.pedidoId = pedido.pedidoId;
      this.preparacionService.crearPlato(p);
    });
    //pedido.platos = [];
    try {
      await this.db.collection('Pedidos').doc(pedido.pedidoId).set(pedido);
    } catch (error) {
      throw Error('Error al cargar pedido');
    }
  }

  async updatePedido(pedido: Pedidos): Promise<void> {
    try {
      await this.db.collection('Pedidos').doc(pedido.pedidoId).set(pedido);
    } catch (error) {
      console.log(error);
      throw Error('Pedido no se pudo actualizar');
    }
  }


  async confirmarPedido(pedido: Pedidos): Promise<void> {
    try {
      pedido.estado = 'preparando';
      await this.db.collection('Pedidos').doc(pedido.pedidoId).set(pedido);
      await this.preparacionService.updatePlatoStateInPedido(pedido.pedidoId, 'pendiente');
    } catch (error) {
      console.log(error);
      throw Error('Pedidos error');
    }
  }

  async deletePedido(pedido: Pedidos): Promise<void> {
    try {
      await this.preparacionService.deletePlatoByPedidoId(pedido.pedidoId);
      await this.db.collection('Pedidos').doc(pedido.pedidoId).delete();
    } catch (error) {
      console.log(error);
      throw Error('Pedidos error');
    }
  }

  async getPedidoByMesaId(mesaId: string) {
    return this.db
      .collection<Pedidos>('Pedidos', (ref) =>
        ref
          .where('mesaId', '==', mesaId)
      )
      .valueChanges();
  }

  async getPedidoById(pedidoId: string) {
    try {
      return this.db
      .collection<Pedidos>('Pedidos').doc(pedidoId)
      .valueChanges();
    } catch (error) {
      throw error;
    }

  }

  async getPedidos(state: PedidoEstado): Promise<Observable<Pedidos[]>> {
    return this.db
      .collection<Pedidos>('Pedidos', (ref) =>
        ref
          .where('estado', '==', state)
      )
      .valueChanges();
  }

  async getPedidosPendientes(): Promise<Observable<Pedidos[]>> {
    return this.db
      .collection<Pedidos>('Pedidos', (ref) =>
        ref
          .where('estado', '==', 'pendiente')
      )
      .valueChanges();
  }

  async getComidasPendientes(): Promise<Observable<Plato[]>> {
    return this.getPreparacionesPendientes('comida');
  }

  async getBebidasPendientes(): Promise<Observable<Plato[]>> {
    return this.getPreparacionesPendientes('bebida');
  }

  async getComidasPreparando(): Promise<Observable<Plato[]>> {
    return this.getPreparacionesPreparando('comida');
  }

  async getBebidasPreparando(): Promise<Observable<Plato[]>> {
    return this.getPreparacionesPreparando('bebida');
  }

  private async getPreparacionesPendientes(tipo: TipoProducto): Promise<Observable<Plato[]>> {
    return this.db
      .collection<Pedidos>('Pedidos', (ref) =>
        ref
          .where('estado', '==', 'preparando')
      )
      .valueChanges()
      .pipe(
        // Agarro array de Pedido
        map(
          pedidos => pedidos
          // Mapeo el array de pedidos a un array de arrays de Preparaciones
          .map(
            pedido => pedido.platos
          )
          // Aplano el array de arrays de Preparaciones
          .reduce(
            (acc, val) => acc.concat(val),
            []
          )
          // Filtro solo las Preparaciones en estado pendiente
          .filter(
            prep => prep.estado === 'pendiente'
          )
          // Filtro solo las Preparaciones del tipo indicado
          .filter(
            prep => prep.producto.tipoProducto === tipo
          )
        ),
      );
  }

  private async getPreparacionesPreparando(tipo: TipoProducto): Promise<Observable<Plato[]>> {
    return this.db
      .collection<Pedidos>('Pedidos', (ref) =>
        ref
          .where('estado', '==', 'preparando')
      )
      .valueChanges()
      .pipe(
        // Agarro array de Pedido
        map(
          pedidos => pedidos
          // Mapeo el array de pedidos a un array de arrays de Preparaciones
          .map(
            pedido => pedido.platos
          )
          // Aplano el array de arrays de Preparaciones
          .reduce(
            (acc, val) => acc.concat(val),
            []
          )
          // Filtro solo las Preparaciones en estado preparando
          .filter(
            prep => prep.estado === 'preparando'
          )
          // Filtro solo las Preparaciones del tipo indicado
          .filter(
            prep => prep.producto.tipoProducto === tipo
          )
        ),
      );
  }
}
