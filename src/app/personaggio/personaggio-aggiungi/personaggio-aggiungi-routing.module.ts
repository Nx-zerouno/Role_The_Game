import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonaggioAggiungiPage } from './personaggio-aggiungi.page';

const routes: Routes = [
  {
    path: '',
    component: PersonaggioAggiungiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaggioAggiungiPageRoutingModule {}
