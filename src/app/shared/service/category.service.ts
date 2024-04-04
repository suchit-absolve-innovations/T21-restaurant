import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ApiEndPoint } from '../enums/api-end-point';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


    //main - category

    getcategory(restaurantId: any) {
      return this.http.get<any>(environment.apiUrl + ApiEndPoint.mainCategoryList + '?restaurantId=' + restaurantId);
    }
}
