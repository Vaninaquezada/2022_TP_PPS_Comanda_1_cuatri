import { Productos } from './productos';

export interface Plato {
    platoId?: string;
    producto: Productos;
    estado: PlatoEstado;
    pedidoId: string;
}
export type PlatoEstado = 'confirmandoPedido' | 'pendiente' | 'preparando' | 'terminado';
