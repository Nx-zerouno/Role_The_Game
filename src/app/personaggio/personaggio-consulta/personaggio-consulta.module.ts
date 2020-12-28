import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonaggioConsultaPageRoutingModule } from './personaggio-consulta-routing.module';

import { PersonaggioConsultaPage } from './personaggio-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonaggioConsultaPageRoutingModule
  ],
  declarations: [PersonaggioConsultaPage]
})
export class PersonaggioConsultaPageModule {}
