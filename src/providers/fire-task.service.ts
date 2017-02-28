import { Injectable } from '@angular/core';
import { Task } from '../app/entity/task';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable, AuthMethods, AuthProviders} from 'angularfire2';

@Injectable()
export class FireTaskService {
  private tasks: FirebaseListObservable<Task[]>;

  constructor(private _angularFire: AngularFire) {
    console.log('Hello Task Provider');
    this.tasks = _angularFire.database.list('/fireTasks');
  }

  get fireTasks(): FirebaseListObservable<Task[]> {
    return this.tasks;
  }

  addFireTask(task: Task) {
    this.tasks.push(task);
  }

  removeFireTask($key: any) {
    this.tasks.remove($key);
  }

  updateFireTask($key: any, task: Task) {
    this.tasks.update($key, task); // Does this work?
  }
}
