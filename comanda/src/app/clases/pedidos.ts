import { Plato } from './plato';
export interface Pedidos {
    pedidoId: string;
    mesaId: string;
    numeroMesa: number;
    tiempoEstimado: number; // en minutos
    precioTotal: number; // int
    estado: PedidoEstado;
    preparaciones: Array<Plato>;
}
export type PedidoEstado = 'pendiente' | 'preparando' | 'terminado' | 'confirmarEntrega' | 'entregado' | 'aPagar' | 'pagado';
