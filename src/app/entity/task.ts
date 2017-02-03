import {TaskStatus} from '../enum/TaskStatus';

export class Task {
  title: string;
  status: TaskStatus;
  due: Date;
  createDate: Date;
}
