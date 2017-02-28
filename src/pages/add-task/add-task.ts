import {NavController, NavParams, ViewController} from 'ionic-angular';

import {Component} from '@angular/core';
import {FireTaskService} from '../../providers/fire-task.service';
import {TaskService} from '../../providers/task.service';
import {Task} from '../../app/entity/task'
import {TaskStatus} from '../../app/enum/TaskStatus';

@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html'
})
export class AddTaskPage {

  task: Task;
  taskDue: string;

  constructor(public viewCtrl: ViewController,
              public taskService: TaskService) {
    this.task = new Task('', TaskStatus.TODO); // Sowas wie mehrere Konstruktoren gibts nicht!
    this.task.due = new Date();
    this.taskDue = this.task.due.toISOString();
    this.task.dueTime = this.task.due.toLocaleTimeString();
    console.log(this.task.dueTime)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }

  onDismiss() {
    if (this.task.title !== '') {
      this.taskService.createTodo(this.task);
    }
    this.viewCtrl.dismiss();
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }
}
