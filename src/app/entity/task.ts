import {TaskStatus} from '../enum/TaskStatus';

export class Task {
  $key: any;
  title: string;
  status: TaskStatus;
  due: Date;
  dueTime: string;
  createDate: Date;
  repeat: boolean;

  constructor(title: string, status: TaskStatus) {
    this.title = title;
    this.status = status;
  }
}
