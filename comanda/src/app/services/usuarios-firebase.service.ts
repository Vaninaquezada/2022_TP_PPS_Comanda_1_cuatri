import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../clases/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosFirebaseService {

  private dbpath = '/usuarios'; //ruta de la coleccion de firebase.
  usuariosRef: AngularFirestoreCollection<User>;
  usuarios:Observable<any[]>;
  id: string;
  role: string;
  usuarioSeleccionado: any;
  // usuariosRefPacientes: AngularFirestoreCollection<any>;
  // usuariosPacientes: Observable<any[]>;
  // usuariosRefEspecialistas: AngularFirestoreCollection<any>;
  // usuariosEspecialistas: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.usuariosRef=db.collection<any>(this.dbpath, ref => ref.orderBy('apellido'));
    this.usuarios=this.usuariosRef.valueChanges(this.dbpath);

    // this.usuariosRefPacientes=db.collection<any>(this.dbpath, ref => ref.where('role', '==', 'paciente').orderBy('apellido'));
    // this.usuariosPacientes=this.usuariosRefPacientes.valueChanges(this.dbpath);

    // this.usuariosRefEspecialistas=db.collection<any>(this.dbpath, ref => ref.where('role', '==', 'especialista').orderBy('apellido'));
    // this.usuariosEspecialistas=this.usuariosRefEspecialistas.valueChanges(this.dbpath);
  }


  async obtenerID(email: string){
    await this.db.collection('/usuarios').ref.where('email', '==', email).get().then((responce)=>{
      this.id = responce.docs[0].id;      
    });
  }

  async obtenerRole(email: string){
    await this.db.collection('/usuarios').ref.where('email', '==', email).get().then((responce)=>{
      this.role = responce.docs[0].data()["role"];
      console.log(responce.docs[0].data()["role"]);
    });
  }

  async obtenerUsuario(email: string){
    await this.db.collection('/usuarios').ref.where('email', '==', email).get().then((responce)=>{
      this.usuarioSeleccionado = responce.docs[0].data();
      this.id = responce.docs[0].id;
    });
  }


  getAll(){
    return this.usuarios;
  }

  // getAllPacientes(){
  //   return this.usuariosPacientes;
  // }

  // getAllEspecialistas(){
  //   return this.usuariosEspecialistas;
  // }

  create(mensaje: User): any{
    let data = this.usuariosRef.add({...mensaje});
    
    return data;
  }


  update(id: string, data: any): Promise<void> {
    return this.usuariosRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.usuariosRef.doc(id).delete();
  }
}
