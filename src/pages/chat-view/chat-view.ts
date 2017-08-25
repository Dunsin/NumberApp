import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform} from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera} from '@ionic-native/camera';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user-provider';
import {ChatProvider} from '../../providers/chat/chat-provider';
//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';

/**
 * Generated class for the ChatViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-view',
  templateUrl: 'chat-view.html',
})
export class ChatViewPage {
	//message:string;
	uid:string;
	interlocutor:string;
	username:string;
	chats:FirebaseListObservable<any>;
	@ViewChild(Content)content:Content;
  private inputElement;
  private millis = 200;
  private scrollTimeout = this.millis + 50;
  private textareaHeight;
  private scrollContentElelment: any;
  private footerElement: any;
  private initialTextAreaHeight;
  private keyboardHideSub;
  private keybaordShowSub;
  user:boolean;
  userid:string;
  private message = "";

  constructor(private camera: Camera, private keyboard: Keyboard, private imagePicker: ImagePicker, 
			public platform: Platform, public renderer: Renderer, 
			public navCtrl: NavController, public navParams: NavParams, 
				public angFire:AngularFireDatabase, public chatprov:ChatProvider, 
				public userprov:UserProvider) 
	{		
		this.uid = navParams.get('uid');
		this.interlocutor = navParams.get('interlocutor');
		this.username = navParams.get('name');
		
		chatprov.getChatRef(this.uid,this.interlocutor).then((chatRef:any)=>
		{
			this.chats =this.angFire.list(chatRef);
		});
	 
	}
ionViewDidLoad() {
	
	this.updateScroll('load', 500)
  if (this.platform.is('ios')) {
     this.addKeyboardListeners()
  }

    this.scrollContentElelment = this.content.getScrollElement();

    this.footerElement = document.getElementsByTagName('page-chat-view')[0].getElementsByTagName('ion-footer')[0];
    this.inputElement = document.getElementsByTagName('page-chat-view')[0].getElementsByTagName('textarea')[0];

    this.footerElement.style.cssText = this.footerElement.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.scrollContentElelment.style.cssText = this.scrollContentElelment.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.textareaHeight = Number(this.inputElement.style.height.replace('px', ''));
    this.initialTextAreaHeight = this.textareaHeight;

    

  
}
addKeyboardListeners() {

    this.keyboardHideSub = this.keyboard.onKeyboardHide().subscribe(() => {
      let newHeight = this.textareaHeight - this.initialTextAreaHeight + 44;
      let marginBottom = newHeight + 'px';
      console.log('marginBottom', marginBottom)
      this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', marginBottom);
      this.renderer.setElementStyle(this.footerElement, 'marginBottom', '0px')
    });

    this.keybaordShowSub = this.keyboard.onKeyboardShow().subscribe((e) => {

      let newHeight = (e['keyboardHeight']) + this.textareaHeight - this.initialTextAreaHeight;
      let marginBottom = newHeight + 44 + 'px';
      console.log('marginBottom', marginBottom)
      this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', marginBottom);
      this.renderer.setElementStyle(this.footerElement, 'marginBottom', e['keyboardHeight'] + 'px');
      this.updateScroll('keybaord show', this.scrollTimeout);
    });
  }
  
   footerTouchStart(event) {
    //console.log('footerTouchStart: ', event.type, event.target.localName, '...')
    if (event.target.localName !== "textarea") {
      event.preventDefault();
      // console.log('preventing')
    }
  }

contentMouseDown(event) {
    //console.log('blurring input element :- > event type:', event.type);
    this.inputElement.blur();
  }
  
textAreaChange() {

    let newHeight = Number(this.inputElement.style.height.replace('px', ''));
    if (newHeight !== this.textareaHeight) {

      let diffHeight = newHeight - this.textareaHeight;
      this.textareaHeight = newHeight;
      let newNumber = Number(this.scrollContentElelment.style.marginBottom.replace('px', '')) + diffHeight;

      let marginBottom = newNumber + 'px';
      this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', marginBottom);
      this.updateScroll('textAreaChange', this.scrollTimeout);
    }
  }
  
  updateScroll(from, timeout) {
    setTimeout(() => {
      //console.log('updating scroll -->', from)
      this.content.scrollToBottom();
    }, timeout);
  }
  
  
  ionViewDidEnter() {
    this.content.scrollToBottom(300);
  }
  
 /** sendMessage(){
	  if(this.message){
		  let chat={
			  from:this.uid,
			  message:this.message,
			  type:'message',
			  timestamp: new Date()
		  };
		  this.chats.push(chat);
		  this.message = "";
	  }
	  
  };**/ 
  
  sendMessage() {
	this.user = this.uid === this.userprov.getCurrentUser();
    this.addMessage(this.user, this.message);
    this.message = "";
	//this.user=false;
    let currentHeight = this.scrollContentElelment.style.marginBottom.replace('px', '');
    let newHeight = currentHeight - this.textareaHeight + this.initialTextAreaHeight;
    let top = newHeight + 'px';
    this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', top);
    this.updateScroll('sendMessage', this.scrollTimeout);
    this.textareaHeight = this.initialTextAreaHeight;

    setTimeout(() => {
         this.content.scrollToBottom(300);
  });
  
  }
  
  addMessage(id, msg) {
    
    this.chats.push({
	  from: this.uid,
      isMe:id,
      body: msg,
	  timestamp: new Date().toISOString(),
	  type:'message'
      
    });

  }
  
  
   /*sendPicture(){
	  let chat = {
		  from:this.uid,
		  type:'picture', 
		  picture:null};
	   }*/

  
  sendImage(){
  let camerOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      saveToPhotoAlbum: true,
      targetWidth: 1000,
      targetHeight: 1000,
	  correctOrientation: true  //Corrects Android orientation quirks
    }

    this.camera.getPicture(camerOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
	
	  this.user = this.uid === this.userprov.getCurrentUser();
      this.addImage(this.user, base64Image);
      console.log(base64Image);
      this.updateScroll('image add', this.millis)
    }, (err) => {
      // Handle error
    });

  }

  addImage(id, imgData) {
     this.chats.push({
	  from:this.uid,
      isMe:id,
      img: imgData,
	  type:'picture',
      timestamp: new Date()
    });
  }

    
}
