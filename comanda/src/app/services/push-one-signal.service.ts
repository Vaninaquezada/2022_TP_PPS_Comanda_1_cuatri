import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PushOneSignalService {

  constructor(private http: HttpClient) { }

  pushId: string;
  userId: string;
  url = "https://onesignal.com/api/v1/notifications";
  body: string;
  
  enviarNotif(nombreNotif: string, mensajeNotif: string, idPush: string[], infoAdjunta?: string) {
    this.body = JSON.stringify({
      app_id: "0a7bacb7-1822-4740-b3fe-31f0c4399931",//OneSignaAppId
      data: { infoAdjunta: infoAdjunta || "" },
      contents: { en: mensajeNotif, es: mensajeNotif },
      headings: { en: nombreNotif, es: nombreNotif },
      include_player_ids: idPush
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


}
