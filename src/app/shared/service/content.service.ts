import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ApiEndPoint } from '../enums/api-end-point';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}

  /*** Dashboard Api's ***/
  getAllCountries() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCountry)
  }    

  getAllStates(countryId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getState + '?countryId=' + countryId)
  }
  uploadImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.ImageUpload, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }
  // userList(data: any) {
  //   return this.http.post<any>(environment.apiUrl + ApiEndPoint.userLists, data).pipe(map((data: any) => {                                         
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
