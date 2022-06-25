/* eslint-disable max-len */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from '../services/utilidades.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  ingresoApp = false;
  iniciado = false;

  emailIngreso: string = '';
  contraIngreso: string = '';
  mostrar = false;
  usuarioLogueado = new User();

  constructor(public firebaseService: AuthService, private router: Router, private usuariosFire: UsuariosFirebaseService, private utilidadesService: UtilidadesService) {}


  async OnSignIn(email: string, password: string){
    try {
      this.utilidadesService.PresentarLoading('Ingresando...');
      const user = await this.firebaseService.SignIn(email,password);
      this.checkUserIsVerified(user);
      localStorage.setItem('usuario', email);
    } catch (error) {
      this.utilidadesService.RemoverLoading();
      this.utilidadesService.PresentarToastAbajo('Credenciales Incorrectas', 'danger');
      // this.router.navigate(['/registro']);
      console.log(error);
    }
  }

  completaIngreso(ingreso: string){
    switch(ingreso){
      case 'usuario1':
        this.emailIngreso= 'duenio';
        this.contraIngreso = '111111';
        break;
      case 'supervisor':
        this.emailIngreso= 'tester@tester.com';
        this.contraIngreso = '555555';
        break;
      case 'metre':
        this.emailIngreso= 'metre@empleado.com';
        this.contraIngreso = '123456';
        break;
      case 'mozo':
        this.emailIngreso= 'mozo@mozo.com';
        this.contraIngreso = '123456';
        break;
      case 'bartender':
        this.emailIngreso= 'bartender@empleado.com';
        this.contraIngreso = '123456';
        break;
      case 'cocina':
          this.emailIngreso= 'cocina@empleado.com';
          this.contraIngreso = '123456';
          break;
      case 'registrado':
            this.emailIngreso= 'registrado@cliente.com';
            this.contraIngreso = '123456';
            break;
       case 'anonimo':
        this.emailIngreso= 'anonimo@anonimo.com';
        this.contraIngreso = '444444';
        break;
    }
  }

  Mostrar(){
    this.mostrar = !this.mostrar;
    console.log(this.mostrar);
  }

  private async checkUserIsVerified(user: User) {
    console.log('entra en chequeo de usuario');
    if (user) {
      await this.usuariosFire.obtenerUsuario(user.email);
      this.usuarioLogueado = this.usuariosFire.usuarioSeleccionado;
      if(this.usuarioLogueado.ingresos){
        this.usuarioLogueado.ingresos.push(new Date());
      }else{
        this.usuarioLogueado.ingresos = new Array<Date>();
        this.usuarioLogueado.ingresos.push(new Date());
      }
      this.usuariosFire.update(this.usuariosFire.id, {ingresos: this.usuarioLogueado.ingresos});
      console.log(this.usuarioLogueado.role);
      localStorage.setItem('role', this.usuarioLogueado.role);

      switch (this.usuarioLogueado.role) {
        case 'admin':
          this.router.navigate(['/principal-adm']);
          this.utilidadesService.RemoverLoading();
          break;
        case 'cliente':
          if(this.usuarioLogueado.verificadoPorAdm){
            this.router.navigate(['/principal']);
            this.utilidadesService.RemoverLoading();
          }else{
            this.router.navigate(['/verificacion-registro']);
            this.utilidadesService.RemoverLoading();
          }
          break;
        case 'empleado':
          if(this.usuarioLogueado.subTipo === 'bartender'){
            this.router.navigate(['/bartender-pedidos']);
            this.utilidadesService.RemoverLoading();
          }
          if(this.usuarioLogueado.subTipo === 'cocinero'){
            this.router.navigate(['/cocinero-pedidos']);
            this.utilidadesService.RemoverLoading();
          }
          if(this.usuarioLogueado.subTipo === 'mozo'){
            this.router.navigate(['/mozo-pedidos']);
            this.utilidadesService.RemoverLoading();
          }
          if(this.usuarioLogueado.subTipo === 'metre'){
          this.router.navigate(['/principal-empleado']);
          this.utilidadesService.RemoverLoading();
        }
          break;
        default:
          this.router.navigate(['/principal']);
          this.utilidadesService.RemoverLoading();
          break;
      }

      // this.iniciado=true;
    } else if (user) {
      this.utilidadesService.RemoverLoading();
      this.utilidadesService.PresentarToastAbajo('Credenciales Incorrectas', 'danger');
      // this.router.navigate(['/verificacion-email']);
      } else {
        this.utilidadesService.RemoverLoading();
        this.utilidadesService.PresentarToastAbajo("Credenciales Incorrectas", "danger");
        // this.router.navigate(['/registro']);
      }
  }

}
