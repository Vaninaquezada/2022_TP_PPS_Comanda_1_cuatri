export type TipoProducto = 'comida' | 'bebida';

export class Productos {
    id?: string;
    nombre?: string;
    descripcion?: string;
    tiempoPromedioMinutos?: number;
    precio?: number;
    tipoProducto?: TipoProducto;
    photourl1?: string;
    photourl2?: string;
    photourl3?: string;
    cantidad?: number;

}

