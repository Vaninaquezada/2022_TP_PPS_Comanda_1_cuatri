import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-principal-adm',
  templateUrl: './principal-adm.page.html',
  styleUrls: ['./principal-adm.page.scss'],
})
export class PrincipalAdmPage implements OnInit {


  public role: string = localStorage.getItem('role');
  
  constructor(    
    private navegador: Router,
    private usuarioService: UsuariosFirebaseService,
    private authSvc: AuthService,
    private utilidadesService: UtilidadesService
  ) { }

  ngOnInit() {
  }

  Navegar(ruta: string){
    console.log("entra en navegar");
    this.navegador.navigate([ruta]);
  }

  Desconectarse(){
    this.authSvc.LogOut();
    this.role = "";
    this.Navegar("home");
  }


}
