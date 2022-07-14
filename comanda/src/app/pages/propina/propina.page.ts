import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { Pedidos } from 'src/app/clases/pedidos';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-propina',
  templateUrl: './propina.page.html',
  styleUrls: ['./propina.page.scss'],
})
export class PropinaPage implements OnInit {


  propina: string;
  valor: string;
  total: string;
  usuario: User;
  pedi: Pedidos;
  constructor(private authSvc: AuthService,
     private user: UsuariosFirebaseService,
     private pedido: PedidosService,
     private router: Router ) { }

  ngOnInit() {
   this.getCliente();

   this.usuario= this.user.usuarioSeleccionado;

   this.gestionPedidos(this.usuario.mesaId);
  /*
    this.pedi=  {
      pedidoId: this.user.crearId(),
      mesaId: '',
      numeroMesa: 0,
      tiempoEstimado: 0,
      propina: 0,
      precioTotal: 10,
      estado: 'pendiente',
      platos: [],
    };
    */
  }

  darPropina(){
    this.calcularPropina(this.valor);

    this.pedido.updatePedido(this.pedi);
    this.router.navigate(['/mesa']);
}


  async getCliente(){
    await this.user.obtenerUsuario(localStorage.getItem('usuario'));
  }

  gestionPedidos(codigo: string){

    this.pedido.getPedidoByMesaId(codigo).then((p) =>
    p.subscribe((data) => {
      console.log('data',data);
      this.pedi= data[0];
      console.log(data[0]);
      if(this.pedi){

      }

    })
  );
}

calcularPropina(monto: string){
      switch (monto) {
          case '20%':
          this.pedi.propina =  Number((this.pedi.precioTotal * 0.20).toFixed(2));
            this.pedi.precioTotal = this.pedi.precioTotal + this.pedi.propina;
            break;
          case '15%':
            this.pedi.propina = Number((this.pedi.precioTotal * 0.15).toFixed(2)); ;
            this.pedi.precioTotal = this.pedi.precioTotal + this.pedi.propina;
            break;
          case '10%':
            this.pedi.propina = Number((this.pedi.precioTotal * 0.10).toFixed(2));
            this.pedi.precioTotal = this.pedi.precioTotal + this.pedi.propina;
            break;
          case '5%':
            this.pedi.propina = Number((this.pedi.precioTotal * 0.05).toFixed(2));
            this.pedi.precioTotal = this.pedi.precioTotal + this.pedi.propina;
            break;
          case '0%':
            this.pedi.propina = 0;
            this.pedi.precioTotal = this.pedi.precioTotal + 0;
            break;
        default:
          break;
      }
    }

    radioGroupChange(event) {
      console.log('radioGroupChange',this.valor );

    }


    singOut(){
      this.authSvc.LogOut();
      this.router.navigate(['login']);
    }
}
