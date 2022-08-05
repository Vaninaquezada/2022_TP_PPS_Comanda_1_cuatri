import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { PushOneSignalService } from 'src/app/services/push-one-signal.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  state: boolean;
  icons;
  args;
  chatBoxContent;
  chatboxStatus;
  messages: Observable<any[]>;
  newMsg = '';
  constructor(private chatSer: ChatService, private router: Router, private authSvc: AuthService, private pushOneSignal:PushOneSignalService,private usuarioService: UsuariosFirebaseService) {
     this.state = false;
  }

  ngOnInit() {
    this.messages = this.chatSer.getChatMessages();
    console.log(this.messages);
  }



  async signOut() {
    await this.authSvc.LogOut();
    this.router.navigate(['login']);
  }

  sendMessage() {
    this.chatSer.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom(500);
    });
    this.usuarioService.obtenerPushIdMozos().then(response => {
      console.log("this.mozosPushIds" + JSON.stringify(this.usuarioService.mozosPushIds));
      this.pushOneSignal.enviarNotifConsultaParaMozos(this.usuarioService.mozosPushIds, "Info adicional bla");
    });
  }


}
