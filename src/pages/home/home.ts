import { Component } from '@angular/core';

import {NavController, ItemSliding} from 'ionic-angular';
import {TaskStatus} from '../../app/enum/TaskStatus';
import {Task} from '../../app/entity/task';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  TaskStatus = TaskStatus;
  tasks: Array<Task> = [];

  tasks2: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
              public angularFire: AngularFire) {
    this.tasks = [
      {title:'Milk', status: TaskStatus.TODO, due: undefined, createDate: null},
      {title:'Eggs', status: TaskStatus.TODO, due: undefined, createDate: null},
      {title:'Syrup', status: TaskStatus.TODO, due: undefined, createDate: null},
      {title:'Pancake Mix', status: TaskStatus.TODO, due: undefined, createDate: null}
    ];

    this.tasks2 = angularFire.database.list('/tasks');
  }

  addItem(): void {
    let theNewTask: string = prompt("New Task");
    if (theNewTask !== '') {
      this.tasks2.push({
        title: theNewTask,
        status: TaskStatus.TODO,
        due: undefined,
        createDate: new Date()
      });
      console.log('')
    }
  }

  markAsDone(slidingItem: ItemSliding, task) {
    this.tasks2.update(task.$key, { status: TaskStatus.DONE });
    slidingItem.close();
  }

  removeTask(slidingItem: ItemSliding, task) {
    this.tasks2.remove(task.$key);
    slidingItem.close();
  }

}
