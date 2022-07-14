import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { User,UsuarioBarcode} from 'src/app/clases/user';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {

  constructor(private barcodeScanner: BarcodeScanner) { }

  async scanDni() {

    const result = await this.barcodeScanner.scan({ formats: 'PDF_417' });
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
      apellido: arrayData[1],
      nombre: arrayData[2],
    };
    return user;
  }
  async scanMesa() {
    const result = await this.barcodeScanner.scan({ formats: 'EAN_13,EAN_8,QR_CODE,PDF_417' });
    if (result.cancelled) {
      return null;
    }
    const arrayData = result.text.split('@');

    const mesa = {
      numero: arrayData[0],
      tipo: arrayData[1],
      cantidadComensales: arrayData[2]

    };
    return mesa;
  }

  async scanPropina() {
    const result = await this.barcodeScanner.scan({ formats: 'EAN_13,EAN_8,QR_CODE,PDF_417' });
    if (result.cancelled) {
      return null;
    }

    if(result.text ==='propina')
    {
      return 'propina';
    };
    return 'nopropina';
  }

}
