import { User } from "@angular/fire/auth";
import { Productos } from "./productos";

export class Pedidos {

    cliente?: User;
    mozo?: User;
    fecha?: Date;
    productos?: Array<Productos>;

    constructor(){
        this.productos = new Array<Productos>();
    }
}
