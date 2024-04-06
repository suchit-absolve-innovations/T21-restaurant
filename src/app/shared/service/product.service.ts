import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ApiEndPoint } from '../enums/api-end-point';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  // get product list 

  getmenulist(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.menuList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&restaurantId=' + data.restaurantId);
  }
   addMenu(data: any) {
      return this.http.post<any>(environment.apiUrl + ApiEndPoint.addUpdateMenu, data);
    }
}
