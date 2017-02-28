import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {LoginPage} from '../pages/login/login';
import {OfflineTaskService} from '../providers/offline-task.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;
  @ViewChild(Nav) nav;
  // @ViewChild('myNav') nav: NavController

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let that = this;

      // NativeStorage.getItem('user')
      //   .then(function (data) {
      //     // user is previously logged and we have his data
      //     // we will let him access the app
      //
      //     //Do Login!
      //
      //     that.nav.setRoot(TasksPage);
      //     Splashscreen.hide();
      //   }, function (error) {
      //     //we don't have the user data so we will ask him to log in
      //     that.nav.setRoot(LoginPage);
      //   });

      StatusBar.styleDefault();
      Splashscreen.hide();


    });
  }
}
