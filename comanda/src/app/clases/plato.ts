import { Productos } from './productos';

export interface Plato {
    platoId?: string;
    producto: Productos;
    estado: PreparacionEstado;
    pedidoId: string;
}
export type PreparacionEstado = 'confirmandoPedido' | 'pendiente' | 'preparando' | 'terminado';
