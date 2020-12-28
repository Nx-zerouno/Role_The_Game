import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncantesimoPreferitiPageRoutingModule } from './incantesimo-preferiti-routing.module';

import { IncantesimoPreferitiPage } from './incantesimo-preferiti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncantesimoPreferitiPageRoutingModule
  ],
  declarations: [IncantesimoPreferitiPage]
})
export class IncantesimoPreferitiPageModule {}
