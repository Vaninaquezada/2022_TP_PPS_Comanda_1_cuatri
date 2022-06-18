export type TipoDeMesa = 'vip' | 'discapacitados' | 'estandar';

export class Mesa {
    numero?: number;
    cantidadComensales?: number;
    tipo?: TipoDeMesa;
    foto?: string;    

}

