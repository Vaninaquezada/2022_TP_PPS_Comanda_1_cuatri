import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { MenuController, ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';

import { AuthService } from 'src/app/services/auth.service';
import { ListaDeEsperaFirebaseService } from 'src/app/services/lista-de-espera-firebase.service';
import { MesaService } from 'src/app/services/mesa.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedidos } from 'src/app/clases/pedidos';
import { CuentaComponent } from 'src/app/componentes/cuenta/cuenta.component';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
})
export class MesaPage implements OnInit {

  code: any;
  listaDeEspera: any;
  listaMesas: any;
  mostrar = false;
  hayPedido = false;
  pedi: Pedidos;
  cosa: any;
  mesaNumero: string;
  idMesa: string;
  usuario: User;
  mesaActual: string;
  constructor(
    private navegador: Router,
    private authSvc: AuthService,
    private usera: UsuariosFirebaseService,
    private mesaService: MesaService,
    private barcodeScanner: BarcodeScanner,
    private utilidadesService: UtilidadesService,
    private menuController: MenuController,
    private pedido: PedidosService,
    private modal: ModalController,
    private listaEsperaService: ListaDeEsperaFirebaseService
  ) {
    this.MenuView();
    this.listaEsperaService.getAllToday().subscribe(resultado => {
      this.listaDeEspera = resultado;

    })
    this.mesaService.getAll().subscribe(resultado => {
      this.listaMesas = resultado;
    })

    this.usuario = this.usera.usuarioSeleccionado;
    console.log('previo al if');
    if (this.usuario) {
      console.log('previo al switch');
      switch (this.usuario.mesaId) {
        case "JYCjbOgLWRTzkfyknquy"://mesa1
          console.log('adentro case mesa 1');
          this.mesaNumero = "Mesa 1";
          this.mostrar = true;
          this.gestionPedidos("JYCjbOgLWRTzkfyknquy");
          break;
        case "zZCtyY4gqhvEkkK2RyxD"://mesa2
          console.log('adentro case mesa 2');
          this.mesaNumero = "Mesa 2";
          this.mostrar = true;
          this.gestionPedidos("zZCtyY4gqhvEkkK2RyxD");
          break;
        case "BVIBfLHDswZd77dWWCLR"://mesa3
          console.log('adentro case mesa 3');

          this.mesaNumero = "Mesa 3";
          this.mostrar = true;
          this.gestionPedidos("BVIBfLHDswZd77dWWCLR");
          break;
        default:
          break;
      }
    }

  }

  ngOnInit() {
    this.getCliente();
    this.usuario = this.usera.usuarioSeleccionado;

  }
  ionViewDidEnter() {
    this.gestionPedidos(this.usuario.mesaId);
    //this.mostrar = false;
  }
  MenuView() {
    this.menuController.enable(true, 'clientesMenu');
    this.menuController.enable(false, 'adminMenu');
    this.menuController.enable(false, 'empleadosMenu');
  }

