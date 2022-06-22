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
    this.encuestasRef=db.collection<any>(this.dbpath, ref => ref.orderBy('fecha'));
    this.encuestas=this.encuestasRef.valueChanges(this.dbpath);

    
  }


  getAll(){
    return this.encuestas;
  }

  async nuevaEncuesta(encuesta: Encuestas, foto1?: Photo, foto2?: Photo, foto3?: Photo){
    encuesta.id = this.db.createId();
    if(foto1){
      encuesta.photourl1 = await this.foto.uploadPhotoEncuesta(foto1, encuesta.id+"_foto1");
      if(foto2){
        encuesta.photourl2 = await this.foto.uploadPhotoEncuesta(foto2, encuesta.id+"_foto2");
        if(foto3){
          encuesta.photourl3 = await this.foto.uploadPhotoEncuesta(foto3, encuesta.id+"_foto3");
        }
      }
    }
    
    this.db.collection('encuestas').doc(encuesta.id).set(encuesta);
    this.utilidadesService.RemoverLoading();
    this.utilidadesService.PresentarToastAbajo('Encuesta enviada', 'success');
       
  }
  
  public customFormatter(value: number) {
    return `${value}%`
  }

}
