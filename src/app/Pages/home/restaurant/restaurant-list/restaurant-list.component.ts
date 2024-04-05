import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
  constructor(
    private restaurantService: RestaurantService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit(): void {
    this.restaurantList();
  }
  restaurantList() {
    let payload = {
      pageNumber: 1,
      pageSize: 100
    };
  
    this.restaurantService.getRestaurantList(payload).subscribe(response => {
      if (response && response.isSuccess) {
        this.toaster.success(response.messages);
        this.list = response.data.dataList;
      } else {
        this.toaster.error(response.messages);
      }
    });
  }

}
