import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {AngularFireLoginService} from '../../providers/login-providers/angular-fire-login';
import {TasksPage} from '../tasks/tasks';
import {GooglePlus, NativeStorage} from 'ionic-native';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private username: string;
  private password: string;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private _loginService: AngularFireLoginService) {

  }

  login() {
    //this.navCtrl.push(TasksPage, { offline: true });
    console.log(this.password);

    this.navCtrl.push(TasksPage, {offline: true});
  }









  onGoogleLogin() {
    this._loginService.loginWithGoogle().then((user) => {
      // Send them to the homepage if they are logged in
      //TODO: Save credentials in cache.
      console.log(user);

      // this.offlineStorage.save(user, 'user');
      this.navCtrl.push(TasksPage, {offline: false});
    })
  }

  //Native
  doGoogleLogin(){
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    GooglePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    }).then(function (user) {
        loading.dismiss();

        NativeStorage.setItem('user', {
          name: user.displayName,
          email: user.email,
          picture: user.imageUrl
        })
          .then(function(){
            nav.push(TasksPage, {offline: false});
          }, function (error) {
            console.log(error);
          });



      }, function (error) {
        loading.dismiss();
      });
  }

  doGoogleLogout(){
    let nav = this.navCtrl;
    GooglePlus.logout()
      .then(function (response) {
        NativeStorage.remove('user');
        nav.push(LoginPage);
      },function (error) {
        console.log(error);
      })
  }

}
