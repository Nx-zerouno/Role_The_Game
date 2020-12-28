import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonaggioListaPage } from './personaggio-lista.page';

const routes: Routes = [
  {
    path: '',
    component: PersonaggioListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaggioListaPageRoutingModule {}
