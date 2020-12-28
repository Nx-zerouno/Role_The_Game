import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissioneConsultaPageRoutingModule } from './missione-consulta-routing.module';

import { MissioneConsultaPage } from './missione-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MissioneConsultaPageRoutingModule
  ],
  declarations: [MissioneConsultaPage]
})
export class MissioneConsultaPageModule {}
