import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {AddTaskPage} from '../pages/add-task/add-task';
import {LoginPage} from '../pages/login/login';
import {MyApp} from './app.component';
import {SignupPage} from '../pages/signup/signup';
import {TaskService} from '../providers/task.service';
import {TasksPage} from '../pages/tasks/tasks';

@NgModule({
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  declarations: [
    MyApp,
    SignupPage,
    LoginPage,
    TasksPage,
    AddTaskPage
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    SignupPage,
    LoginPage,
    TasksPage,
    AddTaskPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TaskService
  ]
})

export class AppModule {
}
