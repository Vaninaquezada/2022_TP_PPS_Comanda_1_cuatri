export type Roles = 'cliente' | 'empleado' | 'admin';
export type subTipo = 'mozo' | 'bartender' | 'metre'| 'cocinero' | 'duenio' | 'supervisor' | 'registrado' | 'anonimo' ;

export class User {
    uid?: string;
    email?: string;
    displayName?: string;
    emailVerified?: boolean;
    role?: Roles;
    subTipo?: subTipo;
    nombre?: string;
    apellido?: string;
    dni?: number;
    cuil?: number;
    foto?: string;
    verificacionEspec?: boolean;
    verificadoPorAdm?: boolean;
    id?: string;
    numeroMesa?: number;
    mesaId?: string;
    ingresos?: Array<Date>;
    pushId?: string;
    encuestaCompletada?: boolean;
    sonido?: boolean;


    constructor(){
        this.ingresos = new Array<Date>();
    }
}


export interface UsuarioBarcode {
    apellido: string;
    nombre: string;
    dni: number;
    cuil?: number;
  }
