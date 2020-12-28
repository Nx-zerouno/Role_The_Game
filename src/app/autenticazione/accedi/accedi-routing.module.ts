import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccediPage } from './accedi.page';

const routes: Routes = [
  {
    path: '',
    component: AccediPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccediPageRoutingModule {}
