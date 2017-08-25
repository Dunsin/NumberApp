import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {TutorTabsPage} from '../tutor-tabs/tutor-tabs';


/**
 * Generated class for the TutorLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tutor-login',
  templateUrl: 'tutor-login.html',
})
export class TutorLoginPage {
	 public tutorForm;
	 submitAttempt: boolean = false;
	  loading: any;

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public navParams: NavParams, 
			public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
				let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
				this.tutorForm = formBuilder.group({
					email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
					password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorLoginPage');
  }
loginTutor(){
    this.submitAttempt = true;

    if (!this.tutorForm.valid){
      console.log(this.tutorForm.value);
    } else {
      this.authService.doLogin(this.tutorForm.value.email, this.tutorForm.value.password).then( authService => {
        this.navCtrl.push(TutorTabsPage,{tutormail:this.tutorForm.value.email});
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}
