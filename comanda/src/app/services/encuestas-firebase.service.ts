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
import { Encuestas } from '../clases/encuestas';

@Injectable({
  providedIn: 'root'
})
export class EncuestasFirebaseService {
  private dbpath = '/encuestas'; //ruta de la coleccion de firebase.
  encuestasRef: AngularFirestoreCollection<User>;
  encuestas:Observable<any[]>;
  id: string;
  role: string;
  encuestaseleccionado: any;
  // encuestasRefPacientes: AngularFirestoreCollection<any>;
  // encuestasPacientes: Observable<any[]>;
  // encuestasRefEspecialistas: AngularFirestoreCollection<any>;
  // encuestasEspecialistas: Observable<any[]>;

  constructor(private db: AngularFirestore,private auth: AuthService,
     private storage: AngularFireStorage,
     private authError: AuthErrorsService,
     private foto: FotoService, private utilidadesService: UtilidadesService) {
    this.encuestasRef=db.collection<any>(this.dbpath, ref => ref.orderBy('apellido'));
    this.encuestas=this.encuestasRef.valueChanges(this.dbpath);

    
  }


  getAll(){
    return this.encuestas;
  }

  nuevaEncuesta(encuesta: Encuestas){
    encuesta.id = this.db.createId();
    this.db.collection('encuestas').doc(encuesta.id).set(encuesta);
    this.utilidadesService.RemoverLoading();
    this.utilidadesService.PresentarToastAbajo('Encuesta enviada', 'success');
       
  }
  
  public customFormatter(value: number) {
    return `${value}%`
  }

}
