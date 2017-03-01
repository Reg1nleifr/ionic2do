import { Headers, Http } from '@angular/http';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaskService } from '../../providers/task.service';
import {TasksPage} from '../tasks/tasks';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(public nav: NavController, public http: Http, public taskService: TaskService) {

  }

  register() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.http.post(this.taskService.loginBaseUrl+'auth/register', JSON.stringify(user), { headers: headers })
      .subscribe(res => {
        this.taskService.init(res.json());
        this.nav.setRoot(TasksPage);
      }, (err) => {
        console.log(err);
      });

  }

}