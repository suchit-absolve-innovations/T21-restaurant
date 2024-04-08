import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ApiEndPoint } from 'src/app/shared/enums/api-end-point';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http:HttpClient) { }

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


  restaurantlogoImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.restaurantImages, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }
  getRestaurantList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.restaurantList, { params: data }).pipe(
    );
  }
  getRestaurantdetails(userId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.restaurantDetail + '?userId=' + userId);
  }

  addRestaurant(data: any) {
      return this.http.post<any>(environment.apiUrl + ApiEndPoint.addRestaurants, data);
    }
  
}

