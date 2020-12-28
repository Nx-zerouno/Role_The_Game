import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncantesimoListaPageRoutingModule } from './incantesimo-lista-routing.module';

import { IncantesimoListaPage } from './incantesimo-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncantesimoListaPageRoutingModule
  ],
  declarations: [IncantesimoListaPage]
})
export class IncantesimoListaPageModule {}
