import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncantesimoConsultaPage } from './incantesimo-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: IncantesimoConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncantesimoConsultaPageRoutingModule {}
