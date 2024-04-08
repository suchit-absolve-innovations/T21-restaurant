import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  list: any[] = [];
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  rootUrl: any;
  constructor(
    private restaurantService: RestaurantService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; 
    });
    this.rootUrl = environment.rootPathUrl;
    this.restaurantList();
  }

  onPageChange(page: number): void {
    // Update query parameters for pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }
  restaurantList() {
    this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 100
    };
  
    this.restaurantService.getRestaurantList(payload).subscribe(response => {
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
