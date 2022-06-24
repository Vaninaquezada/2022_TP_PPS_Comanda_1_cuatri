import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verificacion-registro',
  templateUrl: './verificacion-registro.page.html',
  styleUrls: ['./verificacion-registro.page.scss'],
})
export class VerificacionRegistroPage implements OnInit {

  constructor(private authSvc: AuthService,private navegador: Router) { }

  ngOnInit() {
  }
  
  singOut(){
    this.authSvc.LogOut();
    this.navegador.navigate(['login']);
  }

}
