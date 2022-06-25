import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Productos } from 'src/app/clases/productos';
import { User} from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { Photo } from '@capacitor/camera';
import { FotoService } from 'src/app/services/foto.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.page.html',
  styleUrls: ['./alta-producto.page.scss'],
})
export class AltaProductoPage implements OnInit {

  public forma: FormGroup;
  photo1: Photo = null;
  photo2: Photo = null;
  photo3: Photo = null;
  tomada1: boolean;
  tomada2: boolean;
  tomada3: boolean;
  
  constructor(
    private navegador: Router,
    private fb: FormBuilder,
    private usuarioService: UsuariosFirebaseService,
    private authSvc: AuthService,
    private utilidadesService: UtilidadesService,
    private productoService: ProductosService,
    private uploadPhoto: FotoService,
    private menuController: MenuController
    
    ) {
      this.MenuView();
    

  }

  ngOnInit() {
    this.forma = this.fb.group({
      'nombre': ['', Validators.required],
      'descripcion': ['', Validators.required],
      'tiempoPromedioMinutos': ['', Validators.required],
      'precio': ['', Validators.required],
      'tipoProducto': ['', Validators.required],
    });
  }

  MenuView(){
    this.menuController.enable(false, 'clientesMenu');
    this.menuController.enable(false, 'empleadosMenu');
    this.menuController.enable(true, 'adminMenu');
  }

  async AltaProducto(){
    // console.log(Number(this.forma.get('notaEmpleados').value));
    this.utilidadesService.PresentarLoading("Creando producto");
    
    let producto: Productos = {
      
      nombre: this.forma.get('nombre').value,
      descripcion: this.forma.get('descripcion').value,
      tiempoPromedioMinutos: this.forma.get('tiempoPromedioMinutos').value,
      precio: Number(this.forma.get('precio').value),
      tipoProducto: this.forma.get('tipoProducto').value,      
  
    };

    if(this.tomada3){
      await this.productoService.nuevoProducto(producto, this.photo1, this.photo2, this.photo3);
    }else if(this.tomada2){
        await this.productoService.nuevoProducto(producto, this.photo1, this.photo2);
    }else if(this.tomada1){
          await this.productoService.nuevoProducto(producto, this.photo1);
    }

    this.navegador.navigate(['/principal']);
  }




  async getPhoto1() {
    this.photo1 = await this.uploadPhoto.takePhoto();
    
    this.tomada1 = true;
  }

  async getPhoto2() {
    this.photo2 = await this.uploadPhoto.takePhoto();
    
    this.tomada2 = true;
  }

  async getPhoto3() {
    this.photo3 = await this.uploadPhoto.takePhoto();
    
    this.tomada3 = true;
  }

}
