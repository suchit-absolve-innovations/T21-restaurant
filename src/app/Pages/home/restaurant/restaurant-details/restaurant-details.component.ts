import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurantDetail:any;
  rootUrl: any;
  constructor(
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
  }
  backClicked() {
    this._location.back();
  }

}
