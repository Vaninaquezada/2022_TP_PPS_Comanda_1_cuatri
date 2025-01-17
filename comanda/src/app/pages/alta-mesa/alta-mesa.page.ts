import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Mesa } from 'src/app/clases/mesa';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { MesaService } from '../../services/mesa.service';

@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
})
export class AltaMesaPage implements OnInit {

  public forma: FormGroup;
  imagen: any;

  constructor(
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService,
    private MesaService:MesaService,
    private menuController: MenuController
    
    ) {
      this.MenuView();
    

  }

  ngOnInit() {
    this.forma = this.fb.group({
      'tipo': ['', Validators.required],
      'numero': ['', [Validators.required, Validators.max(20)]],
      'cantidadComensales': ['', [Validators.required, Validators.max(10)]],
      'foto': ['', Validators.required]
    });
  }

  MenuView(){
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(false, 'empleadosMenu');
    this.menuController.enable(true, 'adminMenu');
  }

  changeImg(event) {
    if (event.target.files && event.target.files[0]) {
      this.imagen = event.target.files[0];
    }
  }

  crearMesa() {
    this.utilidadesService.PresentarLoading("Creando mesa");
    let mesa: Mesa = {
      estado: "libre",
      tipo: this.forma.get('tipo').value,
      numero: this.forma.get('numero').value,
      cantidadComensales: Number(this.forma.get('cantidadComensales').value)
    };
    const foto = this.imagen;
    this.MesaService.altaMesa(mesa, foto);
  }

}
