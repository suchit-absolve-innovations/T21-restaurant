import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/shared/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})
export class SubCategoryListComponent implements OnInit {
  restaurantId!: any;
  categoryList: any;
  rootUrl!: string;
  mainCategoryId: any;

  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private _location: Location,
  ) {}

  ngOnInit(): void {
    this.restaurantId = localStorage.getItem('restaurantId');
    this.rootUrl = environment.rootPathUrl;
    this.mainCategoryId = this.route.snapshot.params;
    debugger
    this.getsubCategory();
  }

   /** Main Category List */

   getsubCategory() {
    this.spinner.show();
    let paylaod = {
    restaurantId : this.restaurantId,
    mainCategoryId : this.mainCategoryId.id
    }
    this.categoryService
      .getsubcategory(paylaod)
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

  /** delete main category */
  deletesubCategory(data: any) {
    this.spinner.show();
    let payload = {
      mainCategoryId: this.mainCategoryId.id,
      subCategoryId : data,
      restaurantId: this.restaurantId,
    };
    this.categoryService.subCategoryDelete(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.spinner.hide();
        window.location.reload();
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }


  backClicked() {
    this._location.back();
  }
}
