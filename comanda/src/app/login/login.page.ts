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

  emailIngreso: string = "";
  contraIngreso: string = "";
  mostrar = false;
  usuarioLogueado = new User();

  constructor(public firebaseService: AuthService, private router: Router, private usuariosFire: UsuariosFirebaseService, private utilidadesService: UtilidadesService) {}

  
  async OnSignIn(email:string, password: string){
    try {
      this.utilidadesService.PresentarLoading("Iniciando Sesión...")
      const user = await this.firebaseService.SignIn(email,password);
      this.checkUserIsVerified(user);
      localStorage.setItem('usuario', email);
    } catch (error) {
      this.utilidadesService.RemoverLoading();
      this.utilidadesService.PresentarToastAbajo("Credenciales Incorrectas", "danger");
      // this.router.navigate(['/registro']);
      console.log(error);
    }
  }

  private async checkUserIsVerified(user: User) {
    console.log("entra en chequeo de usuario")
    if (user) {
      await this.usuariosFire.obtenerUsuario(user.email);
      this.usuarioLogueado = this.usuariosFire.usuarioSeleccionado;
      if(this.usuarioLogueado.ingresos){
        this.usuarioLogueado.ingresos.push(new Date())
      }else{
        this.usuarioLogueado.ingresos = new Array<Date>();
        this.usuarioLogueado.ingresos.push(new Date())
      }      
      this.usuariosFire.update(this.usuariosFire.id, {ingresos: this.usuarioLogueado.ingresos});
      console.log(this.usuarioLogueado.role);
      if(this.usuarioLogueado.role == 'especialista'){
        console.log("entra en login para especialista");
        if(!this.usuarioLogueado.verificacionEspec){
          console.log("entra en login para especialista sin verificacion por Admin");
          this.router.navigate(['/verificacion-especialista']);
        }else{
          localStorage.setItem('role', this.usuarioLogueado.role);
          console.log("LOGIN: el Role que loguea es: "+this.usuarioLogueado.role);
          this.router.navigate(['/']);
        }
      }else{
        localStorage.setItem('role', this.usuarioLogueado.role);
        console.log("LOGIN: el Role que loguea es: "+this.usuarioLogueado.role);
        this.router.navigate(['/principal']);
        this.utilidadesService.RemoverLoading();


        // this.iniciado=true;

        
      }      
    } else if (user) {
      this.utilidadesService.RemoverLoading();
      this.utilidadesService.PresentarToastAbajo("Credenciales Incorrectas", "danger");
      // this.router.navigate(['/verificacion-email']);
    } else {
      this.utilidadesService.RemoverLoading();
      this.utilidadesService.PresentarToastAbajo("Credenciales Incorrectas", "danger");
      // this.router.navigate(['/registro']);
    }
  }


  CompletaIngreso(ingreso: string){
    switch(ingreso){
      case "usuario1":
        this.emailIngreso= "admin@admin.com";
        this.contraIngreso = "111111";
        break;
      case "usuario2":
        this.emailIngreso= "invitado@invitado.com";
        this.contraIngreso = "222222";
        break;
      case "usuario3":
        this.emailIngreso= "usuario@usuario.com";
        this.contraIngreso = "333333";
        break;
      case "usuario4":
        this.emailIngreso= "anonimo@anonimo.com";
        this.contraIngreso = "444444";
        break;
      case "usuario5":
        this.emailIngreso= "tester@tester.com";
        this.contraIngreso = "555555";
        break;
      
    }
    
  }

  Mostrar(){
    this.mostrar = !this.mostrar;
    console.log(this.mostrar);
  }
}
