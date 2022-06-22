import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from '../clases/user';
import { Photo } from '@capacitor/camera';
import { UtilidadesService } from './utilidades.service';
import {AuthService} from './auth.service';
import {FotoService} from './foto.service';
import { AuthErrorsService } from './auth-errors.service';
import { Productos } from '../clases/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private dbpath = '/productos'; //ruta de la coleccion de firebase.
  productosRef: AngularFirestoreCollection<User>;
  productos:Observable<any[]>;
  id: string;
  role: string;
  productoseleccionado: any;
  // productosRefPacientes: AngularFirestoreCollection<any>;
  // productosPacientes: Observable<any[]>;
  // productosRefEspecialistas: AngularFirestoreCollection<any>;
  // productosEspecialistas: Observable<any[]>;

  constructor(private db: AngularFirestore,private auth: AuthService,
     private storage: AngularFireStorage,
     private authError: AuthErrorsService,
     private foto: FotoService, private utilidadesService: UtilidadesService) {
    this.productosRef=db.collection<any>(this.dbpath, ref => ref.orderBy('nombre'));
    this.productos=this.productosRef.valueChanges(this.dbpath);
    
  }


  getAll(){
    return this.productos;
  }

  async nuevoProducto(producto: Productos, foto1?: Photo, foto2?: Photo, foto3?: Photo){
    producto.id = this.db.createId();
    producto.cantidad = 0;
    if(foto1){
      producto.photourl1 = await this.foto.uploadPhotoProducto(foto1, producto.id+"_foto1");
      if(foto2){
        producto.photourl2 = await this.foto.uploadPhotoProducto(foto2, producto.id+"_foto2");
        if(foto3){
          producto.photourl3 = await this.foto.uploadPhotoProducto(foto3, producto.id+"_foto3");
        }
      }
    }
    
    this.db.collection('productos').doc(producto.id).set(producto);
    this.utilidadesService.RemoverLoading();
    this.utilidadesService.PresentarToastAbajo('Producto Creado', 'success');
       
  }
  
  public customFormatter(value: number) {
    return `${value}%`
  }

}
