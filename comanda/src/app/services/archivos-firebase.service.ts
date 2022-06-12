import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

import { concat} from 'rxjs';
import { concatMap, finalize } from 'rxjs/operators';
import { User } from '../clases/user';

@Injectable({
  providedIn: 'root'
})
export class ArchivosFirebaseService {

  
  private dbpath = '/cosasLindas';
  
  cosasLindasRef: AngularFirestoreCollection<User>;
  cosasLindas:Observable<any[]>;
  cosasFeasRef: AngularFirestoreCollection<User>;
  cosasFeas:Observable<any[]>;


  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { 
    this.cosasLindasRef=db.collection<any>(this.dbpath, ref => ref.orderBy('fecha', 'desc'));
    this.cosasLindas=this.cosasLindasRef.valueChanges(this.dbpath);


  }


  getAllCosasLindas(){
    return this.cosasLindas
  }



  nuevoUsuario(correo: string, foto: File, tipo: string){
    let usuario: User = {
      id: this.db.createId(),
      email: correo,
      foto: ''
    };
    let pathRef = `fotos/${usuario.id}`;
    const fileRef = this.storage.ref(pathRef);
    const task = this.storage.upload(pathRef, foto);
    console.log("aca entró"+ task);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async res => {
          console.log("aca entró 2");
          usuario.foto = res;
          if(tipo == "cosasLindas"){
            this.db.collection("cosasLindas").doc(usuario.id).set(usuario);
          }else{
            this.db.collection("cosasFeas").doc(usuario.id).set(usuario);
          }
          
        })
      } )
    ).subscribe();
    
  }

  guardarCambios(usuario: User, tipo: string){
    if(tipo == "cosasLindas"){
      this.db.collection("cosasLindas").doc(usuario.id).set(usuario);
    }else{
      this.db.collection("cosasFeas").doc(usuario.id).set(usuario);
    }
  }


}
