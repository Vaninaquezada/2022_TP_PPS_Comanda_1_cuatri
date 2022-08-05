import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import OneSignal from 'onesignal-cordova-plugin';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class PushOneSignalService {

  constructor(private platform: Platform, private http: HttpClient) { }

  pushId: string;
  userId: string;
  url = "https://onesignal.com/api/v1/notifications";
  body: string;

  OneSignalInit() {
    this.platform.ready().then(() => {
      if (window.plugins.OneSignal) {
        console.log(window.plugins.OneSignal);
        // Uncomment to set OneSignal device logging to VERBOSE  
        // OneSignal.setLogLevel(6, 0);

        // NOTE: Update the setAppId value below with your OneSignal AppId.
        OneSignal.setAppId("0a7bacb7-1822-4740-b3fe-31f0c4399931");
        //Se abre una notif
        OneSignal.setNotificationOpenedHandler(notification => {
          console.log("Notif recibida: " + JSON.stringify(notification));
        });

        //obtener id del dispositivo:
        OneSignal.getDeviceState((stateChanges) => {
          console.log(
            "OneSignal getDeviceState: " + JSON.stringify(stateChanges)
          );
          if (stateChanges && stateChanges.hasNotificationPermission) {
            this.pushId = stateChanges.userId;
            console.log("Player ID: " + stateChanges.userId);
            console.log("State changes: " + JSON.stringify(stateChanges));
          } else {
            console.log("Push notifications are disabled");
          }
        });
      }
    });
  }


  enviarNotif(nombreNotif: string, mensajeNotif: string, idPush: string[], infoAdjunta?: string) {
    let idPushAux = new Array<string>();

    idPush.forEach(element => {
      console.log(element)
      if(element!="0"){
        idPushAux.push(element);
      }
    });
    console.log(idPushAux)
    
    this.body = JSON.stringify({
      app_id: "0a7bacb7-1822-4740-b3fe-31f0c4399931",//OneSignaAppId
      data: { infoAdjunta: infoAdjunta || "" },
      contents: { en: mensajeNotif, es: mensajeNotif },
      headings: { en: nombreNotif, es: nombreNotif },
      include_player_ids: idPushAux
    });

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Basic NDQ5OTgzNjYtY2IyZS00ZTlhLWIzOWItNTFlMzk1MmZkN2Iw"
      })
    };

    this.http.post(this.url, this.body, httpOptions).subscribe(response => {
      console.log("Notif enviada, response: ", response)
    })

  }

  enviarNotifClienteParaHabilitar(idPush: string[], infoAdjunta?: string) {
    let mensajeNotif = "Hay un nuevo cliente esperando ser habilitado!";
    let nombreNotif = "Habilitar cliente";
    this.enviarNotif(nombreNotif, mensajeNotif, idPush, infoAdjunta);
  }

  enviarNotifAnonimoPendienteDelMetre(idPush: string[], infoAdjunta?: string) {
    let mensajeNotif = "Hay un nuevo cliente en la lista de espera!";
    let nombreNotif = "Lista de espera";
    this.enviarNotif(nombreNotif, mensajeNotif, idPush, infoAdjunta);
  }

  enviarNotifConsultaParaMozos(idPush: string[], infoAdjunta?: string) {
    let mensajeNotif = "Hay una nueva consulta!";
    let nombreNotif = "Consulta de cliente recibida";
    this.enviarNotif(nombreNotif, mensajeNotif, idPush, infoAdjunta);
  }

  enviarNotifPedidoParaCocineros(idPush: string[], infoAdjunta?: string) {
    let mensajeNotif = "Tenes un nuevo pedido aprobado!";
    let nombreNotif = "Pedido para cocina";
    this.enviarNotif(nombreNotif, mensajeNotif, idPush, infoAdjunta);
  }

  enviarNotifPedidoParaBArtenders(idPush: string[], infoAdjunta?: string) {
    let mensajeNotif = "Tenes un nuevo pedido aprobado!";
    let nombreNotif = "Pedido para bartender";
    this.enviarNotif(nombreNotif, mensajeNotif, idPush, infoAdjunta);
  }

  enviarNotifBebidaLista(idPush: string[], infoAdjunta?: string) {
    let mensajeNotif = "Tenes una bebida para llevar al cliente!";
    let nombreNotif = "Pedido del bartender listo";
    this.enviarNotif(nombreNotif, mensajeNotif, idPush, infoAdjunta);
  }

  enviarNotifComidaLista(idPush: string[], infoAdjunta?: string) {
    let mensajeNotif = "Tenes un plato para llevar al cliente!";
    let nombreNotif = "Plato de la cocina listo";
    this.enviarNotif(nombreNotif, mensajeNotif, idPush, infoAdjunta);
  }

  enviarNotifReservaConfirmada(idPush: string[], infoAdjunta?: string) {
    let mensajeNotif = "Tu reserva fue confirmada!";
    let nombreNotif = "Reserva confirmada";
    this.enviarNotif(nombreNotif, mensajeNotif, idPush, infoAdjunta);
  }

}
