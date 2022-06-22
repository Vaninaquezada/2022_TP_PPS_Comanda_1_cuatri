import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Plato, PreparacionEstado } from '../clases/plato';
import { TipoProducto } from '../clases/productos';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage) { }

    async crearPlato(plato: Plato): Promise<void> {
      try {
        const id = this.db.createId();
        plato.platoId = id;
        await this.db.collection('Preparaciones').doc(plato.platoId).set(plato);
      } catch (error) {
        console.log(error);
        throw Error('No se pudo crear');
      }
    }

    async tieneComidasForPedido(pedidoId: string): Promise<boolean> {
      return this.db
        .collection<Plato>('Preparaciones', (ref) =>
          ref
            .where('pedidoId', '==', pedidoId)
            .where('producto.tipo', '==', 'comida')
        )
        .get()
        .toPromise()
        .then((data) => !data.empty);
    }
    async tieneBebidasForPedido(pedidoId: string): Promise<boolean> {
      return this.db
        .collection<Plato>('Preparaciones', (ref) =>
          ref
            .where('pedidoId', '==', pedidoId)
            .where('producto.tipo', '==', 'bebida')
        )
        .get()
        .toPromise()
        .then((data) => !data.empty);
    }
    async updatePreparacionState(preparacionId: string, state: PreparacionEstado) {
      this.db
      .collection<Plato>('Preparaciones')
      .doc(preparacionId)
      .update({estado: state});
    }
    async updatePreparacionesStateInPedido(pedidoId: string, state: PreparacionEstado) {
      this.db
        .collection<Plato>('Preparaciones', (ref) =>
          ref
            .where('pedidoId', '==', pedidoId)
        )
        .get()
        .subscribe(
          (data) => data.docs.forEach(
            (prep) => prep.ref.update({estado: state})
          )
        );
    }
    async getPreparaciones(estado: PreparacionEstado, tipo: TipoProducto): Promise<Observable<Plato[]>> {
      return this.db
        .collection<Plato>('Preparaciones', (ref) =>
          ref
            .where('estado', '==', estado)
            .where('producto.tipo', '==', tipo)
        )
        .valueChanges();
    }
    async getPreparacionesByPedidoId(pedidoId: string): Promise<Observable<Plato[]>> {
      return this.db
        .collection<Plato>('Preparaciones', (ref) =>
          ref
            .where('pedidoId', '==', pedidoId)
        )
        .valueChanges();
    }
    async deletePreparacion(preparacionId: string) {
      this.db
        .collection<Plato>('Preparaciones')
        .doc(preparacionId)
        .delete();
    }
    async deletePreparacionesByPedidoId(pedidoId: string) {
      this.db
      .collection<Plato>('Preparaciones', (ref) =>
        ref
          .where('pedidoId', '==', pedidoId)
      )
      .get()
      .subscribe(
        (val) => val.docs.forEach(
          (doc) => doc.ref.delete()
        )
      );
    }
}
