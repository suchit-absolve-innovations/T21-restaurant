import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ApiEndPoint } from 'src/app/shared/enums/api-end-point';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http:HttpClient) { }


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

