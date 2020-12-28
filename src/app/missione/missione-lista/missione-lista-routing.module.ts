import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissioneListaPage } from './missione-lista.page';

const routes: Routes = [
  {
    path: '',
    component: MissioneListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissioneListaPageRoutingModule {}
