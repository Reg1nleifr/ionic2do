import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {TasksPage} from '../pages/tasks/tasks';
import {AngularFireModule} from 'angularfire2';
import {AngularFireLoginService, firebaseConfig} from '../providers/login-providers/angular-fire-login';
import {LoginPage} from '../pages/login/login';
import {AddTaskPage} from '../pages/add-task/add-task';
import {FireTaskService} from '../providers/task.service';
import {OfflineTaskService} from '../providers/offline-task.service';

@NgModule({
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [
    MyApp,
    TasksPage,
    LoginPage,
    AddTaskPage
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    TasksPage,
    LoginPage,
    AddTaskPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireLoginService,
    FireTaskService,
    OfflineTaskService
  ]
})

export class AppModule {
}
