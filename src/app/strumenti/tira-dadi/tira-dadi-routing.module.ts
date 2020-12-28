import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiraDadiPage } from './tira-dadi.page';

const routes: Routes = [
  {
    path: '',
    component: TiraDadiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiraDadiPageRoutingModule {}
