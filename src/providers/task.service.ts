/**
 * Created by Flo on 14/02/2017.
 */
import * as PouchDB from 'pouchdb';

import {Injectable} from '@angular/core';
import {Task} from '../app/entity/task';

@Injectable()
export class TaskService {

  // TODO: Wäre ein LoginService schön?
  // TODO: https:// -> Wie kann ich das über ssl senden?
  // loginUrl: string = 'http://192.168.0.20:3000/auth/login';
  // registerUrl: string = 'http://192.168.0.20:3000/auth/register';
  // remoteDBUrl: string = 'http://192.168.0.20:5984';

  loginUrl: string = 'http://localhost:3000/auth/login';
  registerUrl: string = 'http://localhost:3000/auth/register';
  remoteDBUrl: string = 'http://localhost:5984';

  data: any;
  db: any;
  remote: any;

  constructor() {
  }

  init(details) {

    this.db = new PouchDB('pandodb');

    this.remote = details.userDBs.pando;

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    //Was tun wenn nicht erreichbar?
    this.db.sync(this.remote, options);
  }

  /**
   *
   * Logout
   *
   * @memberOf TaskService
   */
  logout(){

    this.data = null;

    this.db.destroy().then(() => {
      console.log("database removed");
    });
  }


  // setTaskStatus(_id: any, status: TaskStatus) {
  //   let me = this.db.get(_id);
  //   me.status = status;
  //   console.log(me);
  //   this.db.put(me);
  // }

  getTodos(): Promise<Task> {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
          console.log(this.data);
        });

        resolve(this.data);

        this.db.changes({
          live: true,
          since: 'now',
          include_docs: true
        }).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      });

    });
  }

  createTodo(todo: Task): void {
    this.db.post(todo);
  }

  updateTodo(todo: Task): void{
    this.db.put(todo).catch((err) => {
      console.log(err);
    });
  }

  deleteTodo(todo: Task): void{
    this.db.remove(todo).catch((err) => {
      console.log(err);
    });
  }

  handleChange(change){

    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.data.push(change.doc);
      }

    }

  }

  private onDatabaseChange = (change) => {
    var index = this.findIndex(this.db, change.id);
    var data = this.db[index];

    if (change.deleted) {
      if (data) {
        this.db.splice(index, 1); // delete
      }
    } else {
      change.doc.Date = new Date(change.doc.Date);
      if (data && data._id === change.id) {
        this.db[index] = change.doc; // update
      } else {
        this.db.splice(index, 0, change.doc); // insert
      }
    }
  }

// Binary search, the array is by default sorted by _id.
  private findIndex(array, id) {
    var low = 0, high = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
  }

}
