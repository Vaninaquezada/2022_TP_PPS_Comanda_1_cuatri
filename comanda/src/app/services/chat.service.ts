import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { updateDoc, serverTimestamp } from 'firebase/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { AuthService } from './auth.service';
import { UsuariosFirebaseService } from './usuarios-firebase.service';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../clases/user';
import { Mensajes } from '../clases/mensajes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  mail;
  usuario;
  frommsg;
  constructor(private afs: AngularFirestore, private user: UsuariosFirebaseService,private authSvc: AuthService, private router: Router) {
    this.getCliente();
    this.usuario = this.user.usuarioSeleccionado;
  }

  addChatMessage(msg) {
    let from;
    if (this.usuario.role === 'cliente') {
         from = 'Mesa '+ this.usuario.numeroMesa;
    }else{
      from = 'Mozo';
    }
    return this.afs.collection('mensajes').add({
      msg,
      from,
      createdAt: serverTimestamp()
    });

  }

  getChatMessages() {
    let users = [];

    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        return this.afs.collection('mensajes', ref => ref.orderBy('createdAt', 'asc'))
          .valueChanges({ idField: 'id' }) as Observable<Mensajes[]>;
      }),
      map(messages => {
        // Get the real name for each user
        // eslint-disable-next-line prefer-const
        for (let m of messages) {
          m.fromName = m.from;
          console.log('rol' + this.usuario.role);
          if(this.usuario.role === 'empleado'){
            m.myMsg = 'Mozo' === m.from;
            console.log('Mozo' + m.myMsg);
            console.log('rol' + this.usuario.role);
            console.log('rol' + this.usuario.id);
          }else{
            m.myMsg = 'Mesa '+ this.usuario.numeroMesa === m.from;
            console.log(this.usuario.numeroMesa );
            console.log(m.from);
            console.log('rol ' + this.usuario.role);
            console.log('Mesa '+ this.usuario.numeroMesa);
          }

        }
        return messages;
      })
    );
  }

  async getCliente(){
    await this.user.obtenerUsuario(localStorage.getItem('usuario'));
  }

  private getUsers() {
    return this.afs.collection('usuarios').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }

  private getUserForMsg(msgFromId, users: User[]): string {
    //   console.log("users", users);
    // eslint-disable-next-line prefer-const
    for (let usr of users) {

      if (usr.email === msgFromId) {
        return usr.email;
      }
    }
    return 'Deleted';
  }



}
