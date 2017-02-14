import { Storage } from '@ionic/storage';
import {Injectable} from '@angular/core';

@Injectable()
export class OfflineTaskService {

  constructor(private _storage: Storage){
  }

  getData(filename: string) {
    return this._storage.get(filename);
  }

  save(data: any, filename: string) {
    let newData = JSON.stringify(data);
    this._storage.set(filename, newData);
  }

}
