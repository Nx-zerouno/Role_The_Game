import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissioneConsultaPage } from './missione-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: MissioneConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissioneConsultaPageRoutingModule {}
