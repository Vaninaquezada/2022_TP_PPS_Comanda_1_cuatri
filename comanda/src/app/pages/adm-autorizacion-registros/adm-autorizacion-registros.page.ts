import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

@Component({
  selector: 'app-adm-autorizacion-registros',
  templateUrl: './adm-autorizacion-registros.page.html',
  styleUrls: ['./adm-autorizacion-registros.page.scss'],
})
export class AdmAutorizacionRegistrosPage implements OnInit {
  listadoUsuarios: any;

  constructor(private navegador: Router, private usuariosService: UsuariosFirebaseService, private authSvc: AuthService) {
    this.usuariosService.getAll().subscribe(resultado => {
      this.listadoUsuarios = resultado;
    })
  }

  ngOnInit() {
  }

  Habilitacion(user: User){
    user.verificadoPorAdm = !user.verificadoPorAdm
    this.usuariosService.guardarCambios(user);
  }

  Navegar(ruta: string){
    console.log("entra en navegar");
    this.navegador.navigate([ruta]);
  }

  Desconectarse(){
    this.authSvc.LogOut();
    this.Navegar("home");
  }
}
