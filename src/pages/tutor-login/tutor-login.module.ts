import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorLoginPage } from './tutor-login';

@NgModule({
  declarations: [
    TutorLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorLoginPage),
  ],
  exports: [
    TutorLoginPage
  ]
})
export class TutorLoginPageModule {}
