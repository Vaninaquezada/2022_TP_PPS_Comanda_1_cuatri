import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { MesaService } from 'src/app/services/mesa.service';
import { PushOneSignalService } from 'src/app/services/push-one-signal.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.page.html',
  styleUrls: ['./lista-reservas.page.scss'],
})
export class ListaReservasPage implements OnInit {

  listaReservas: any;

  public role: string = localStorage.getItem('role');

  constructor(
    private navegador: Router,
    private usuarioService: UsuariosFirebaseService,
    private pushOneSignal: PushOneSignalService,
    private mesasService: MesaService,
    private authSvc: AuthService,
    private emailService: EmailService,
  ) { }

  ngOnInit() {
    this.mesasService.listaReservas().subscribe(result => {
      this.listaReservas = result;
    });
  }

  aceptar(reserva: any) {
    reserva.estado = true;
    reserva.pendienteValidacion=false;
    this.mesasService.updateReserva(reserva.id, reserva);
    this.usuarioService.obtenerPushIdClienteConReservaConfirmada(reserva.clienteId).then(response => {
      console.log("this.obtenerPushIdClienteConReservaConfirmada" + JSON.stringify(this.usuarioService.reservaConfirmadaPushIds));
      this.pushOneSignal.enviarNotifReservaConfirmada(this.usuarioService.reservaConfirmadaPushIds, "Info adicional bla");
    });
  }

  rechazar(reserva: any) {
    reserva.estado = false;
    reserva.pendienteValidacion=false;
    this.mesasService.updateReserva(reserva.id, reserva);
    this.usuarioService.obtenerPushIdClienteConReservaRechazada(reserva.clienteId).then(response => {
      console.log("this.obtenerPushIdClienteConReservaRechazada" + JSON.stringify(this.usuarioService.reservaConfirmadaPushIds));
      this.pushOneSignal.enviarNotifReservaRechazada(this.usuarioService.reservaConfirmadaPushIds, "Info adicional bla");
    });
  }
}
