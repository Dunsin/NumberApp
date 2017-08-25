import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LogOutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-log-out',
  templateUrl: 'log-out.html',
})
export class LogOutPage {

  constructor(public app:App, public navCtrl: NavController, public navParams: NavParams,  public authprovider:AuthServiceProvider ) {
  }

  ionViewDidLoad() {
    this.authprovider.doLogout().then(authprovider => {
		let nav = this.app.getRootNav();
	nav.setRoot(LoginPage);});
  }

}
