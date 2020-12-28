import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccediPageRoutingModule } from './accedi-routing.module';

import { AccediPage } from './accedi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccediPageRoutingModule
  ],
  declarations: [AccediPage]
})
export class AccediPageModule {}
