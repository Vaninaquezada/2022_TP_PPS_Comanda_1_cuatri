import { Component, Input, OnInit ,ViewChild} from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import SwiperCore, { Pagination } from 'swiper';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-fotos-producto',
  templateUrl: './fotos-producto.component.html',
  styleUrls: ['./fotos-producto.component.scss'],
})
export class FotosProductoComponent implements OnInit {

  @ViewChild('swiper') swiper: SwiperComponent;

  fotos: string[] = [];
  titulo: string;
  config: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 1,
    pagination: true,
    scrollbar: { draggable: true },
  };

  constructor(private modalController: ModalController, private navParams: NavParams) {

  }

  ngOnInit() {
    this.titulo = this.navParams.data.titulo;
    this.fotos = this.navParams.data.fotos;
    console.log(this.fotos );

  }

  cancelar() {
    this.modalController.dismiss();
  }
}
