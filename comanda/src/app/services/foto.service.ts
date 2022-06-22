import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor(private fbStorage: AngularFireStorage) { }

  async takePhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 60,
      webUseInput: true,
    });

    return capturedPhoto;
  }
  async uploadPhoto(photo: Photo,id) {
    const dataUrl = photo.dataUrl;
    const fileName = id;
    const ref = this.fbStorage.ref(`fotos/${fileName}`);
    const result = await ref.putString(dataUrl, 'data_url', {
      contentEncoding: 'image/jpeg',
    });

    return result;
  }

  async uploadPhotoProducto(photo: Photo,id) {
    const dataUrl = photo.dataUrl;
    const fileName = id;
    const ref = this.fbStorage.ref(`fotos/Productos/${fileName}`);
    const result = await ref.putString(dataUrl, 'data_url', {
      contentEncoding: 'image/jpeg',
    });

    return result.ref.getDownloadURL();
  }

  async uploadPhotoEncuesta(photo: Photo,id) {
    const dataUrl = photo.dataUrl;
    const fileName = id;
    const ref = this.fbStorage.ref(`fotos/Encuestas/${fileName}`);
    const result = await ref.putString(dataUrl, 'data_url', {
      contentEncoding: 'image/jpeg',
    });

    return result.ref.getDownloadURL();
  }


}
