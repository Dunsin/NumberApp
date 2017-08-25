import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user-provider';
import {ChatViewPage} from '../../pages/chat-view/chat-view';


@IonicPage()
@Component({
  selector: 'page-tutors',
  templateUrl: 'tutors.html',
})
export class TutorsPage {
	
	//public topics      : FirebaseListObservable<any[]>;
	public topictitle  : any = '';
	public topictutors : any = [];
	uid:string;
	public tutorID: any;
	
		
  constructor(public navCtrl: NavController, private angFire:AngularFireDatabase, 
	public params: NavParams, public user:UserProvider)
  {
	  
	  //this.topics = this.angFire.list('/topics');
	  let topic = params.get('topic');
	  let k;
	  
	  for(k in topic.tutors)
	  {
		this.topictitle = topic.title;
		this.topictutors.push(topic.tutors[k].name); 
	  }
	   
	 this.uid= user.getCurrentUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorsPage');
  }

 
openChat(key){
	
	this. navCtrl.push(ChatViewPage, {uid:this.uid, interlocutor:key, name:key});
	
}

}
