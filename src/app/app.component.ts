import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AskQuestionPage } from '../pages/ask-question/ask-question';
import {LoginPage} from'../pages/login/login';
import {BuycreditPage} from'../pages/buycredit/buycredit';
import {ProfilePage} from '../pages/profile/profile';
import {VideoTuitionPage} from '../pages/video-tuition/video-tuition';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
	  
      { title: 'Home', component: HomePage },
	  { title: 'Buy Credit', component: BuycreditPage },
      { title: 'Ask a Question', component: AskQuestionPage},
	  {title:'Video Tuition', component : VideoTuitionPage},
	  {title:'Profile', component: ProfilePage},
	  { title: 'Log Out', component: LoginPage }
	  
	  
	  
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
