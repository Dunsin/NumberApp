import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';



@Injectable()
export class AuthServiceProvider {
	public fireAuth: any;
	userData= firebase.database().ref('/userProfile');
	userCredit:number=0;
	acredit:any;

  constructor(public af: AngularFireAuth, public storage:Storage) {
		this.fireAuth = firebase.auth();
		console.log('Hello AuthServiceProvider Provider');
  }
   doLogin(email: string, password: string): firebase.Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string, fullname: string, age: number, year: string, schoolname: string): firebase.Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
     .then((newUser) => {this.userData.child(this.fireAuth.currentUser.uid).set({
		 email:email,
		 fullname:fullname,
		 age:age,
		 year:year,
		 schoolname:schoolname,
		 usercredit:this.userCredit,
		 photoUrl:'https://firebasestorage.googleapis.com/v0/b/numberapp-dbbb6.appspot.com/o/marguerite-daisy-beautiful-beauty.jpg?alt=media&token=a618c9ee-ad83-4aba-a0d4-27a1a9d366dc'});
       this.storage.set('userInfo', JSON.stringify(newUser));
	   // firebase.database().ref('userProfile').child(newUser.uid).set({email: email});
      });
  }
  
   updateimage(imageurl) {
      var promise = new Promise((resolve, reject) => {
          this.fireAuth.currentUser.updateProfile({
              displayName: this.fireAuth.currentUser.fullname,
              photoURL: imageurl      
          }).then(() => {
              this.userData.child(this.fireAuth.currentUser.uid).update({
              fullname: this.fireAuth.currentUser.fullname,
              photoURL: imageurl,
              uid: firebase.auth().currentUser.uid
              }).then(() => {
                  resolve({ success: true });
                  }).catch((err) => {
                      reject(err);
                  })
          }).catch((err) => {
                reject(err);
             })  
      })
      return promise;
  }
  onfetchdata(){
	  var promise= new Promise((resolve,reject)=> {
		  this.userData.child(this.fireAuth.currentUser.uid).once('value',(snapshot) => {
			  resolve(snapshot.val());
		  }).catch ((err) => {
			  reject(err);
		  })
	  })
	  return promise;
  }
  
  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  doLogout(): any {
    return this.fireAuth.signOut();
  }

}
