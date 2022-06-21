export type TipoDeMesa = 'vip' | 'discapacitados' | 'estandar';
export type Estado = | 'ocupada' | 'libre' | 'reservada';

export class Mesa {
    numero?: number;
    cantidadComensales?: number;
    tipo?: TipoDeMesa;
    foto?: string;
    estado?: Estado;
    cliente?: string;
}

