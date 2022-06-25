import { User } from "./user";

export type EstadoIngreso = 'esperando' | 'aprobado'| 'cancelado' ;

export class IngresoLocal {

    id?: string;
    cliente?: User;
    mesaId?: string;
    mesaNro?: Number;
    fechaIngreso?: Date;
    cantidadPersonas?: Number;
    estado?: EstadoIngreso;
}