  Scan(): void {

    for (let index = 0; index < this.listaDeEspera.length; index++) {
      const ingreso = this.listaDeEspera[index];
      console.log(ingreso.id)
      
      if(ingreso.cliente.email == localStorage.getItem("usuario")){
        // console.log("coincide mail")
        if(ingreso.estado == "aprobado"){          
          
         this.barcodeScanner.scan().then(barcodeData => {
           console.log('Barcode data', barcodeData);
           this.code = barcodeData.text;
           this.mesaService.actualizarEstadoMesasSegunReservas();
              switch (this.code) {

                case "JYCjbOgLWRTzkfyknquy": //Mesa 1
                  if(ingreso.mesaId == this.code){
                    for (let index = 0; index < this.listaMesas.length; index++) {
                      const element = this.listaMesas[index];
                      if(element.id == "JYCjbOgLWRTzkfyknquy"){
                        if(element.estado == "libre"){
                          this.utilidadesService.PresentarToastAbajo("Mesa 1", "success");                  
                          this.mesaService.update("JYCjbOgLWRTzkfyknquy", {estado: "ocupado",cliente: this.usuario.id});
                          this.usuario.mesaId = "JYCjbOgLWRTzkfyknquy";
                          this.usuario.numeroMesa = 1;
                          this.usera.guardarCambios( this.usuario);
                          this.mesaNumero = "Mesa 1";
                          this.mostrar = true; 
                            
                          this.gestionPedidos("JYCjbOgLWRTzkfyknquy");
             
                          break;
                        }else if (element.estado === 'Esperando reserva') {
                      		this.utilidadesService.PresentarToastAbajo("Mesa 1 reservada.", "danger");
	                     	break;
	                    } else {
	                      this.utilidadesService.PresentarToastAbajo("Mesa 1 no disponible", "danger");
	                      break;	
                        }
                      }
                    }
                  }else{
                    this.utilidadesService.PresentarToastAbajo("Tu mesa asignada es la: "+ ingreso.mesaNro, "danger");
                    break;
                  }                  
                  break;
                  
      
                case "zZCtyY4gqhvEkkK2RyxD": //Mesa 2
                  if(ingreso.mesaId == this.code){
                    for (let index = 0; index < this.listaMesas.length; index++) {
                      const element = this.listaMesas[index];
                      if(element.id == "zZCtyY4gqhvEkkK2RyxD"){
                        if(element.estado == "libre"){
                          this.utilidadesService.PresentarToastAbajo("Mesa 2", "success");                  
                          this.mesaService.update("zZCtyY4gqhvEkkK2RyxD", {estado: "ocupado",cliente: this.usuario.id});
                          this.usuario.mesaId = "zZCtyY4gqhvEkkK2RyxD";
                          this.usuario.numeroMesa = 2;
                          this.usera.guardarCambios( this.usuario);
                          this.mesaNumero = "Mesa 2";
                          this.mostrar = true; 

                          this.gestionPedidos("zZCtyY4gqhvEkkK2RyxD");
                
                          break;
                        }else if (element.estado === 'Esperando reserva') {
                     		 this.utilidadesService.PresentarToastAbajo("Mesa 2 reservada.", "danger");
                      		 break;
                    	} else {
	                      	this.utilidadesService.PresentarToastAbajo("Mesa 2 no disponible", "danger");
	                      	break;
                        }
                      }
                    }
                  }else{
                    this.utilidadesService.PresentarToastAbajo("Tu mesa asignada es la: "+ ingreso.mesaNro, "danger");
                    break;
                  }
                  break;
      

                case "BVIBfLHDswZd77dWWCLR": //Mesa 3
                  if(ingreso.mesaId == this.code){
                    for (let index = 0; index < this.listaMesas.length; index++) {
                      const element = this.listaMesas[index];
                      if(element.id == "BVIBfLHDswZd77dWWCLR"){
                        if(element.estado == "libre"){
                          this.utilidadesService.PresentarToastAbajo("Mesa 3", "success");                  
                          this.mesaService.update("BVIBfLHDswZd77dWWCLR", {estado: "ocupado",cliente: this.usuario.id});
                          this.mostrar = true;   
                          this.usuario.mesaId = "BVIBfLHDswZd77dWWCLR";
                          this.usuario.numeroMesa = 3;
                          this.usera.guardarCambios( this.usuario);
                          this.mesaNumero = "Mesa 3";
                          this.gestionPedidos("BVIBfLHDswZd77dWWCLR");

                          break;
                        }else if (element.estado === 'Esperando reserva') {
                      		this.utilidadesService.PresentarToastAbajo("Mesa 3 reservada.", "danger");
                    		break;
                    	} else{
                          this.utilidadesService.PresentarToastAbajo("Mesa 3 no disponible", "danger");
                          break;
                        }
                      }
                    }
                  }else{
                    this.utilidadesService.PresentarToastAbajo("Tu mesa asignada es la: "+ ingreso.mesaNro, "danger");
                    break;
                  }
                  break;

              
                default:
                  this.utilidadesService.PresentarToastAbajo("Código inválido", "danger"); 
                  break;
              }           
      
          }).catch(err => {
            console.log('Error', err);

          })


        } else {
          this.utilidadesService.PresentarToastAbajo("Aun no fue aprobado por el metre", "warning");
        }
      } else {
        this.utilidadesService.PresentarToastAbajo("Ustedes no esta en la lista de espera", "danger");
      }
    }

  }



