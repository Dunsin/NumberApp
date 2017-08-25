import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { TutorsPage } from '../tutors/tutors';


@Component({
  selector: 'page-ask-question',
  templateUrl: 'ask-question.html',
})
export class AskQuestionPage {
	public topics    : FirebaseListObservable<any[]>;
	
	selectedItem: any;
	icons: string[];
	items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl    : NavController,
               private angFire   : AngularFireDatabase,
               private modalCtrl : ModalController,
               private platform  : Platform)
   {
   }
  
  ionViewDidLoad() 
  {
    this.platform.ready()
      .then(() =>
      {
         this.topics = this.angFire.list('/topics');
      });
  }
  
  listtutors(topic){
	  this.navCtrl.push(TutorsPage, {topic : topic});
	  
	  //let params = { topic: topic },
          //tutormodal  = this.modalCtrl.create( TutorsPage, params);
			//tutormodal.present();
	  
    }
  
 }
