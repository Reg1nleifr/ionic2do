import {Component} from '@angular/core';
import {Task} from '../../app/entity/task'
import {TaskService} from '../../providers/task.service';
import {TaskStatus} from '../../app/enum/TaskStatus';
import {ViewController} from 'ionic-angular';

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }

  onDismiss() {
    this.viewCtrl.dismiss();
  }

  onSave() {
    if (this.task.title !== '') {
      this.taskService.createTodo(this.task);
    }
    this.viewCtrl.dismiss();
  }
}
