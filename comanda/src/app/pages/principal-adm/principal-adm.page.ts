import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';
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
    private utilidadesService: UtilidadesService,
    private notificacionService: PushNotificationService
  ) { }

  ngOnInit() {
  }

  EnviarNotificacion(){
    this.utilidadesService.PresentarToastAbajo("manda notificacion", "danger")
    this.notificacionService.sendPushNotification({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      registration_ids: [
        // eslint-disable-next-line max-len
        'd3mSe5u8SUKl73uh2twT4u:APA91bGM-9U5gGQwTm6qV1zZ8ZKEz72yLH4mSDD9Ru-pKIkVeMrcdsGUkNzBmCY_6BWRBSupH7zB9GoFAhy6RfpjY72OYUZmf2YYAx9fqrp2wsi9Ycx7C4Yc0JmXF7-ejpFGd8HZM9JR',
      ],
      notification: {
        title: 'Mi titulo',
        body: 'Mi body',
      },
      data: {
        id: 1,
        nombre: 'nicolas',
      },
    })
    .subscribe((data) => {
      console.log(data);
    });
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
