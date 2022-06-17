import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from '../clases/user';
import { UtilidadesService } from './utilidades.service';

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

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private utilidadesService: UtilidadesService) {
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
      this.role = responce.docs[0].data()['role'];
      console.log(responce.docs[0].data()['role']);
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

  nuevoUsuario(usuario: User, foto: File){
    usuario.id = this.db.createId();


    let pathRef = `fotos/${usuario.id}`;
    const fileRef = this.storage.ref(pathRef);
    const task = this.storage.upload(pathRef, foto);
    console.log('aca entró'+ task);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async res => {
          console.log('aca entró 2');
          usuario.foto = res;          
          this.db.collection('usuarios').doc(usuario.id).set(usuario);
          this.utilidadesService.RemoverLoading();
          this.utilidadesService.PresentarToastAbajo('Usuario creado', 'success')
          
        })
      } )
    ).subscribe();
    
  }

  nuevoUsuarioFoto(usuario: User, foto: any){
    usuario.id = this.db.createId();

    const dataUrl = foto.dataUrl;
    const pathRef = `fotos/${usuario.id}`;
    const fileRef = this.storage.ref(pathRef);
    const task = this.storage.upload(pathRef, foto);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async res => {
          console.log('aca entró 2');
          usuario.foto = res;
          this.db.collection('usuarios').doc(usuario.id).set(usuario);
          this.utilidadesService.RemoverLoading();
          this.utilidadesService.PresentarToastAbajo('Usuario creado', 'success')
          
        })
      } )
    ).subscribe();
    
  }


  guardarCambios(usuario: User){
    this.db.collection('usuarios').doc(usuario.id).set(usuario);
    
  }

  borrrar(id: string): Promise<void> {
    return this.usuariosRef.doc(id).delete();
  }

  update(id: string, data: any): Promise<void> {
    return this.usuariosRef.doc(id).update(data);
  }
}
