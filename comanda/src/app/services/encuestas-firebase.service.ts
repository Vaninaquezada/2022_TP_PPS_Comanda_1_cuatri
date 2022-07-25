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
import { EncuestaSupervisor } from '../clases/encuesta-supervisor';

@Injectable({
  providedIn: 'root'
})
export class EncuestasFirebaseService {
  
  private dbpath = '/encuestas'; //ruta de la coleccion de firebase.
  private dbpathSupervisor = '/encuestas-supervisor'; //ruta de la coleccion de firebase.
  encuestasRef: AngularFirestoreCollection<User>;
  encuestas:Observable<any[]>;
  encuestasRefSupervisor: AngularFirestoreCollection<User>;
  encuestasSupervisor:Observable<any[]>;
  encuestasRefSupervisorCliente: AngularFirestoreCollection<User>;
  encuestasSupervisorCliente:Observable<any[]>;
  encuestasRefSupervisorEmpleados : AngularFirestoreCollection<User>;
  encuestasSupervisorEmpleados :Observable<any[]>;
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
    this.encuestasRef=db.collection<any>(this.dbpathSupervisor, ref => ref.orderBy('fecha'));
    this.encuestas=this.encuestasRef.valueChanges(this.dbpath);

    this.encuestasRefSupervisor=db.collection<any>(this.dbpathSupervisor, ref => ref.orderBy('fecha'));
    this.encuestasSupervisor=this.encuestasRefSupervisor.valueChanges(this.dbpathSupervisor);


    this.encuestasRefSupervisorEmpleados = db.collection<any>(this.dbpathSupervisor,
        ref => ref.where('tipoEncuesta', '==', 'empleado').orderBy('fecha'));
    this.encuestasSupervisorEmpleados=this.encuestasRefSupervisorEmpleados.valueChanges(this.dbpathSupervisor);

    this.encuestasRefSupervisorCliente = db.collection<any>(this.dbpathSupervisor,
        ref => ref.where('tipoEncuesta', '==', 'cliente').orderBy('fecha'));
    this.encuestasSupervisorCliente=this.encuestasRefSupervisorCliente.valueChanges(this.dbpathSupervisor);

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

  getAllSupervisor(){
    return this.encuestasSupervisor;
  }
  getSupervisorCliente(){
    return this.encuestasSupervisorCliente;
  }
  getSupervisorEmpleado(){
    return this.encuestasSupervisorEmpleados;
  }
  async nuevaEncuestaSupervisor(encuesta: EncuestaSupervisor){
    this.utilidadesService.RemoverLoading();
    encuesta.id = this.db.createId();
    this.db.collection('encuestas-supervisor').doc(encuesta.id).set(encuesta);
    this.utilidadesService.RemoverLoading();
    this.utilidadesService.PresentarToastAbajo('Encuesta enviada', 'success');
  }
}
