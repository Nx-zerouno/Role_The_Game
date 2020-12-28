import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonaggioAggiungiPageRoutingModule } from './personaggio-aggiungi-routing.module';

import { PersonaggioAggiungiPage } from './personaggio-aggiungi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonaggioAggiungiPageRoutingModule
  ],
  declarations: [PersonaggioAggiungiPage]
})
export class PersonaggioAggiungiPageModule {}
