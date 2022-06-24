import { User } from "./user";

export type EstadoIngreso = 'esperando' | 'aprobado' ;

export class IngresoLocal {

    id?: string;
    cliente?: User;
    fechaIngreso?: Date;
    cantidadPersonas?: Number;
    estado?: EstadoIngreso;
}
