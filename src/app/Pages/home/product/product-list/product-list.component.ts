import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/shared/service/category.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder } from '@angular/forms';
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
  constructor(
    private _location: Location,
    private categoryService: CategoryService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.restaurantId = localStorage.getItem('restaurantId');
    this.getMainCategory();

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
    this.spinner.show();
    this.categoryService
      .getcategory(this.restaurantId)
      .subscribe((response) => {
        if (response.isSuccess == true) {
          this.categoryList = response.data;
          this.spinner.hide();
          this.toaster.success(response.messages);
        } else {
          this.spinner.hide();
          this.toaster.error(response.messages);
        }
      });
  }


  getsubCategory(data:any) {
    debugger
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
          this.toaster.success(response.messages);
        } else {
          this.spinner.hide();
          this.toaster.error(response.messages);
        }
      });
  }

}
