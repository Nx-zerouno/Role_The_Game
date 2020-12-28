import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'accedi',
    pathMatch: 'full'
  },
  {
    path: 'incantesimo-lista',
    loadChildren: () => import('./incantesimo/incantesimo-lista/incantesimo-lista.module').then( m => m.IncantesimoListaPageModule)
  },
  {
    path: 'incantesimo-aggiungi',
    loadChildren: () => import('./incantesimo/incantesimo-aggiungi/incantesimo-aggiungi.module').then( m => m.IncantesimoAggiungiPageModule)
  },
  {
    path: 'incantesimo-consulta/:id',
    loadChildren: () => import('./incantesimo/incantesimo-consulta/incantesimo-consulta.module').then( m => m.IncantesimoConsultaPageModule)
  },
  {
    path: 'incantesimo-preferiti',
    loadChildren: () => import('./incantesimo/incantesimo-preferiti/incantesimo-preferiti.module').then( m => m.IncantesimoPreferitiPageModule)
  },
  {
    path: 'accedi',
    loadChildren: () => import('./autenticazione/accedi/accedi.module').then( m => m.AccediPageModule)
  },
  {
    path: 'registrati',
    loadChildren: () => import('./autenticazione/registrati/registrati.module').then( m => m.RegistratiPageModule)
  },
  {
    path: 'personaggio-aggiungi',
    loadChildren: () => import('./personaggio/personaggio-aggiungi/personaggio-aggiungi.module').then( m => m.PersonaggioAggiungiPageModule)
  },
  {
    path: 'personaggio-consulta/:id',
    loadChildren: () => import('./personaggio/personaggio-consulta/personaggio-consulta.module').then( m => m.PersonaggioConsultaPageModule)
  },
  {
    path: 'personaggio-lista',
    loadChildren: () => import('./personaggio/personaggio-lista/personaggio-lista.module').then( m => m.PersonaggioListaPageModule)
  },
  {
    path: 'missione-aggiungi',
    loadChildren: () => import('./missione/missione-aggiungi/missione-aggiungi.module').then( m => m.MissioneAggiungiPageModule)
  },
  {
    path: 'missione-consulta/:id',
    loadChildren: () => import('./missione/missione-consulta/missione-consulta.module').then( m => m.MissioneConsultaPageModule)
  },
  {
    path: 'missione-lista',
    loadChildren: () => import('./missione/missione-lista/missione-lista.module').then( m => m.MissioneListaPageModule)
  },
  {
    path: 'tira-dadi',
    loadChildren: () => import('./strumenti/tira-dadi/tira-dadi.module').then( m => m.TiraDadiPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
