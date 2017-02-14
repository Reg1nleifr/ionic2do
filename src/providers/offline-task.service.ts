import * as PouchDB from 'pouchdb';
import {Injectable} from '@angular/core';

@Injectable()
export class OfflineTaskService {

  private _userDB;
  private _taskDB;
  private _tasks;

  initDB() {
    this._userDB = new PouchDB('user', { adapter: 'websql' });
    this._taskDB = new PouchDB('task', { adapter: 'websql' });
  }

  getTask() {
    return this._taskDB.get();
  }

  getUser() {
    return this._userDB;
  }


  add(task) {
    return this._taskDB.post(task);
  }

  update(task) {
    return this._taskDB.put(task);
  }

  getAll() {

    if (!this._tasks) {
      return this._taskDB.allDocs({ include_docs: true})
        .then(docs => {

          // Each row has a .doc object and we just want to send an
          // array of birthday objects back to the calling controller,
          // so let's map the array to contain just the .doc objects.

          this._tasks = docs.rows.map(row => {
            // Dates are not automatically converted from a string.
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });

          // Listen for changes on the database.
          this._taskDB.changes({ live: true, since: 'now', include_docs: true})
            .on('change', this.onDatabaseChange);

          return this._taskDB;
        });
    } else {
      // Return cached data as a promise
      return Promise.resolve(this._tasks);
    }
  }

  private onDatabaseChange = (change) => {
    var index = this.findIndex(this._taskDB, change.id);
    var data = this._taskDB[index];

    if (change.deleted) {
      if (data) {
        this._taskDB.splice(index, 1); // delete
      }
    } else {
      change.doc.Date = new Date(change.doc.Date);
      if (data && data._id === change.id) {
        this._taskDB[index] = change.doc; // update
      } else {
        this._taskDB.splice(index, 0, change.doc) // insert
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
