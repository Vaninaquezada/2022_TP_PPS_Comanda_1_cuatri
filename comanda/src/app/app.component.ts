import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';

const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pushId:String;

  constructor(private platform: Platform, public router: Router) {
    this.initiallizeApp();
  }


  initiallizeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('splash');
      this.OneSignalInit();
    })
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

    //obtener id del dispositivo:
    OneSignal.getDeviceState((stateChanges) => {
      console.log(
        "OneSignal getDeviceState: " + JSON.stringify(stateChanges)
      );
      if (stateChanges && stateChanges.hasNotificationPermission) {
        this.pushId=stateChanges.userId;
        console.log("Player ID: " + stateChanges.userId);
        console.log("State changes: " + JSON.stringify(stateChanges));
      } else {
        console.log("Push notifications are disabled");
      }
    });
  }
}