import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistratiPageRoutingModule } from './registrati-routing.module';

import { RegistratiPage } from './registrati.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistratiPageRoutingModule
  ],
  declarations: [RegistratiPage]
})
export class RegistratiPageModule {}
