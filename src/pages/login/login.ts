import { Headers, Http } from '@angular/http';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { TaskService } from '../../providers/task.service';
import { TasksPage } from '../tasks/tasks';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public nav: NavController, public http: Http, public taskService: TaskService) {

  }

  login() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let credentials = {
      username: this.username,
      password: this.password
    };

    console.log(this.password); //See if its clear! _>

    this.http.post(this.taskService.loginBaseUrl+'/auth/login', JSON.stringify(credentials), { headers: headers })
      .subscribe(res => {
        this.taskService.init(res.json());
        this.nav.setRoot(TasksPage);
      }, (err) => {
        console.log(err);
      });

  }

  launchSignup() {
    this.nav.push(SignupPage);
  }

}
