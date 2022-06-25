import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from '../clases/user';
import { UtilidadesService } from './utilidades.service';
import {AuthService} from './auth.service';
import { AuthErrorsService } from './auth-errors.service';
import { IngresoLocal, EstadoIngreso } from '../clases/ingreso-local';

@Injectable({
  providedIn: 'root'
})
export class ListaDeEsperaFirebaseService {
  private dbpath = '/listaDeEspera'; //ruta de la coleccion de firebase.
  ingresosRef: AngularFirestoreCollection<User>;
  listaDeEspera:Observable<any[]>;
  id: string;
  role: string;
  ingresoseleccionado: any;
  
  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private authError: AuthErrorsService,
    private utilidadesService: UtilidadesService)
    {
    this.ingresosRef=db.collection<any>(this.dbpath, ref => ref.orderBy('fechaIngreso'));
    this.listaDeEspera=this.ingresosRef.valueChanges(this.dbpath);

  }


  getAll(){
    return this.listaDeEspera;
  }

  async nuevoIngreso(ingreso: IngresoLocal){
    
    ingreso.id = this.db.createId();
    
    this.db.collection('listaDeEspera').doc(ingreso.id).set(ingreso);
    this.utilidadesService.RemoverLoading();
    this.utilidadesService.PresentarToastAbajo('Ingresado en lista de espera', 'success');      
  
  }

  guardarCambios(ingreso: IngresoLocal){
    this.db.collection('listaDeEspera').doc(ingreso.id).set(ingreso);
  }

  

}
