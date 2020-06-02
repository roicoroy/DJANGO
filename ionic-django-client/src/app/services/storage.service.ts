import { Injectable } from '@angular/core';
import { throwError, Observable, from, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public tipsData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(
    private storage: Storage
  ) { }
  async getTokenFromPromise(): Promise<any> {
    return await this.storage.ready().then(() => {
      return this.storage.get('token').then(
        (data) => {
          return data;
        },
        (error) => console.error(error));
    });
  }
  getTokenAsObservable(): Observable<any> {
    return from(this.getTokenFromPromise());
  }
  async setData(key, value) {
    return await this.storage.set(key, value);
  }
}
