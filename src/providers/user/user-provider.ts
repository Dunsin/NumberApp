import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { Http } from '@angular/http';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {
	m:any;
	
constructor(public http: Http, public angFire:AngularFireDatabase, 
  private camera:Camera, public local:Storage) {
	  
    console.log('Hello UserProvider Provider');
  }
  
  //get Current User's UID
  getUid(){
	  return this.local.get('userInfo').then(value => {
		  let newValue=JSON.parse(value);
		  return newValue.uid;
	  });
  }
  getCurrentUser(){
	  var uId=firebase.auth().currentUser.uid;
	  return uId;
  }
  
  /*getTutorId(tutor:string){
	  var query= firebase.database().ref('tutors').orderByChild('email').equalTo(tutor);
	     query.once("value",(snapshot) => {
				snapshot.forEach((childSnapshot)=>{
					console.log(childSnapshot.key);
					//return tvalue;
				});
			});
  }*/
   
  
}
