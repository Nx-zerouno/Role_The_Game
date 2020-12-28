import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncantesimoPreferitiPage } from './incantesimo-preferiti.page';

const routes: Routes = [
  {
    path: '',
    component: IncantesimoPreferitiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncantesimoPreferitiPageRoutingModule {}
