import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Mesa, TipoDeMesa } from '../clases/mesa';
import { UtilidadesService } from './utilidades.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  private dbpath = '/mesas';
  mesasRef: AngularFirestoreCollection<Mesa>;
  mesas: Observable<any[]>;
  numero: number;
  tipo: TipoDeMesa;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private utilidadesService: UtilidadesService) {
    this.mesasRef = this.afs.collection<Mesa>(this.dbpath);
    this.mesas = this.mesasRef.valueChanges(this.dbpath);
  }

  altaMesa(mesa: Mesa, foto: File) {


    let pathRef = `fotos/mesas/${mesa.numero}`;
    const fileRef = this.storage.ref(pathRef);
    const task = this.storage.upload(pathRef, foto);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async res => {
          mesa.foto = res;
          this.afs.collection('mesas').doc(mesa.id).set(mesa);
          this.utilidadesService.RemoverLoading();
          this.utilidadesService.PresentarToastAbajo("Mesa Creada!", "success");
        })
      })
    ).subscribe();

  }
}
