import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndPoint } from 'src/app/shared/enums/api-end-point';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http:HttpClient) { }

  getRestaurantList(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.restaurantList, data);
  }
  // driverDetails(driverId: any) {
  //   return this.http.get<any>(environment.apiUrl + ApiEndPoint.getDriverInfo + '?driverId=' + driverId);
  // }
  // updateDriver(data: any) {
  //   return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateDriverInfo , data);
  // }
  
  // acceptreject(data: any) {
  //   return this.http.post<any>(environment.apiUrl + ApiEndPoint.acceptrejectDriver, data)
  // }
}
