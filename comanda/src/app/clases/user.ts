export type Roles = 'usuario' | 'tester' | 'admin'| 'especialista';

export class User {
    uid: string;
    email: string;
    displayName?: string;
    emailVerified: boolean;
    password?: string;
    photoURL?: string;
    role?: Roles;
    edad?: number;
    nombre?: string;
    apellido?: string;
    dni?: number;
    os?: string;
    imgFrente?: File;
    imgPerfil?: File;
    verificacionEspec?: boolean;
    id?: string;
    ingresos?: Array<Date>

    constructor(){        
        this.ingresos = new Array<Date>();
    }
}