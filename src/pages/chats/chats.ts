import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { UserProvider } from '../../providers/user/user-provider';
import { AngularFireDatabase } from 'angularfire2/database';
import {ChatViewPage} from '../../pages/chat-view/chat-view';
import * as firebase from 'firebase/app';

/**
 * Generated class for the ChatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 
 export interface Detail {
    // Property (public by default)
	key:string;
    username: string;
	email: string;
    
}
@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})

 
export class ChatsPage {
	tutorID:any;
    myTutor:any;
	query:any;
	query1: any;
	query2:any;
	interlocutor:string;
	chats:Observable<any[]>;
	studentdetail: Detail[]=[];
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public user:UserProvider, 
				public angfire:AngularFireDatabase, public zone: NgZone) {
			this.myTutor=navParams.get('id');
			this.query= firebase.database().ref('tutors').orderByChild('email').equalTo(this.myTutor);
			
			//this.getChats().then(chats => {
				/*this.chats=this.getChats().map(users =>{
					return users.map(user =>{
						user.info = this.angfire.object(`/userProfile/${user.$key}`);
						return user;
					});
				});*/
			//});
			
		
  }
  
  ngOnInit(){
	  //gets tutor's ID
	  		this.query.once("value",(snapshot) => {
				snapshot.forEach((childSnapshot)=>{
					var tvalue= childSnapshot.key;
					//console.log("first",tvalue);
					this.tutorID = tvalue;
					//console.log('second', this.tutorID);
					this.getChats(this.tutorID);
					
				});
			});
  }
  
  //get Tutor's chats list
  getChats(ttutor){
	var userRef=firebase.database().ref('userProfile/')
	this.query2=firebase.database().ref('tutors/' + ttutor + '/chats');
	this.query2.on('value',(snapshot)=> {
		this.zone.run(()=> {
		snapshot.forEach((childSnapshot)=>{
		//var childKey = childSnapshot.key;
		//var childData = childSnapshot.val();
		//console.log("The " + childKey + " student " + childData);
			userRef.child(childSnapshot.key).on('value',(data)=>{
			//var stkey= data.key;
			//var stdata = data.val();
			//console.log(data.key, 'name', data.val().fullname);
			this.getDetails(data.key, data.val().fullname, data.val().email);
			});
		});
	});
  });
	
}

//get student details
getDetails(data1, data2, data3){
		this.studentdetail.push({
		key:data1,
		username:data2,
		email:data3
	});
}


	openChat(key, username){
		this. navCtrl.push(ChatViewPage, {uid:this.tutorID, interlocutor:key, name: username});
}
 
  

 }
