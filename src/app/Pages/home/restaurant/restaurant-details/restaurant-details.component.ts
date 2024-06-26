import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurantDetail:any;
  userDetail:any;
  rootUrl: any;
  userId: any;
  restaurantId: any;
  editImages: any;
  imageUrl: any;
  imageId: any;
  constructor(
    private _location: Location,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']; 
    this.rootUrl = environment.rootPathUrl;
    this.getRestaurantDetail();
  }
  
  backClicked() {
    this._location.back();
  }

  getRestaurantDetail() {
    this.spinner.show();
    this.restaurantService.getRestaurantdetails(this.userId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages);
        this.userDetail = response.data?.user
        this.restaurantDetail = response.data?.restaurant
        this.restaurantId = response.data.restaurant.restaurantId; 
        console.log(this.restaurantId)
        this.imageId = response.data.user.id;
        this.editImages = this.rootUrl + this.userDetail?.profilePic;
        this.imageUrl = this.rootUrl + this.restaurantDetail?.image;
        debugger
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });

  }

}
