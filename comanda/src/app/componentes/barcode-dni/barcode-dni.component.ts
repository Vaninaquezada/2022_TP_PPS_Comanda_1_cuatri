import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { UsuarioBarcode } from 'src/app/clases/user';
import { BarcodeScannerService } from 'src/app/services/barcode-scanner.service';

@Component({
  selector: 'app-barcode-dni',
  templateUrl: './barcode-dni.component.html',
  styleUrls: ['./barcode-dni.component.scss'],
})
export class BarcodeDniComponent implements OnInit {


  @Output() userBarcode = new EventEmitter<UsuarioBarcode>();
  constructor(private barcodeSanner: BarcodeScannerService) { }

  ngOnInit() {}

  async scan() {
  this.userBarcode.emit(await this.barcodeSanner.scanDni());

  }
}
