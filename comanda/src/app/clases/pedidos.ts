import { Plato } from './plato';
export interface Pedidos {
    pedidoId?: string;
    mesaId: string;
    numeroMesa: Number;
    clienteId?: string;
    tiempoEstimado: number; // en minutos
    precioTotal: number; // int
    estado: PedidoEstado;
    platos: Array<Plato>;
    propina?: number;
}
export type PedidoEstado = 'pendiente' | 'preparando' | 'terminado' | 'confirmarEntrega' | 'entregado' | 'aPagar' | 'pagado';

/*
import { User } from "@angular/fire/auth";
import { Productos } from "./productos";

export class Pedidos {

    clienteId?: User;
    mozo?: User;
    fecha?: Date;
    productos?: Array<Productos>;

    constructor(){
        this.productos = new Array<Productos>();
    }
}
*/

