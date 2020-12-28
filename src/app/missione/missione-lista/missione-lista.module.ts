import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissioneListaPageRoutingModule } from './missione-lista-routing.module';

import { MissioneListaPage } from './missione-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MissioneListaPageRoutingModule
  ],
  declarations: [MissioneListaPage]
})
export class MissioneListaPageModule {}
