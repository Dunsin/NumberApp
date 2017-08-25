import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {UserProvider} from '../../providers/user/user-provider';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(public http: Http, public angfire:AngularFireDatabase, public userprovider:UserProvider) 
  {
    console.log('Hello ChatProvider Provider');
  }
  
 //get list of chat of a logged in user
	getChats(){
	  return this. userprovider.getUid().then(uid => {
		let chats = this.angfire.list(`/userProfile/${uid}/chats`);
		return chats;
	});
}

//add chat reference to both users
	addChats(uid,interlocutor){
	// First User   
      //let otherUid = interlocutor; 
	  let endpoint = 
		this.angfire.object(`userProfile/${uid}/chats/${interlocutor}`);
       endpoint.set(true); 
	   
	   // Second User   
      
	  let endpoint2 = 
		this.angfire.object(`tutors/${interlocutor}/chats/${uid}`);
       endpoint2.set(true); 
}

 getChatRef(uid, interlocutor) { 
	let firstRef = 
		this.angfire.object(`userProfile/${uid}/chats/${interlocutor}`,{preserveSnapshot:true});
		let promise = new Promise((resolve, reject) => {
			  firstRef.subscribe(snapshot => {
				  let a = snapshot.exists();
				  if(a) {
					  resolve(`/chats/${interlocutor},${uid}`); 
					  } 
					else { 
						let secondRef = this.angfire.object(`tutors/${uid}/chats/${interlocutor}`, {preserveSnapshot:true});
						secondRef.subscribe(snapshot => {   
							let b = snapshot.exists();  
							if(b) {
								resolve(`/chats/${uid},${interlocutor}`);
								}
								else{
									this.addChats(uid,interlocutor);
									resolve(`/chats/${interlocutor},${uid}`);
								}
							});
						}
				}); 
			});     
		return promise; 
	} 

}
