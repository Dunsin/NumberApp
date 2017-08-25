import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

//import {ChatViewPage} from '../../pages/chat-view/chat-view';
import {ChatsPage} from '../../pages/chats/chats';
import {LogOutPage} from '../../pages/log-out/log-out';

@IonicPage()
@Component({
  selector: 'page-tutor-tabs',
  templateUrl: 'tutor-tabs.html',
})
export class TutorTabsPage {
	myTutor:any;
	//tab1Root:any = ChatViewPage;
	tab1Root:any = ChatsPage;
	tab2Root:any = LogOutPage;
	tab2Params:any;
	

  constructor(public navParams:NavParams) {
	  
	  this.myTutor=navParams.get('tutormail')
	  this.tab2Params={id:this.myTutor};
  }

 
}
