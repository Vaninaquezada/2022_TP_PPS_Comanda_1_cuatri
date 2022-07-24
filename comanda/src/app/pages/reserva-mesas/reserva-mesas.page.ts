import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { format, parseISO, addMinutes, subMinutes,getTime } from 'date-fns';
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
	private miFormulario: FormGroup;
	// public fechaValorActual: string;
	public fechaValorMinimo: string;
	public fechaValorMaximo: string;
	public flagNumMesa: any = null;
	date = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'
	formatedDate = '';

	constructor(
		private mesasService: MesaService,
		private formBuilder: FormBuilder,
		private utilidadesService: UtilidadesService,
		private usuariosFire: UsuariosFirebaseService
	) {
		this.setToday();
	}

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

	setToday() {
		this.formatedDate = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'), 'HH:mm, MMM d, yyyy');
	}

	ngOnInit() {
		this.miFormulario = this.formBuilder.group({
			'fecha': ['', Validators.required],
			'tipoMesa': ['', Validators.required],
			'comensales': ['', [Validators.required, Validators.min(1), Validators.max(99)]]
		});
		let d = new Date();
		this.fechaValorMinimo = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString();
		this.fechaValorMaximo = new Date((d.getTime() - (d.getTimezoneOffset() * 60000)) + (1 * 365 * 24 * 60 * 60 * 1000)).toISOString();

		this.mesasService.listaReservas().subscribe(result => {
			this.listaReservas = result;
		});
	}

	Ifecha(value) {
		console.log(value);
		this.date = value;
		this.formatedDate = format(parseISO(value), 'HH:mm, MMM d, yyyy');
	}

	ITipo($event) {
		this.miFormulario.controls.tipoMesa.setValue($event.detail.value);
	}

	async cargarReserva() {
		await this.utilidadesService.PresentarLoading('Solicitando reserva');
		this.usuarioLogueado = this.usuariosFire.usuarioSeleccionado;
		let auxMesas: Array<any> = [];
		let fechaAntes: Date = subMinutes(parseISO(this.date), 40);
		let fechaDespues: Date = addMinutes(parseISO(this.date), 40);

		if (this.miFormulario.valid) {
			if (getTime(parseISO(this.date)) > (Date.now() + (40 * 60 * 1000))) {
				if (this.listaReservas.length == 0) {
					this.mesasService.traerMesas().then(snaps => {
						auxMesas = snaps.docs.map(x => {
							const y: any = x.data() as any; y['id'] = x.id; return { ...y };
						}).filter(x => x.cantidadComensales === this.miFormulario.value.comensales && x.tipo === this.miFormulario.value.tipoMesa);
						console.log("AuxMesas.length: " + auxMesas.length);
						if (auxMesas.length > 0) {
							this.flagNumMesa = auxMesas[0].numero;
							return this.crearReserva(this.flagNumMesa, getTime(parseISO(this.date)));
						} else {
							this.utilidadesService.PresentarToastAbajo('No se han encontrado mesas que cumplan con los filtros.', 'danger');
						}
					}).then(ref => {
						//Enviar notificationn
						this.utilidadesService.PresentarToastAbajo('Reserva cargada con exito. El dueño o supervisor revisara su solicitud.', 'success');
					});//.finally(() => this.utilidadesService.RemoverLoading());
				} else {
					if (this.listaReservas.findIndex(x => x.clienteId === this.usuarioLogueado.id && (x.fecha >= getTime(fechaAntes) && x.fecha <= getTime(fechaDespues))) === -1) {
						this.mesasService.traerMesas().then(snaps => {
							auxMesas = snaps.docs.map(x => {
								const y: any = x.data() as any; y['id'] = x.id; return { ...y };
							}).filter(x => x.cantidadComensales === this.miFormulario.value.comensales && x.tipo === this.miFormulario.value.tipoMesa);
							if (auxMesas.length > 0) {
								auxMesas.forEach(x => {
									console.log("AuxMesas[x]: " + JSON.stringify(x));
									//FALTA VALIDAR EL ESTADO EN TRUE
									if (this.listaReservas.findIndex(y => y.mesa === x.numero && (y.fecha >= getTime(fechaAntes) && y.fecha <= getTime(fechaDespues))) === -1) {
										this.flagNumMesa = x.numero;
									}
								});
								if (this.flagNumMesa !== null) {
									return this.crearReserva(this.flagNumMesa, getTime(parseISO(this.date)));
								} else {
									this.utilidadesService.PresentarToastAbajo('Todas las mesas que cumplen con los requisitos ya estan reservadas para este horario (' + fechaAntes + ' - ' + fechaDespues + ').', 'danger');
								}
							} else {
								this.utilidadesService.PresentarToastAbajo('No se han encontrado mesas que cumplan con los requisitos solicitados.', 'danger');
							}
						}).then(ref => {
							//Enviar Notif
							this.utilidadesService.PresentarToastAbajo('Reserva cargada con exito. el dueño o supervisor revisara su solicitud.', 'success');
						});//.finally(() => this.utilidadesService.RemoverLoading());
					} else {
						this.utilidadesService.PresentarToastAbajo('Ya tienes una reserva hecha para este horario (' + format(fechaAntes, 'HH:mm, MMM d, yyyy') + ' - ' + format(fechaDespues, 'HH:mm, MMM d, yyyy')+ ').', 'danger');
					}
				}
			} else {
				this.utilidadesService.PresentarToastAbajo('Se ha asignado una fecha invalida. La reserva se debe cargar 40 minutos antes de ser efectiva.', 'danger');
			}
		}
		this.utilidadesService.RemoverLoading();
	}

	crearReserva(mesa, fecha) {
		console.log("Crear reserva: mesa y fecha " + mesa + fecha);
		let reservaJson = {
			fecha: fecha,
			fechaFormateada: format(fecha, 'HH:mm, MMM d, yyyy'),
			clienteId: this.usuarioLogueado.id,
			nombreCliente: this.usuarioLogueado.nombre+' '+this.usuarioLogueado.apellido,
			mesa: mesa,
			estado: false,
			pendiente: true
		}
		console.log(reservaJson);
		return this.mesasService.crearReserva(reservaJson);
	}

}

