import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/shared/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-category-list',
  templateUrl: './main-category-list.component.html',
  styleUrls: ['./main-category-list.component.css'],
})
export class MainCategoryListComponent implements OnInit {
  restaurantId!: any;
  categoryList: any;
  rootUrl!: string;
  page: number = 0;
  itemsPerPage!: number;
  search: any;
  totalItems!: number;
  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.restaurantId = localStorage.getItem('restaurantId');
    this.rootUrl = environment.rootPathUrl;
    this.getMainCategory();
    this.route.queryParams.subscribe((params) => {
      this.search = params['search'] || '';
      this.page = params['page'] ? parseInt(params['page'], 10) : 1;
    });   
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

  /** delete main category */
  deleteMainCategory(data: any) {
    this.spinner.show();
    let payload = {
      mainCategoryId: data,
      restaurantId: this.restaurantId,
    };
    this.categoryService.mainCategoryDelete(payload).subscribe((response) => {
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
}
