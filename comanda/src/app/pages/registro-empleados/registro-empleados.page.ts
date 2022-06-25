import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User} from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-registro-empleados',
  templateUrl: './registro-empleados.page.html',
  styleUrls: ['./registro-empleados.page.scss'],
})
export class RegistroEmpleadosPage implements OnInit {

  // usuario: Usuario = new Usuario();
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
      'subtipo': ['', Validators.required],
      'email': ['', [Validators.email, Validators.required]],
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],      
      'DNI': ['', [Validators.required, Validators.max(99999999)]],
      'CUIL': ['', [Validators.required, Validators.max(99999999999)]],
      'foto': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'password2': ['', [Validators.required, Validators.minLength(6)]],
      
    });
  }
  MenuView(){
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(false, 'empleadosMenu');
    this.menuController.enable(true, 'adminMenu');
  }


  changeImg(event){
    if(event.target.files && event.target.files[0]){
      this.imagen = event.target.files[0];
    }
  }

  async NuevoRegistro(){
    
    if(this.forma.get('password').value == this.forma.get('password2').value){
      this.utilidadesService.PresentarLoading("Creando usuario");
      console.log("bien contraseñas");
            
      try {
        const user = await this.authSvc.SignUp(this.forma.get('email').value.toLowerCase(), this.forma.get('password').value);
        if (user) {
          console.log("creado auth");
          this.CrearUsuario();
          this.checkUserIsVerified(user);
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      this.utilidadesService.PresentarToastAbajo("Las contraseñas no coinciden", "danger");
      this.utilidadesService.RemoverLoading();
    }
  }

  CrearUsuario(){
    
    let usuario: User = {
      email: this.forma.get('email').value,
      subTipo: this.forma.get('subtipo').value,
      role: 'empleado',
      nombre: this.forma.get('nombre').value,
      apellido: this.forma.get('apellido').value,
      dni: this.forma.get('DNI').value,
      cuil: this.forma.get('CUIL').value, 
      pushId: "0"
    };
    const foto = this.imagen;
    this.usuarioService.nuevoUsuario(usuario, foto);
    
  }

  private checkUserIsVerified(user: User) {
    if (user && user.verificadoPorAdm) {
      this.navegador.navigate(['/']);
      localStorage.setItem('usuario',this.forma.get('email').value.toLowerCase());
    } else if (user) {
      this.navegador.navigate(['/verificacion-registro']);
    } else {
      this.navegador.navigate(['/registro']);
    }
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
