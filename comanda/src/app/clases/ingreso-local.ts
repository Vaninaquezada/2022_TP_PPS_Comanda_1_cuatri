import { User } from "./user";

export type EstadoIngreso = 'esperando' | 'aprobado'| 'cancelado' ;

export class IngresoLocal {

    id?: string;
    cliente?: User;
    fechaIngreso?: Date;
    cantidadPersonas?: Number;
    estado?: EstadoIngreso;
}
