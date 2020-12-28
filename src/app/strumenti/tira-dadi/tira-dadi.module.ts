import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiraDadiPageRoutingModule } from './tira-dadi-routing.module';

import { TiraDadiPage } from './tira-dadi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiraDadiPageRoutingModule
  ],
  declarations: [TiraDadiPage]
})
export class TiraDadiPageModule {}
