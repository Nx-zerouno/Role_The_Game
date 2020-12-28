import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissioneAggiungiPage } from './missione-aggiungi.page';

const routes: Routes = [
  {
    path: '',
    component: MissioneAggiungiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissioneAggiungiPageRoutingModule {}
