import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
import { PushOneSignalService } from './services/push-one-signal.service';

const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pushId:String;

  constructor(private platform: Platform, public router: Router,private pushNotifService:PushOneSignalService) {
    this.initiallizeApp();
  }


  initiallizeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('splash');
      this.pushNotifService.OneSignalInit();
    })
  }

}