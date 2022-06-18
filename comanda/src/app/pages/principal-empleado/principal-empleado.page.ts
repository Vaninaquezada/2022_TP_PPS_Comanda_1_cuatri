import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-empleado',
  templateUrl: './principal-empleado.page.html',
  styleUrls: ['./principal-empleado.page.scss'],
})
export class PrincipalEmpleadoPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navegar(ruta: string){
    this.router.navigate([ruta]);
  }

}
