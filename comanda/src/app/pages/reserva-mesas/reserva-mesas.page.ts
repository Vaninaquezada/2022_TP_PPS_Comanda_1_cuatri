import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { MesaService } from 'src/app/services/mesa.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';



@Component({
	selector: 'app-reserva-mesas',
	templateUrl: './reserva-mesas.page.html',
	styleUrls: ['./reserva-mesas.page.scss'],
})
export class ReservaMesasPage implements OnInit {
	usuarioLogueado = new User();
	public splash: boolean = false;
	public listaReservas: Array<any> = [];
	public miFormulario: FormGroup = this.formBuilder.group({
		fecha: [null, Validators.required],
		tipoMesa: [null, Validators.required],
		comensales: [null, [Validators.required, Validators.min(1), Validators.max(99)]]
	});
	public fechaValorActual: string;
	public fechaValorMinimo: string;
	public fechaValorMaximo: string;
	public flagNumMesa: any = null;
	constructor(private mesasService: MesaService, private formBuilder: FormBuilder, private utilidadesService: UtilidadesService,private usuariosFire: UsuariosFirebaseService) { }

	validation_messages = {
		'fecha': [
			{ type: 'required', message: 'La fecha es requerida.' },
		],
		'tipoMesa': [
			{ type: 'required', message: 'El tipo de mesa es requerido.' },
		],
		'comensales': [
			{ type: 'required', message: 'La cantidad de personas es requerida.' },
			{ type: 'min', message: 'El numero de personas debe ser mayor a 0.' },
			{ type: 'max', message: 'El numero de personas debe ser menor a 100.' },
		]
	};

	ngOnInit() {
		let d = new Date();
		this.fechaValorMinimo = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString();
		this.fechaValorMaximo = new Date((d.getTime() - (d.getTimezoneOffset() * 60000)) + (1 * 365 * 24 * 60 * 60 * 1000)).toISOString();

		this.mesasService.listaReservas().subscribe(result => {
			this.listaReservas = result;
		});
	}

	Ifecha($event) {
		let fecha = new Date($event.detail.value);
		this.fechaValorActual = fecha.toISOString();
		this.miFormulario.controls.fecha.setValue(fecha.getTime());
	}

	ITipo($event) {
		this.miFormulario.controls.tipoMesa.setValue($event.detail.value);
	}

	cargarReserva() {
		this.utilidadesService.PresentarLoading("Solicitando reserva");
		this.usuarioLogueado = this.usuariosFire.usuarioSeleccionado;
		let auxMesas: Array<any> = [];
		let fechaAntes: number = this.miFormulario.value.fecha - (40 * 60 * 1000);
		let fechaDespues: number = this.miFormulario.value.fecha + (40 * 60 * 1000);
		if (this.miFormulario.valid) {
			if (this.miFormulario.value.fecha > (Date.now() + (40 * 60 * 1000))) {
				if (this.listaReservas.length == 0) {
					this.mesasService.traerMesas().then(snaps => {
						auxMesas = snaps.docs.map(x => {
							const y: any = x.data() as any; y['id'] = x.id; return { ...y };
						}).filter(x => x.comensales === this.miFormulario.value.comensales && x.tipo === this.miFormulario.value.tipoMesa);
						if (auxMesas.length > 0) {
							this.flagNumMesa = auxMesas[0].numero;
							return this.crearReserva(this.flagNumMesa, this.miFormulario.value.fecha);
						} else {
							this.utilidadesService.PresentarToastAbajo('No se han encontrado mesas que cumplan con los filtros.', 'danger');
						}
					}).then(ref => {
						//Enviar notification
						this.utilidadesService.PresentarToastAbajo('Reserva cargada con exito. el dueño o supervisor revisara su solicitud.', 'success');
					}).finally(() => this.utilidadesService.RemoverLoading());
				} else {
					if (this.listaReservas.findIndex(x => x.cliente === this.usuarioLogueado.id && (x.fecha >= fechaAntes && x.fecha <= fechaDespues)) === -1) {
						this.mesasService.traerMesas().then(snaps => {
							auxMesas = snaps.docs.map(x => {
								const y: any = x.data() as any; y['id'] = x.id; return { ...y };
							}).filter(x => x.comensales === this.miFormulario.value.comensales && x.tipo === this.miFormulario.value.tipoMesa);
							if (auxMesas.length > 0) {
								auxMesas.forEach(x => {
									if (this.listaReservas.findIndex(y => y.mesa === x.numero && (x.fecha >= fechaAntes && x.fecha <= fechaDespues)) === -1) {
										this.flagNumMesa = x.numero;
									}
								});
								if (this.flagNumMesa !== null) {
									return this.crearReserva(this.flagNumMesa, this.miFormulario.value.fecha);
								} else {
									this.utilidadesService.PresentarToastAbajo('Todas las mesas que cumplen con los requisitos ya estan reservadas para este horario (' + new Date(fechaAntes).toLocaleString() + ' - ' + new Date(fechaDespues).toLocaleString() + ').', 'danger');
								}
							} else {
								this.utilidadesService.PresentarToastAbajo('No se han encontrado mesas que cumplan con los requisitos solicitados.', 'danger');
							}
						}).then(ref => {
							//Enviar Notif
							this.utilidadesService.PresentarToastAbajo('Reserva cargada con exito. el dueño o supervisor revisara su solicitud.', 'success');
						}).finally(() => this.utilidadesService.RemoverLoading());
					} else {
						this.utilidadesService.RemoverLoading();
						this.utilidadesService.PresentarToastAbajo('Ya tienes una reservacion echa para este horario (' + new Date(fechaAntes).toLocaleString() + ' - ' + new Date(fechaDespues).toLocaleString() + ').', 'danger');
					}
				}
			} else {
				this.utilidadesService.RemoverLoading();
				this.utilidadesService.PresentarToastAbajo('se ha asignado una fecha invalida. la reserva se debe cargar 40 minutos antes de ser efectiva.', 'danger');
			}
		}
	}

	crearReserva(mesa, fecha) {
		let reservaJson = {
			fecha: fecha,
			cliente: this.usuarioLogueado.id,
			mesa: mesa,
			estado: false,
		}
		console.log(reservaJson);
		return this.mesasService.crearReserva(reservaJson);
	}

}

