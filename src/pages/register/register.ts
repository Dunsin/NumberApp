import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'register'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	
  public registerForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  fullnameChanged: boolean = false;
  ageChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  schoolSelection:{title:string}
  yearSelection:{title:string}

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public formBuilder: FormBuilder, 
			public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
				
				let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
				this.registerForm = formBuilder.group({
					email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
					password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
					fullname:['', Validators.compose([Validators.minLength(6), Validators.required])],
					age:['', Validators.compose([Validators.minLength(1), Validators.required])],
					year:['', Validators.compose([Validators.minLength(6), Validators.required])],
					schoolname:['',Validators.required],
					
					
					
    });
	
	this.schoolSelection={title:'Select a School'};
	this.yearSelection={title:'Select a Year'};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  
doRegister(){
    this.submitAttempt = true;

    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      this.authService.register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.fullname, this.registerForm.value.age, this.registerForm.value.year, this.registerForm.value.schoolname).then( authService => {
        this.navCtrl.setRoot(HomePage);
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
  
  //gotoLogin():void { this.navCtrl.push('login'); }
   gotoLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
 
}
