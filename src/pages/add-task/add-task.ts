import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Task } from '../../app/entity/task'
import {TaskStatus} from '../../app/enum/TaskStatus';
import {FireTaskService} from '../../providers/task.service';

/*
  Generated class for the AddTask page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html'
})
export class AddTaskPage {

  task: Task;
  taskDue: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public fireTaskService: FireTaskService) {
    this.task = new Task('',TaskStatus.TODO); // Sowas wie mehrere Konstruktoren gibts nicht!
    this.task.due = new Date();
    this.taskDue = this.task.due.toISOString();
    // this.task.dueTime = this.task.due.toLocaleDateString('h:mm A'); // TODO: Moment.js
    this.task.dueTime = '8:00 AM';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }

  onDismiss() {
    //Save (Provider schreiben wäre das cleanste!)
    if(this.task.title!=='')
    this.fireTaskService.addFireTask(this.task);
    this.viewCtrl.dismiss();
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }
}
