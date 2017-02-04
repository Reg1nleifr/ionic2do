import { Component } from '@angular/core';
import {NavController, ItemSliding} from 'ionic-angular';
import {TaskStatus} from '../../app/enum/TaskStatus';
import {Task} from '../../app/entity/task';
import {AngularFire, FirebaseListObservable, AngularFireAuth} from 'angularfire2';
import {Dialogs} from 'ionic-native';

@Component({
  selector: 'page-task',
  templateUrl: 'tasks.html'
})
export class TasksPage {

  TaskStatus = TaskStatus;
  tasks: FirebaseListObservable<Task[]>;
  constructor(public navCtrl: NavController,
              public angularFire: AngularFire) {

    this.tasks = angularFire.database.list('/tasks');
  }

  addItem(): void {

  Dialogs.prompt('Add a task', 'Ionic2Do', ['Ok', 'Cancel'], '')
    .then(
      theResult => {
        if (theResult.buttonIndex == 1) {
          this.tasks.push({ title: theResult.input1, status: TaskStatus.TODO });
        }
      }
    );
  }

  markAsDone(slidingItem: ItemSliding, task: Task) {
    this.tasks.update(task.$key, { status: TaskStatus.DONE });
    slidingItem.close();
  }

  unmarkAsDone(slidingItem: ItemSliding, task: Task) {
    this.tasks.update(task.$key, { status: TaskStatus.TODO });
    slidingItem.close();
  }

  removeTask(slidingItem: ItemSliding, task: Task) {
    this.tasks.remove(task.$key);
    slidingItem.close();
  }

}
