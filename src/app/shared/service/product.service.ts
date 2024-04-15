import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getmenufilter1(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.menuList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&restaurantId=' + data.restaurantId + '&mainCategoryId=' + data.mainCategoryId);
  }

  getmenufilter2(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.menuList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&restaurantId=' + data.restaurantId +  '&subCategoryId=' + data.subCategoryId);
  }


   addMenu(data: any) {
      return this.http.post<any>(environment.apiUrl + ApiEndPoint.addUpdateMenu, data);
    }

     // Image upload 

  uploadImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.foodImageUpload, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }


  updateFoodVariantType(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateFoodVariantType,data)
  }

  variantTypeList(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.variantTypeList + '?restaurantId=' + data.restaurantId)
  }


  updateFoodVariant(data:any){
return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateFoodVariant ,data)
  }

  foodVariantList(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.foodVariantList + '?restaurantId=' + data.restaurantId + '&VariantTypeId=' + data.VariantTypeId)
  }


  foodVariantOption(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.foodVariantOption,data)
  }

  variantOptionList(){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.variantOptionList)
  }

  UpdateFoodItemVariant(data:any){
    return this.http.post<any>(environment.apiUrl +  ApiEndPoint.UpdateFoodItemVariant,data)
  }

  GetFoodItemVariant(foodId:any){
    return this.http.get<any>(environment.apiUrl +  ApiEndPoint.GetFoodItemVariant + '?foodId=' + foodId)
  }

  AddUpdateFoodVariantOption(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.AddUpdateFoodVariantOption,data)
  }

  AddUpdateFoodType(data:any){
 return this.http.post<any>(environment.apiUrl + ApiEndPoint.AddUpdateFoodType,data)
}


}
