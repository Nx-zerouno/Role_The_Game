import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncantesimoConsultaPageRoutingModule } from './incantesimo-consulta-routing.module';

import { IncantesimoConsultaPage } from './incantesimo-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncantesimoConsultaPageRoutingModule
  ],
  declarations: [IncantesimoConsultaPage]
})
export class IncantesimoConsultaPageModule {}
