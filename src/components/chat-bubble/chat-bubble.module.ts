import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChatBubbleComponent } from './chat-bubble';

@NgModule({
  declarations: [
    ChatBubbleComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ChatBubbleComponent
  ]
})
export class ChatBubbleComponentModule {}
