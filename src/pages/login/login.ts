import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Headers, Http, Response} from '@angular/http';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { TaskService } from '../../providers/task.service';
import { TasksPage } from '../tasks/tasks';
import sha1 from 'js-sha1';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username: string;
  password: string;
  errorMsg: string;
  // loginForm: FormGroup;

  constructor(private nav: NavController, private http: Http, private taskService: TaskService, private formBuilder: FormBuilder) {

    //TODO: FormBuilder ansehen :>

    // this.loginForm = this.formBuilder.group({
    //       username: ['', Validators.compose([Validators.minLength(5), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    //       password: ['', Validators.compose([Validators.minLength(5), Validators.required])],
    //     });


  }

  login() {

    this.errorMsg = '';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Existieren diese Parameter?
    if(this.username && this.password) {
      let credentials = {
        username: this.username.toLowerCase(),
        password: sha1(this.password)
      };

      this.http.post(this.taskService.loginUrl, JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          this.taskService.init(res.json());
          this.nav.setRoot(TasksPage);
        }, (err) => {
          // Fehlermeldung ausgeben.
          this.errorMsg = err.statusText;
          console.log(err);
        });
    } else {
      // Fehlermeldung ausgeben.
      this.errorMsg = 'credentials_missing';
    }
  }

  launchSignup() {
    this.nav.push(SignupPage);
  }

  onOfflineMode() {
    this.nav.push(TasksPage);
  }

}
