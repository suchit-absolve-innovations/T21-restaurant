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
  }

  getMainCategory() {
   this.spinner.show(); 
    this.categoryService
      .getcategory(this.restaurantId)
      .subscribe(response => {
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
}
