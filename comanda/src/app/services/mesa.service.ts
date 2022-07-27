import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Mesa, TipoDeMesa } from '../clases/mesa';
import { UtilidadesService } from './utilidades.service';
import { finalize, map } from 'rxjs/operators';
import { format, parseISO, addMinutes, subMinutes, getTime } from 'date-fns';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  private dbpathMesas = '/mesas';
  private dbpathReservas = '/reservas';
  mesasRef: AngularFirestoreCollection<any>;
  mesas: Observable<any[]>;
  numero: number;
  tipo: TipoDeMesa;
  mesaSeleccionada: any;
  listaDeReservas: Observable<any[]>;
  reservasRef: AngularFirestoreCollection<any[]>;


  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private utilidadesService: UtilidadesService) {
    this.mesasRef = this.afs.collection<Mesa>(this.dbpathMesas);
    this.mesas = this.mesasRef.valueChanges(this.dbpathMesas);
    this.reservasRef = this.afs.collection<any>(this.dbpathReservas);
    this.listaDeReservas = this.reservasRef.valueChanges(this.dbpathReservas);
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

  getAll() {
    return this.mesas;
  }

  async obtenerMesa(id: string) {
    await this.afs.collection('/mesas').ref.where('id', '==', id).get().then((responce) => {
      this.mesaSeleccionada = responce.docs[0].data();
    });
  }

  async obtenerMesaCliente(id: string) {
    return this.afs.collection('/mesas').ref.where('cliente', '==', id).get().then((responce) => {
      this.mesaSeleccionada = responce.docs[0].data();
      return this.mesaSeleccionada;
    });
  }

  guardarCambios(ingreso: Mesa) {
    this.afs.collection('listaDeEspera').doc(ingreso.id).set(ingreso);
  }

  update(id: string, data: any): Promise<void> {
    return this.mesasRef.doc(id).update(data);
  }

  listaReservas() {
    return this.listaDeReservas;
  }

  public traerMesas() {
    //return this.afs.collection('mesas').get().toPromise();
    return this.mesasRef.get().toPromise();
  }

  public crearReserva(reserva: any) {
    reserva.id = this.afs.createId();
    return this.reservasRef.doc(reserva.id).set(reserva);
  }

  updateReserva(id: string, data: any): Promise<void> {
    return this.reservasRef.doc(id).update(data);
  }

  async actualizarEstadoMesasSegunReservas() {
    console.log('Entro en actualizarEstadoMesasSegunReservas');
    //declaro la fecha y hora actual
    const date = new Date();
    let fechaAntes: Date = subMinutes(date, 40);
    let fechaDespues: Date = addMinutes(date, 40);
    //busco en la base todas las reservas
    //filtro las reservas que esten +- 40 minutos segun fecha y hora actual
    let auxReservas: Array<any> = [];
    await this.traerReservas().then(snaps => {
      auxReservas = snaps.docs.map(x => {
        const y: any = x.data() as any;
        y['id'] = x.id;
        return { ...y };
      }).filter(x => fechaAntes <= x.fecha && x.fecha <= fechaDespues && x.estado === true && x.cambioEstadoDeMesa === false);
    });
    console.log('auxReservas filtradas: ' + JSON.stringify(auxReservas));
    //de las reservas que sobreviven al filtro saco las mesas y
    //hago update a las mesas resultantes como Esperando reserva 
    if (auxReservas.length > 0) {
      //Actualizo el estado de la mesa correspondiente a cada reserva activa
      let auxMesas: Array<any> = [];
      await this.traerMesas().then(snaps => {
        auxMesas = snaps.docs.map(x => {
          const y: any = x.data() as any;
          y['id'] = x.id;
          return { ...y };
        });
      });
      auxReservas.forEach(reserva => {
        auxMesas.forEach(mesa => {
          if (reserva.mesa === mesa.numero) {
            mesa.estado = "Esperando reserva";
            mesa.usuarioConReserva = reserva.clienteId;
            this.update(mesa.id, mesa);
            reserva.cambioEstadoDeMesa = true;
            this.updateReserva(reserva.id, reserva);
          }
        });
      });
    }
    console.log('Salgo de actualizarEstadoMesasSegunReservas');
  }

  public traerReservas() {
    return this.reservasRef.get().toPromise();
  }
}
