import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ApiEndPoint } from '../enums/api-end-point';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}

  /*** Dashboard Api's ***/

  // userList(data: any) {
  //   return this.http.post<any>(environment.apiUrl + ApiEndPoint.userLists, data).pipe(map((data: any) => {3
  //     return data;
  //   }));
  // }

  // driverList(data:any){
  //   return this.http.post<any>(environment.apiUrl + ApiEndPoint.driverLists, data).pipe(map((data: any) => {
  //     return data;
  //   }));
  // }

  /********* Set data in local storage **********/
  setLocalData(key: string, data: any, json?: boolean) {
    localStorage.setItem(key, json ? JSON.stringify(data) : data);
  }

  /********* Get data from local storage **********/
  getLocalData(key: string, json?: boolean) {
    let _data: any;
    try {
      _data = localStorage.getItem(key);
      if (json) {
        _data = JSON.parse(_data);
      }
      return _data;
    } catch (error) {
      if (error instanceof SyntaxError) this.clearLocalData(key);
      return null;
    }
  }

  /********* Remove data from local storage **********/
  clearLocalData(key: string) {
    localStorage.removeItem(key);
  }
}
