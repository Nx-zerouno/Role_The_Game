import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonaggioListaPageRoutingModule } from './personaggio-lista-routing.module';

import { PersonaggioListaPage } from './personaggio-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonaggioListaPageRoutingModule
  ],
  declarations: [PersonaggioListaPage]
})
export class PersonaggioListaPageModule {}
