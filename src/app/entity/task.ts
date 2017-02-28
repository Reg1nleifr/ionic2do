import {TaskStatus} from '../enum/TaskStatus';

export class Task {
  /* Needed for Storage */
  _id: any;
  _rev: any;
  /* Fields */
  title: string;
  status: TaskStatus;
  due: Date;
  dueTime: string;
  repeat: boolean;
  repeatInterval: number;

  constructor(title: string, status: TaskStatus) {
    this.title = title;
    this.status = status;
  }
}
