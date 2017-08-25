import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';

import { AngularFireDatabaseModule} from 'angularfire2/database';
import { HttpModule } from '@angular/http';
import { Camera} from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';
import { ImagePicker } from '@ionic-native/image-picker';
 import {IonicStorageModule} from '@ionic/storage';
 import {FileChooser} from '@ionic-native/file-chooser';
import { InAppBrowser } from '@ionic-native/in-app-browser'




import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AskQuestionPage } from '../pages/ask-question/ask-question';
import {LoginPage} from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import {BuycreditPage} from '../pages/buycredit/buycredit';
import {TutorsPage} from '../pages/tutors/tutors';
import {ChatViewPage} from '../pages/chat-view/chat-view';
import {LogOutPage} from '../pages/log-out/log-out';
import {ChatsPage} from '../pages/chats/chats';
import {TutorLoginPage} from '../pages/tutor-login/tutor-login';
import {TutorTabsPage} from '../pages/tutor-tabs/tutor-tabs';
import {ProfilePage} from '../pages/profile/profile';
import {VideoTuitionPage} from '../pages/video-tuition/video-tuition';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserProvider } from '../providers/user/user-provider';
import { ChatProvider } from '../providers/chat/chat-provider';
import { ChatBubbleComponent } from '../components/chat-bubble/chat-bubble';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import * as firebase from 'firebase/app';

 // Initialize Firebase
  export const firebaseConfig = {
    apiKey: "AIzaSyDsnpu_iN5Vbb9WUWodE1YTa0rksdj3Aak",
    authDomain: "numberapp-dbbb6.firebaseapp.com",
    databaseURL: "https://numberapp-dbbb6.firebaseio.com",
    projectId: "numberapp-dbbb6",
    storageBucket: "numberapp-dbbb6.appspot.com",
    messagingSenderId: "616363762415"
  };
 
firebase.initializeApp(firebaseConfig);
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
   	AskQuestionPage,
	LoginPage,
	BuycreditPage,
	RegisterPage,
	TutorsPage,
	ChatViewPage,
	LogOutPage,
	ChatsPage,
	TutorLoginPage,
	TutorTabsPage,
	ProfilePage,
	VideoTuitionPage,
    ChatBubbleComponent
	
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	AngularFireModule.initializeApp(firebaseConfig),
	AngularFireAuthModule,
	AngularFireDatabaseModule,
	HttpModule,
	IonicStorageModule.forRoot()
	],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AskQuestionPage,
	LoginPage,
	BuycreditPage,
	RegisterPage,
	TutorsPage,
	ChatViewPage,
	LogOutPage,
	ChatsPage,
	TutorLoginPage,
	TutorTabsPage,
	ProfilePage,
	VideoTuitionPage
	
  ],
  providers: [
    StatusBar,
    SplashScreen,
	Camera,
	Keyboard,
	ImagePicker,
	FileChooser,
	InAppBrowser,
	//Storage,
	{provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    UserProvider,
    ChatProvider,
    ImghandlerProvider
  ]
})
export class AppModule {}
