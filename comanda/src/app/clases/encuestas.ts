import { Roles, User } from "./user";

export type Recomendacion = 'nadaRecomendado' | 'pocoRecomendado' | 'indiferente' | 'recomendado' | 'muyRecomendado';


export class Encuestas {

    id?: string;
    usuario: User;
    tipoEncuesta: Roles;
    notaLugar: number;
    notaEmpleados: number;
    comentarios: string;
    recomendacion: Recomendacion;
    fecha: Date;
    photourl1?: string;
    photourl2?: string;
    photourl3?: string;

}
