import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ApiEndPoint } from '../enums/api-end-point';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


    //main - category
    categoryImage(data: any) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      const options = {
        headers: headers
      };
      return this.http.post<any>(environment.apiUrl + ApiEndPoint.categoryImageupload, data, options).pipe(map((data: any) => {
        localStorage.setItem('File', data);
        return data;
      }));
    }

    getcategory(restaurantId: any) {
      return this.http.get<any>(environment.apiUrl + ApiEndPoint.mainCategoryList + '?restaurantId=' + restaurantId);
    }


      // Category Delete

  mainCategoryDelete(data: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteMainCategory + '?mainCategoryId=' + data.mainCategoryId + '&restaurantId=' + data.restaurantId);
  }

    //  Add Category
    addCategory(data: any) {
      return this.http.post<any>(environment.apiUrl + ApiEndPoint.addCategory, data);
    }

    editCategory(data: any) {
      return this.http.post<any>(environment.apiUrl + ApiEndPoint.editCategory, data);
    }

    maincategoryDetail(mainCategoryId: any) {
      return this.http.get<any>(environment.apiUrl + ApiEndPoint.mainCategoryDetail + '?mainCategoryId=' + mainCategoryId);
    }

    getsubcategory(data: any) {
      return this.http.get<any>(environment.apiUrl + ApiEndPoint.mainCategoryList + '?restaurantId=' + data.restaurantId + '&mainCategoryId=' + data.mainCategoryId);
    }


          // Category Delete

  subCategoryDelete(data: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteMainCategory + '?mainCategoryId=' + data.mainCategoryId + '&subCategoryId=' + data.subCategoryId + '&restaurantId=' + data.restaurantId);
  }

  subcategoryDetail(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.mainCategoryDetail + '?mainCategoryId=' + data.mainCategoryId + '&subCategoryId=' + data.subCategoryId);
  }

}
