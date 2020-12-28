import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissioneAggiungiPageRoutingModule } from './missione-aggiungi-routing.module';

import { MissioneAggiungiPage } from './missione-aggiungi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MissioneAggiungiPageRoutingModule
  ],
  declarations: [MissioneAggiungiPage]
})
export class MissioneAggiungiPageModule {}
