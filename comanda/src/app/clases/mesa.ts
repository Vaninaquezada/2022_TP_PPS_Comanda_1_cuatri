export type TipoDeMesa = 'vip' | 'discapacitados' | 'estandar';

export class Mesa {

    id?: string;
    numero?: number;
    cantidadComensales?: number;
    tipo?: TipoDeMesa;
    foto?: string;    

}

