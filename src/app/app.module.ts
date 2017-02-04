import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TasksPage } from '../pages/tasks/home';
import {AngularFireModule} from 'angularfire2';

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyCyFf-QpYFGBUrtdHFsy15LZH50lgg68VI",
  authDomain: "ionic2do-17d4d.firebaseapp.com",
  databaseURL: "https://ionic2do-17d4d.firebaseio.com",
  storageBucket: "ionic2do-17d4d.appspot.com",
  messagingSenderId: "791578804923"
};

@NgModule({
  declarations: [
    MyApp,
    TasksPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TasksPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
