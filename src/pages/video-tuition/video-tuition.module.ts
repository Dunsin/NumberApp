import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoTuitionPage } from './video-tuition';

@NgModule({
  declarations: [
    VideoTuitionPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoTuitionPage),
  ],
  exports: [
    VideoTuitionPage
  ]
})
export class VideoTuitionPageModule {}
