import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { HttpClientModule } from '@angular/common/http';

import emailjs from '@emailjs/browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AwesomeCordovaNativePlugin} from '@awesome-cordova-plugins/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { NgCalendarModule } from 'ionic2-calendar';
import {SwiperModule} from 'swiper/angular';
import { CommonModule } from '@angular/common';
// import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';

@NgModule({
  declarations: [AppComponent,SideMenuComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    SwiperModule,
    NgCalendarModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
     provideAuth(() => getAuth()), provideDatabase(() => getDatabase()),
      provideFirestore(() => getFirestore()),
      provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging()),
      provideStorage(() => getStorage())

  ],
  exports: [
    SideMenuComponent,
  ],

  providers: [Storage,BarcodeScanner, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
