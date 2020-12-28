import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncantesimoListaPage } from './incantesimo-lista.page';

const routes: Routes = [
  {
    path: '',
    component: IncantesimoListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncantesimoListaPageRoutingModule {}
