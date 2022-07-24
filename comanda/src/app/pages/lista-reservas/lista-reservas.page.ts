import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { MesaService } from 'src/app/services/mesa.service';

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
    reserva.pendiente=false;
      this.mesasService.updateReserva(reserva.id, reserva);
    if (reserva.estado) {
      //mandar notif? o mail?
    } else {
      //mandar notif? o mail?
    }
  }

  rechazar(reserva: any) {
    reserva.estado = false;
    reserva.pendiente=false;
    this.mesasService.updateReserva(reserva.id, reserva);
    if (reserva.estado) {
      //mandar notif? o mail?
    } else {
      //mandar notif? o mail?
    }
  }
}
