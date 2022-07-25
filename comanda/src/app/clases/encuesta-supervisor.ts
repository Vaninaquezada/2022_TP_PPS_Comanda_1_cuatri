
import { Roles, User } from './user';


export class EncuestaSupervisor {

    id?: string;
    usuario: User;
    tipoEncuesta: Roles;
    pregunta1: string;
    respuesta1: string;
    pregunta2: string;
    respuesta2: number;
    pregunta3: string;
    respuesta3: number;
    pregunta4: string;
    respuesta4: string;
    comentarios: string;
    fecha: Date;

}
