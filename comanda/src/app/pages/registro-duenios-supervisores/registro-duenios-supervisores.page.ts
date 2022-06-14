import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-registro-duenios-supervisores',
  templateUrl: './registro-duenios-supervisores.page.html',
  styleUrls: ['./registro-duenios-supervisores.page.scss'],
})
export class RegistroDueniosSupervisoresPage implements OnInit {

  public forma: FormGroup;
  imagen: any;
  public user$: Observable<User> = this.authSvc.firebaseAuth.user;
  public role: string = localStorage.getItem('role');

  constructor(
    private navegador: Router,
    private fb: FormBuilder,
    private usuarioService: UsuariosFirebaseService,
    private authSvc: AuthService,
    private utilidadesService: UtilidadesService) {  }

  ngOnInit() {
    this.forma = this.fb.group({
      'perfil': ['', Validators.required],
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],      
      'DNI': ['', Validators.required],
      'CUIL': ['', Validators.required],
      'foto': ['', Validators.required],
      
    });
  }



  changeImg(event){
    if(event.target.files && event.target.files[0]){
      this.imagen = event.target.files[0];
    }
  }

  crearUsuario(){
    this.utilidadesService.PresentarLoading("Creando usuario");
    let usuario: User = {
      role: this.forma.get('perfil').value,
      nombre: this.forma.get('nombre').value,
      apellido: this.forma.get('apellido').value,
      dni: this.forma.get('DNI').value,
      cuil: this.forma.get('CUIL').value 
    };
    const foto = this.imagen;
    this.usuarioService.nuevoUsuario(usuario, foto);
    
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
