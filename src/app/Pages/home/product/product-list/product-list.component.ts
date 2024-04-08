import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/shared/service/category.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/shared/service/product.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  restaurantId!: any;
  categoryList: any;
  subcategoryList: any;
  form: any;
  list: any;
  rootUrl!: string;
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  constructor(
    private _location: Location,
    private categoryService: CategoryService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.restaurantId = localStorage.getItem('restaurantId');
    this.rootUrl = environment.rootPathUrl;
    this.getMainCategory();
this.getProductList();
    this.form = this.formBuilder.group({
      mainCategoryId: [''],
      subCategoryId: [''],
    });
  }

  get f() {
    return this.form['controls'];
  }

  backClicked() {
    this._location.back();
  }

   /** Main Category List */

   getMainCategory() {
    this.categoryService
      .getcategory(this.restaurantId)
      .subscribe((response) => {
        if (response.isSuccess == true) {
          this.categoryList = response.data;
        } else {

        }
      });
  }


  getsubCategory(data:any) {

    this.spinner.show();
    let paylaod = {
    restaurantId : this.restaurantId,
    mainCategoryId : data
    }
    this.categoryService
      .getsubcategory(paylaod)
      .subscribe((response) => {
        if (response.isSuccess == true) {
          this.subcategoryList = response.data;
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
  }


  // 

  getProductList(){
    let paylaod ={
      pageNumber:1,
      pageSize: 1000,
      restaurantId: this.restaurantId
    }

    this.productService.getmenulist(paylaod).subscribe(response => {
      if (response && response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages);
        this.list = response.data.dataList;
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  filterlistMenuMain(data:any){
    debugger
    let paylaod ={
      pageNumber:1,
      pageSize: 1000,
      restaurantId: this.restaurantId,
      mainCategoryId:data
    }

    this.productService.getmenufilter1(paylaod).subscribe(response => {
      if (response && response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages);
        this.list = response.data.dataList;
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }


  filterlistMenuSub(data:any){
    debugger
    let paylaod ={
      pageNumber:1,
      pageSize: 1000,
      restaurantId: this.restaurantId,
      subCategoryId:data
    }

    this.productService.getmenufilter2(paylaod).subscribe(response => {
      if (response && response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages);
        this.list = response.data.dataList;
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }


}
