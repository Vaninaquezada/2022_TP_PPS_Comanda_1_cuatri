import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'registro-empleados',
    loadChildren: () => import('./pages/registro-empleados/registro-empleados.module').then( m => m.RegistroEmpleadosPageModule)
  },
  {
    path: 'verificacion-registro',
    loadChildren: () => import('./pages/verificacion-registro/verificacion-registro.module').then( m => m.VerificacionRegistroPageModule)
  },
  {
    path: 'principal-adm',
    loadChildren: () => import('./pages/principal-adm/principal-adm.module').then( m => m.PrincipalAdmPageModule)
  },
  {
    path: 'principal-empleado',
    loadChildren: () => import('./pages/principal-empleado/principal-empleado.module').then( m => m.PrincipalEmpleadoPageModule)
  },
  {
    path: 'adm-autorizacion-registros',
    loadChildren: () => import('./pages/adm-autorizacion-registros/adm-autorizacion-registros.module').then( m => m.AdmAutorizacionRegistrosPageModule)
  },
  {
    path: 'registro-duenios-supervisores',
    loadChildren: () => import('./pages/registro-duenios-supervisores/registro-duenios-supervisores.module').then( m => m.RegistroDueniosSupervisoresPageModule)
  },
  {
    path: 'alta-mesa',
    loadChildren: () => import('./pages/alta-mesa/alta-mesa.module').then( m => m.AltaMesaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
