import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuycreditPage } from './buycredit';

@NgModule({
  declarations: [
    BuycreditPage,
  ],
  imports: [
    IonicPageModule.forChild(BuycreditPage),
  ],
  exports: [
    BuycreditPage
  ]
})
export class BuycreditPageModule {}
