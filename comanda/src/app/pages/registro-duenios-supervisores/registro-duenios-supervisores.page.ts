import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
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
    private utilidadesService: UtilidadesService,
    private menuController: MenuController) {
      this.MenuView();
    }

  ngOnInit() {
    this.forma = this.fb.group({
      'perfil': ['', Validators.required],
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'DNI': ['', Validators.required],
      'CUIL': ['', Validators.required],
      'foto': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'repetirPassword': ['', Validators.required]
    });
  }

  MenuView(){
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(false, 'empleadosMenu');
    this.menuController.enable(true, 'adminMenu');
  }

  changeImg(event) {
    if (event.target.files && event.target.files[0]) {
      this.imagen = event.target.files[0];
    }
  }

  async registrarse() {
    if (this.forma.get('password').value == this.forma.get('repetirPassword').value) {
      this.utilidadesService.PresentarLoading("Creando usuario");
      console.log("bien contraseñas");

      try {
        const user = await this.authSvc.SignUp(this.forma.get('email').value.toLowerCase(), this.forma.get('password').value);
        if (user) {
          this.crearUsuario();
          this.checkUserIsVerified(user);
        }
      } catch (error) {
        console.log(error);
      }
      this.utilidadesService.RemoverLoading();
    } else {
      this.utilidadesService.PresentarToastAbajo("Las contraseñas no coinciden", "danger");
      this.utilidadesService.RemoverLoading();
    }
  }

  crearUsuario() {
    let usuario: User = {
      role: 'admin',
      subTipo: this.forma.get('perfil').value,
      nombre: this.forma.get('nombre').value,
      apellido: this.forma.get('apellido').value,
      dni: this.forma.get('DNI').value,
      cuil: this.forma.get('CUIL').value,
      email: this.forma.get('email').value
    };
    const foto = this.imagen;
    this.usuarioService.nuevoUsuario(usuario, foto);

  }

  Navegar(ruta: string) {
    console.log("entra en navegar");
    this.navegador.navigate([ruta]);
  }

  Desconectarse() {
    this.authSvc.LogOut();
    this.role = "";
    this.Navegar("home");
  }

  private checkUserIsVerified(user: User) {
    if (user && user.verificadoPorAdm) {
      this.navegador.navigate(['/']);
      localStorage.setItem('usuario', this.forma.get('email').value.toLowerCase())
    } else if (user) {
      this.navegador.navigate(['/verificacion-registro']);
    } else {
      this.navegador.navigate(['/registro']);
    }
  }


}
