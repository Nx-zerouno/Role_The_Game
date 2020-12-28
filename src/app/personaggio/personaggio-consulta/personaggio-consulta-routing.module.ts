import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonaggioConsultaPage } from './personaggio-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: PersonaggioConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaggioConsultaPageRoutingModule {}
