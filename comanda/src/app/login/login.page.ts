/* eslint-disable max-len */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from '../services/utilidades.service';
import OneSignal from 'onesignal-cordova-plugin';


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
  pushId: string;

  constructor(public firebaseService: AuthService, private router: Router, private usuariosFire: UsuariosFirebaseService, private utilidadesService: UtilidadesService) { }

  ngOnInit() {
    // this.OneSignalInit();
  }

  async OnSignIn(email: string, password: string) {
    try {
      this.utilidadesService.PresentarLoading('Ingresando...');
      const user = await this.firebaseService.SignIn(email, password);
      console.log(user);
      this.checkUserIsVerified(user);
      // this.updatePushId(user);
      localStorage.setItem('usuario', email);

    } catch (error) {
      this.utilidadesService.RemoverLoading();
      //this.utilidadesService.PresentarToastAbajo('Credenciales Incorrectas', 'danger');
      this.utilidadesService.PresentarToastAbajo(error, 'danger');
      // this.router.navigate(['/registro']);
      console.log(error);
    }
  }

  async OnSignInWithGoogle() {
    try {
      this.utilidadesService.PresentarLoading('Ingresando...');
      const user = await this.firebaseService.SignInWithGoogle();
      this.checkUserIsVerified(user);
      // this.updatePushId(user);
      localStorage.setItem('usuario', user.email);

    } catch (error) {
      this.utilidadesService.RemoverLoading();
      this.utilidadesService.PresentarToastAbajo(error, 'danger');
      console.log(error);
    }
  }

  completaIngreso(ingreso: string) {
    switch (ingreso) {
      case 'usuario1':
        this.emailIngreso = 'admin@admin.com';
        this.contraIngreso = '111111';
        break;
      case 'usuario2':
        this.emailIngreso = 'tester@tester.com';
        this.contraIngreso = '555555';
        break;
      case 'usuario3':
        this.emailIngreso = 'metre@empleado.com';
        this.contraIngreso = '123456';
        break;
      case 'usuario4':
        this.emailIngreso = 'mozo@mozo.com';
        this.contraIngreso = '123456';
        break;
      case 'usuario5':
        this.emailIngreso = 'bartender@empleado.com';
        this.contraIngreso = '123456';
        break;
      case 'usuario6':
        this.emailIngreso = 'cocina@empleado.com';
        this.contraIngreso = '123456';
        break;
      case 'usuario7':
        this.emailIngreso = 'registrado@cliente.com';
        this.contraIngreso = '123456';
        break;
      case 'usuario8':
        this.emailIngreso = 'anonimo@anonimo.com';
        this.contraIngreso = '444444';
        break;
    }
  }
  

  Mostrar() {
    this.mostrar = !this.mostrar;
    console.log(this.mostrar);
  }

  private async checkUserIsVerified(user: User) {
    console.log('entra en chequeo de usuario');
    if (user) {
      await this.usuariosFire.obtenerUsuario(user.email);
      this.usuarioLogueado = this.usuariosFire.usuarioSeleccionado;
      // console.log('checkUserIsVerified!!! usuario logeado: ' + JSON.stringify(this.usuarioLogueado));
      if (typeof this.usuarioLogueado === 'undefined') {
        console.log('No existe un user con este email, no continuo con el checkUser.');
        this.utilidadesService.RemoverLoading();
        this.utilidadesService.PresentarToastAbajo("Credenciales Incorrectas", "danger");
      } else {
        if (this.usuarioLogueado.ingresos) {
          this.usuarioLogueado.ingresos.push(new Date());
        } else {
          this.usuarioLogueado.ingresos = new Array<Date>();
          this.usuarioLogueado.ingresos.push(new Date());
        }
        this.usuariosFire.update(this.usuariosFire.id, { ingresos: this.usuarioLogueado.ingresos });
        console.log(this.usuarioLogueado.role);
        localStorage.setItem('role', this.usuarioLogueado.role);
        localStorage.setItem('subtipo', this.usuarioLogueado.subTipo);

        switch (this.usuarioLogueado.role) {
          case 'admin':
            this.router.navigate(['/principal-adm']);
            this.utilidadesService.RemoverLoading();
            break;
          case 'cliente':
            if (this.usuarioLogueado.verificadoPorAdm) {
                this.router.navigate(['/principal']);
                this.utilidadesService.RemoverLoading();

            } else {
              this.router.navigate(['/verificacion-registro']);
              this.utilidadesService.RemoverLoading();
            }
            break;
          case 'empleado':
            this.router.navigate(['/encuesta-empleado']);
            this.utilidadesService.RemoverLoading();
            // if (this.usuarioLogueado.subTipo === 'bartender') {
            //   this.router.navigate(['/bartender-pedidos']);
            //   this.utilidadesService.RemoverLoading();
            // }
            // if (this.usuarioLogueado.subTipo === 'cocinero') {
            //   this.router.navigate(['/cocinero-pedidos']);
            //   this.utilidadesService.RemoverLoading();
            // }
            // if (this.usuarioLogueado.subTipo === 'mozo') {
            //   this.router.navigate(['/mozo-pedidos']);
            //   this.utilidadesService.RemoverLoading();
            // }
            // if (this.usuarioLogueado.subTipo === 'metre') {
            //   this.router.navigate(['/lista-de-espera']);
            //   this.utilidadesService.RemoverLoading();
            // }
            break;
          default:
            this.router.navigate(['/principal']);
            this.utilidadesService.RemoverLoading();
            break;
        }
      }
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

  OneSignalInit() {
    // Uncomment to set OneSignal device logging to VERBOSE  
    // OneSignal.setLogLevel(6, 0);

    // NOTE: Update the setAppId value below with your OneSignal AppId.
   OneSignal.setAppId("0a7bacb7-1822-4740-b3fe-31f0c4399931");

    //Se abre una notif
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("Notif recibida: " + JSON.stringify(notification));
    });

    OneSignal.getDeviceState((stateChanges) => {
      if (stateChanges && stateChanges.hasNotificationPermission) {
        this.pushId = stateChanges.userId;
      } else {
        console.log("Push notifications are disabled");
      }
    });

  }

  private async updatePushId(user: User) {
    console.log('Updateando el pushId');
    if (user) {
      await this.usuariosFire.obtenerUsuario(user.email).then(response => {
        this.usuarioLogueado = this.usuariosFire.usuarioSeleccionado;
        if (this.usuarioLogueado.pushId) {
          console.log('Entro al segundo if');
          if (this.usuarioLogueado.pushId === "0" || !(this.usuarioLogueado.pushId === this.pushId)) {
            console.log('Entro al tercer if');
            this.usuarioLogueado.pushId = this.pushId;
            this.usuariosFire.guardarCambios(this.usuarioLogueado);
          }
        } else {
          this.usuarioLogueado.pushId = this.pushId;
          this.usuariosFire.guardarCambios(this.usuarioLogueado);
        }
      });

    } else {
      console.log('No entra en el if del user');
    }
    console.log('Sale del updatePushId');
  }
}
