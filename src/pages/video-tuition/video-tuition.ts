import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser'

/**
 * Generated class for the VideoTuitionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-video-tuition',
  templateUrl: 'video-tuition.html',
})
export class VideoTuitionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private iab: InAppBrowser) {
	  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoTuitionPage');
  }
 openUrl(){
	 //this. platform.ready().then(() => {
		 const browser = this. iab.create('https://www.numberprep.com/online-tutoring/', '_self', 'location= yes');
		 browser.show();
	// });
 }
}
