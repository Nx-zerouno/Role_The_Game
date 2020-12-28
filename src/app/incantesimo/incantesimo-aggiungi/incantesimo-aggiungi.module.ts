import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncantesimoAggiungiPageRoutingModule } from './incantesimo-aggiungi-routing.module';

import { IncantesimoAggiungiPage } from './incantesimo-aggiungi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncantesimoAggiungiPageRoutingModule
  ],
  declarations: [IncantesimoAggiungiPage]
})
export class IncantesimoAggiungiPageModule {}
