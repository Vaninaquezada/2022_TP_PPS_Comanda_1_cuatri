import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from '../clases/user';
import { Photo } from '@capacitor/camera';
import { UtilidadesService } from './utilidades.service';
import { AuthService } from './auth.service';
import { FotoService } from './foto.service';
import { AuthErrorsService } from './auth-errors.service';
@Injectable({
  providedIn: 'root'
})
export class UsuariosFirebaseService {

  private dbpath = '/usuarios'; //ruta de la coleccion de firebase.
  usuariosRef: AngularFirestoreCollection<User>;
  usuarios: Observable<any[]>;
  id: string;
  role: string;
  usuarioSeleccionado: any;
  usuariosRefClientes: AngularFirestoreCollection<any>;
  usuariosClientes: Observable<any[]>;
  usuariosRefEmpleados: AngularFirestoreCollection<any>;
  usuariosEmpleados: Observable<any[]>;
  adminsPushIds = new Array<string>();
  metresPushIds = new Array<string>();
  mozosPushIds = new Array<string>();
  reservaConfirmadaPushIds = new Array<string>();
  reservaRechazadaPushIds = new Array<string>();
  cocinerosPushIds = new Array<string>();
  bartendersPushIds = new Array<string>();
  // usuariosRefEspecialistas: AngularFirestoreCollection<any>;
  // usuariosEspecialistas: Observable<any[]>;

  constructor(private db: AngularFirestore, private auth: AuthService,
    private storage: AngularFireStorage,
    private authError: AuthErrorsService,
    private foto: FotoService, private utilidadesService: UtilidadesService) {
    this.usuariosRef = db.collection<any>(this.dbpath, ref => ref.orderBy('apellido'));
    this.usuarios = this.usuariosRef.valueChanges(this.dbpath);

    this.usuariosRefClientes = db.collection<any>(this.dbpath, ref => ref.where('role', '==', 'cliente').orderBy('apellido'));
    this.usuariosClientes = this.usuariosRefClientes.valueChanges(this.dbpath);

    this.usuariosRefEmpleados = db.collection<any>(this.dbpath, ref => ref.where('role', '==', 'empleado').orderBy('apellido'));
    this.usuariosEmpleados = this.usuariosRefEmpleados.valueChanges(this.dbpath);

    // this.usuariosRefEspecialistas=db.collection<any>(this.dbpath, ref => ref.where('role', '==', 'especialista').orderBy('apellido'));
    // this.usuariosEspecialistas=this.usuariosRefEspecialistas.valueChanges(this.dbpath);
  }

  getAllClientes() {
    return this.usuariosClientes;
  }

  getAllEmpleados() {
    return this.usuariosEmpleados;
  }

  async obtenerID(email: string) {
    await this.db.collection('/usuarios').ref.where('email', '==', email).get().then((responce) => {
      this.id = responce.docs[0].id;
    });
  }

  async obtenerRole(email: string) {
    await this.db.collection('/usuarios').ref.where('email', '==', email).get().then((responce) => {
      this.role = responce.docs[0].data()['role'];
      console.log(responce.docs[0].data()['role']);
    });
  }

  async obtenerUsuario(email: string) {
    await this.db.collection('/usuarios').ref.where('email', '==', email).get().then((responce) => {
      if(responce.docs.length===0){
        console.log('No hay usuario registrado con ese email: ',email);
      }else{
        this.usuarioSeleccionado = responce.docs[0].data();
        this.id = responce.docs[0].id;
      }
    });
  }


  getAll() {
    return this.usuarios;
  }

  nuevoUsuario(usuario: User, foto: File) {
    usuario.id = this.db.createId();


    const pathRef = `fotos/${usuario.id}`;
    const fileRef = this.storage.ref(pathRef);
    const task = this.storage.upload(pathRef, foto);
    console.log('aca entró' + task);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async res => {
          console.log('aca entró 2');
          usuario.foto = res;
          usuario.sonido = true;
          usuario.encuestaCompletada = false;
          this.db.collection('usuarios').doc(usuario.id).set(usuario);
          this.utilidadesService.RemoverLoading();
          this.utilidadesService.PresentarToastAbajo('Usuario creado', 'success');
        });
      })
    ).subscribe();

  }

  async registarUsuarioFoto(usuario: User, password: string, photo: Photo) {
    try {
      const id = this.db.createId();
      usuario.id = id;
      usuario.encuestaCompletada = false;
      usuario.sonido = true;
      const user = await this.auth.SignUp(
        usuario.email.toLowerCase(),
        password
      );
      console.log('singup');
      const photoRef = await this.foto.uploadPhoto(photo, id);

      const photoUrl = await photoRef.ref.getDownloadURL();
      usuario.foto = photoUrl;
      this.db.collection('usuarios').doc(id).set(usuario);
      this.utilidadesService.RemoverLoading();
      this.utilidadesService.PresentarToastAbajo('Usuario creado', 'success');


    } catch (error) {
      this.utilidadesService.RemoverLoading();
      console.log(error.message);
      this.utilidadesService.PresentarToastAbajo(this.authError.getError(error.code), 'danger');
    }
  }


  guardarCambios(usuario: User) {
    this.db.collection('usuarios').doc(usuario.id).set(usuario);
  }

  borrrar(id: string): Promise<void> {
    return this.usuariosRef.doc(id).delete();
  }

  update(id: string, data: any): Promise<void> {
    return this.usuariosRef.doc(id).update(data);
  }

  crearId() {
    return this.db.createId();
  }

  async obtenerPushIdAdmins() {
    console.log("entro a obtener pushIds de los admins")
    await this.db.collection('/usuarios').ref.where('role', '==', 'admin').get().then((responce) => {
      responce.docs.forEach(user => {
        if (user.data()["pushId"]) {
          this.adminsPushIds.push(user.data()["pushId"]);
        }
      });
    });
  }

  async obtenerPushIdMetres() {
    console.log("entro a obtener pushIds de los metres")
    await this.db.collection('/usuarios').ref.where('subTipo', '==', 'metre').get().then((responce) => {
      responce.docs.forEach(user => {
        if (user.data()["pushId"]) {
          this.metresPushIds.push(user.data()["pushId"]);
        }
      });
    });
  }

  async obtenerPushIdMozos() {
    console.log("entro a obtenerPushIdMozos")
    await this.db.collection('/usuarios').ref.where('subTipo', '==', 'mozo').get().then((responce) => {
      responce.docs.forEach(user => {
        if (user.data()["pushId"]) {
          this.mozosPushIds.push(user.data()["pushId"]);
        }
      });
    });
  }

  async obtenerPushIdCocineros() {
    console.log("entro a obtenerPushIdCocineros")
    await this.db.collection('/usuarios').ref.where('subTipo', '==', 'cocinero').get().then((responce) => {
      responce.docs.forEach(user => {
        if (user.data()["pushId"]) {
          this.cocinerosPushIds.push(user.data()["pushId"]);
        }
      });
    });
  }

  async obtenerPushIdBartenders() {
    console.log("entro a obtenerPushIdBartenders")
    await this.db.collection('/usuarios').ref.where('subTipo', '==', 'bartender').get().then((responce) => {
      responce.docs.forEach(user => {
        if (user.data()["pushId"]) {
          this.bartendersPushIds.push(user.data()["pushId"]);
        }
      });
    });
  }

  async obtenerPushIdClienteConReservaConfirmada(clienteId:string) {
    console.log("entro a obtenerPushIdClienteConReservaConfirmada")
    await this.db.collection('/usuarios').ref.where('id', '==', clienteId).get().then((responce) => {
      responce.docs.forEach(user => {
        if (user.data()["pushId"]) {
          this.reservaConfirmadaPushIds.push(user.data()["pushId"]);
        }
      });
    });
  }

  async obtenerPushIdClienteConReservaRechazada(clienteId:string) {
    console.log("entro a obtenerPushIdClienteConReservaRechazada")
    await this.db.collection('/usuarios').ref.where('id', '==', clienteId).get().then((responce) => {
      responce.docs.forEach(user => {
        if (user.data()["pushId"]) {
          this.reservaRechazadaPushIds.push(user.data()["pushId"]);
        }
      });
    });
  }

}
