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
    path: 'registro-anonimo',
    loadChildren: () => import('./pages/registro-anonimo/registro-anonimo.module').then( m => m.RegistroAnonimoPageModule)
  },
  {
    path: 'adm-autorizacion-registros',
    loadChildren: () => import('./pages/adm-autorizacion-registros/adm-autorizacion-registros.module')
    .then( m => m.AdmAutorizacionRegistrosPageModule)
  },
  {
    path: 'registro-duenios-supervisores',
    loadChildren: () => import('./pages/registro-duenios-supervisores/registro-duenios-supervisores.module')
    .then( m => m.RegistroDueniosSupervisoresPageModule)
  },
  {
    path: 'alta-mesa',
    loadChildren: () => import('./pages/alta-mesa/alta-mesa.module').then( m => m.AltaMesaPageModule)
  },
  {
    path: 'reserva-mesas',
    loadChildren: () => import('./pages/reserva-mesas/reserva-mesas.module').then( m => m.ReservaMesasPageModule)
  },
  {
    path: 'mesa',
    loadChildren: () => import('./pages/mesa/mesa.module').then( m => m.MesaPageModule)
  },
  { path: 'alta-mesa',
    loadChildren: () => import('./pages/alta-mesa/alta-mesa.module').then( m => m.AltaMesaPageModule)
  },
  {
    path: 'encuesta-clientes',
    loadChildren: () => import('./pages/encuesta-clientes/encuesta-clientes.module').then( m => m.EncuestaClientesPageModule)
  },
  {
    path: 'bartender-pedidos',
    loadChildren: () => import('./pages/bartender-pedidos/bartender-pedidos.module').then( m => m.BartenderPedidosPageModule)
  },
  {
    path: 'cocinero-pedidos',
    loadChildren: () => import('./pages/cocinero-pedidos/cocinero-pedidos.module').then( m => m.CocineroPedidosPageModule)
  },
  {
    path: 'mozo-pedidos',
    loadChildren: () => import('./pages/mozo-pedidos/mozo-pedidos.module').then( m => m.MozoPedidosPageModule)
  },
  {
    path: 'encuesta-clientes',
    loadChildren: () => import('./pages/encuesta-clientes/encuesta-clientes.module').then( m => m.EncuestaClientesPageModule)
  },
  {
    path: 'alta-producto',
    loadChildren: () => import('./pages/alta-producto/alta-producto.module').then( m => m.AltaProductoPageModule)
  },
  {
    path: 'listado-productos',
    loadChildren: () => import('./pages/listado-productos/listado-productos.module').then( m => m.ListadoProductosPageModule)
  },
  {
    path: 'cliente-pedido',
    loadChildren: () => import('./pages/cliente-pedido/cliente-pedido.module').then( m => m.ClientePedidoPageModule)
  },
  {
    path: 'lista-de-espera',
    loadChildren: () => import('./pages/listada-de-espera/listada-de-espera.module').then( m => m.ListadaDeEsperaPageModule)
  }



];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
