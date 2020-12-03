import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // set a unique value string
  async set(key: string, value: any): Promise < any > {
    try {
      const result = localStorage.setItem(key, value);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }
  // to get a key/value pair
  async get(key: string): Promise < any > {
    try {
      const result = localStorage.getItem(key);
      // console.log('storageGET: ' + key + ': ' + result);
      if (result != null) {
        return result;
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }
  // set a key/value object
  async setObject(key: string, object: Object) {
    try {
      const result = localStorage.setItem(key, JSON.stringify(object));
      // console.log('set Object in storage: ' + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }
  // get a key/value object
  async getObject(key: string): Promise < any > {
    try {
      const result =localStorage.getItem(key);
      if (result != null) {
        return JSON.parse(result);
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }
  // remove a single key value:
  remove(key: string) {
    localStorage.removeItem(key);
  }
  //  delete all data from your application:
  clear() {
    localStorage.clear();
  }
}
