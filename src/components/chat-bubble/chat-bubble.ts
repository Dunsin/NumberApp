import { Component } from '@angular/core';

/**
 * Generated class for the ChatBubbleComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'chat-bubble',
  inputs: ['msg: message'],
  templateUrl: 'chat-bubble.html'
})
export class ChatBubbleComponent {

 /** text: string;

  constructor() {
    console.log('Hello ChatBubbleComponent Component');
    this.text = 'Hello World';
  }
*/
 public msg: any;
    constructor() {
        this.msg = {
            content: 'Welcome, How may i help you?',
            isMe: true,
            time: '14/07/2017',
			type:'text',
            senderName: 'NumberPrep'
        }
    }

}
