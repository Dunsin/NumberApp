import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from '../../providers/user/user-provider';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';

/**
 * Generated class for the BuycreditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-buycredit',
  templateUrl: 'buycredit.html',
})
export class BuycreditPage {
	public fireAuth: any;
	credit:any;
	userId:any;
	userData= firebase.database().ref('/userProfile');
public newvalue: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
			   public af: AngularFireAuth, public authService: AuthServiceProvider, public user:UserProvider) {
					this.fireAuth = firebase.auth();  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuycreditPage');
	this.loadusercredit();
	 
  }
  loadusercredit(){
	   this.authService.onfetchdata().then((res:any)=>{
		   this.newvalue = res.usercredit;
	   })
  }
   
 add5(){
	 this.credit=this.newvalue + 50;
	 this.userData.child(this.fireAuth.currentUser.uid).update({usercredit:this.credit});
	}
	
 add10(){
	 this.credit=this.newvalue + 100;
	 this.userData.child(this.fireAuth.currentUser.uid).update({usercredit:this.credit});
	}
	
 add15(){
	 this.credit=this.newvalue + 150;
	 this.userData.child(this.fireAuth.currentUser.uid).update({usercredit:this.credit});
	 }
	 
 add20(){
	 this.credit=this.newvalue + 200;
	 this.userData.child(this.fireAuth.currentUser.uid).update({usercredit:this.credit});
	}
}
