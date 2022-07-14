import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { UsuarioBarcode } from 'src/app/clases/user';
import { BarcodeScannerService } from 'src/app/services/barcode-scanner.service';
@Component({
  selector: 'app-qrpropina',
  templateUrl: './qrpropina.component.html',
  styleUrls: ['./qrpropina.component.scss'],
})
export class QrpropinaComponent implements OnInit {

  @Output() propina = new EventEmitter<string>();
  constructor(private barcodeSanner: BarcodeScannerService) { }


  ngOnInit() {}
  async scan() {
    console.log("sacn");
    //this.propina.emit(await this.barcodeSanner.scanPropina());
    this.propina.emit('propina');
  }
}
