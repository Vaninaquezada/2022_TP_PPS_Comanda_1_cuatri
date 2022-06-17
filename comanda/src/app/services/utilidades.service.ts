import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(private toastController: ToastController, private loadingController: LoadingController) { }

  async PresentarToastAbajo(mensaje: string, colorIonic: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: colorIonic,
    });
    toast.present();
  }

  async PresentarLoading(mensaje: string){
    const loader = await this.loadingController.create({
      message:'<img src="../assets/spinner.svg" class="img-align"  />' + mensaje,
      translucent: true,
      spinner: null,
    });
    await loader.present();
  }

  async RemoverLoading(){
    await this.loadingController.dismiss();
  }

}
