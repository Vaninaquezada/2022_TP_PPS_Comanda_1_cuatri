import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { User,UsuarioBarcode} from 'src/app/clases/user';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {

  constructor() { }

  async scanDni() {
    const result = await BarcodeScanner.scan({ formats: 'PDF_417' });
    if (result.cancelled) {
      return null;
    }
    const arrayData = result.text.split('@');

    let cuil;
    if (arrayData.length === 9) {
      const first = arrayData[8].substring(0, 2);
      const last = arrayData[8].substr(arrayData[8].length - 1);
      cuil = first + arrayData[4] + last;
    } else {
      cuil = arrayData[4];
    }

    const user: UsuarioBarcode = {
      cuil: +cuil,
      dni: +arrayData[4],
      lastName: arrayData[1],
      name: arrayData[2],
    };
    return user;
  }
}