  Navegar(ruta: string) {
    console.log("entra en navegar");
    this.navegador.navigate([ruta]);
  }

  async getCliente() {
    await this.usera.obtenerUsuario(localStorage.getItem('usuario'));
  }

  getEstadoPedido(estadoPedido: string) {
    const estado = estadoPedido || '';
    switch (estado) {
      case 'pendiente':
        return 'Confirmando pedido';
      case 'preparando':
        return 'Preparando pedido';
      case 'terminado':
        return 'Entregando pedido';
      case 'confirmarEntrega':
        return 'Esperando confirmación del cliente';
      case 'entregado':
        return 'Pedido entregado';
      case 'aPagar':
        return 'Esperando confirmación de pago';
      case 'pagado':
        return 'Pedido pagado';
      default:
        return 'No se ha realizado un pedido';
    }
  }

  confirmarEntrega() {
    this.pedi.estado = 'entregado';
    this.pedido.updatePedido(this.pedi);
  }
  pagar() {
    this.pedi.estado = 'pagado';
    this.pedido.updatePedido(this.pedi);
    this.mesaService.update(this.pedi.mesaId, { estado: 'libre', cliente: null, usuarioConReserva:'' });
    this.usuario.mesaId = null;
    this.usuario.numeroMesa = null;
    console.log('mesa '+this.usuario.mesaId);
    this.usuario.encuestaCompletada= false;
    this.usera.guardarCambios(this.usuario);
    this.Navegar('/principal');
  }

  pedirCuenta() {
    this.pedi.estado = 'aCobrar';
    console.log(' this.pedi.estado', this.pedi.estado);
    this.pedido.updatePedido(this.pedi);

  }


  async presentModal(pedido: Pedidos) {
    const pedidoId = pedido.pedidoId;

    const modal = await this.modal.create({
      component: CuentaComponent,
      swipeToClose: true,
      presentingElement: await this.modal.getTop(),
      backdropDismiss: false,
      componentProps: {
        pedido: this.pedi,
        pedidoId,
        boton: ''
      },
    });
    return await modal.present();

  }

  gestionPedidos(codigo: string) {

    this.pedido.getPedidoByMesaId(codigo).then((p) =>
      p.subscribe((data) => {
        console.log('data', data);
        this.pedi = data[0];
        console.log(data[0]);
        if (this.pedi) {
          if (this.pedi.estado !== 'pagado') {
            console.log('lloremos', this.pedi);
            this.hayPedido = true;
          }
        }

      })
    );
  }

  async getQrPropinaData() {
    console.log('barcodeData.text');
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('barcodeData.text');
      if (barcodeData.text === 'propina') {
        this.Navegar('/propina');
      } else {
        this.utilidadesService.PresentarToastAbajo('Qr invalido', 'danger');
      }

    });
    /*  console.log('getQrPropinaData',propina);
      this.cosa = propina;
      this.Navegar('/propina');
      if (propina ==='propina') {
        this.Navegar('/propina');
      }else{
      this.utilidadesService.PresentarToastAbajo('Qr invalido', 'danger');
    }
    */
  }


  encuesta(){
    this.Navegar('/encuesta-clientes');
  }
  encuestaGraficos(){
    this.Navegar('/graficos-encuesta');
  }

}
