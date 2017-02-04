import {TaskStatus} from '../enum/TaskStatus';

export class Task {
  $key: any;
  title: string;
  status: TaskStatus;
  due: Date;
  createDate: Date;

  constructor(title: string, status: TaskStatus) {
    this.title = title;
    this.status = status;
  }
}
