import { Component } from '@angular/core';
import {NavController, ItemSliding, ModalController} from 'ionic-angular';
import {TaskStatus} from '../../app/enum/TaskStatus';
import {Task} from '../../app/entity/task';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Dialogs} from 'ionic-native';
import {AngularFireLoginService} from '../../providers/login-providers/angular-fire-login';
import {LoginPage} from '../login/login';
import {AddTaskPage} from '../add-task/add-task';
import {FireTaskService} from '../../providers/task.service';

@Component({
  selector: 'page-task',
  templateUrl: 'tasks.html'
})
export class TasksPage {

  TaskStatus = TaskStatus;
  tasks: FirebaseListObservable<Task[]>;
  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public taskService: FireTaskService) {

    this.tasks = taskService.fireTasks; // Geht das?
    // this.tasks = angularFire.database.list('/tasks');
  }

  addItem(): void {

  // Dialogs.prompt('Add a task', 'Ionic2Do', ['Ok', 'Cancel'], '')
  //   .then(
  //     theResult => {
  //       if (theResult.buttonIndex == 1 && theResult.input1 !== '') {
  //         this.tasks.push({ title: theResult.input1, status: TaskStatus.TODO });
  //       }
  //     }
  //   );

    let modal = this.modalCtrl.create(AddTaskPage);
    modal.present();

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
