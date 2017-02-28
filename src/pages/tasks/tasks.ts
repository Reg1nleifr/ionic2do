import {ItemSliding, ModalController, NavController, NavParams} from 'ionic-angular';

import {AddTaskPage} from '../add-task/add-task';
import {Component} from '@angular/core';
import {FireTaskService} from '../../providers/fire-task.service';
import {FirebaseListObservable} from 'angularfire2';
import {TaskService} from '../../providers/task.service';
import {Task} from '../../app/entity/task';
import {TaskStatus} from '../../app/enum/TaskStatus';

@Component({
  selector: 'page-task',
  templateUrl: 'tasks.html'
})
export class TasksPage {

  TaskStatus = TaskStatus;
  tasks: Promise<Task[]>;
  loading: boolean = true;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public taskService: TaskService,
              public params: NavParams) {

    this.loading = true;
    this.tasks = this.taskService.getTodos(); //Holma uns de Tasks pls
    this.loading = false;
  }

  addItem(): void {
    let modal = this.modalCtrl.create(AddTaskPage);
    modal.present();
  }

  edit(slidingItem: ItemSliding, task: Task) {
    // this.removeTask(slidingItem, task);
    //this.taskService.updateTodo()
    //this.addItem();
    alert('To be implemented!');
  }

  markAsDone(slidingItem: ItemSliding, task: Task) {
    task.status = TaskStatus.DONE;
    this.taskService.updateTodo(task);
    slidingItem.close();
  }

  unmarkAsDone(slidingItem: ItemSliding, task: Task) {
    task.status = TaskStatus.TODO;
    this.taskService.updateTodo(task);
    slidingItem.close();
  }

  removeTask(slidingItem: ItemSliding, task: Task) {
    this.taskService.deleteTodo(task);
    slidingItem.close();
  }
}
