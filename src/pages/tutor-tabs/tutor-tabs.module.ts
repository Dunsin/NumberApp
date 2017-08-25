import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorTabsPage } from './tutor-tabs';

@NgModule({
  declarations: [
    TutorTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorTabsPage),
  ],
  exports: [
    TutorTabsPage
  ]
})
export class TutorTabsPageModule {}
