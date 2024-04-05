import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ContentService } from 'src/app/shared/service/content.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  restaurantDetail:any;
  userDetail:any;
  form!: FormGroup;
  submitted = false;
  statesLists: any[] = [];
  userId: any;
  rootUrl: any;
  constructor(
    private _location: Location,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private restaurantService: RestaurantService,

  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']; 
    this.rootUrl = environment.rootPathUrl;
    this.getRestaurantDetail();
    this.restaurantForm();
  }
  backClicked() {
    this._location.back();
  }
  restaurantForm(): void {
    this.form = this.formBuilder.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      gender: [''],
      dialCode: [+1],
      password: [''],
      postalCode: [''],
      deviceType: ['web'],
      city: [''],
      name: [''],
      phoneNumber: [''],
      openingTime: [''],
      closingTime: [''],
      stateId: [''],
      countryId: [231],
      streetAddress: [''],
      landmark: [''],
      tipOption: [''],
      taxApplicable: [''],
      splitPayment: ['']
    });
  }

  getRestaurantDetail() {
    this.spinner.show();
    this.restaurantService.getRestaurantdetails(this.userId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages);
        this.userDetail = response.data.user
        this.restaurantDetail = response.data?.restaurant
        this.getCountry();
        this.form.patchValue({
          firstName: this.userDetail.firstName,
          lastName: this.userDetail.lastName,
          gender: this.userDetail.gender,
          dialCode: this.userDetail.dialCode,
          phoneNumber: this.userDetail.phoneNumber,
          countryId: this.userDetail.countryId,
          stateId: this.userDetail.stateId,
          email: this.userDetail.email,
          password: this.userDetail.password,

          name:this.restaurantDetail.name,
          openingTime:this.restaurantDetail.openingTime,
          closingTime:this.restaurantDetail.closingTime,
          streetAddress:this.restaurantDetail.streetAddress,
          tipOption:this.restaurantDetail.tipOption,
          taxApplicable:this.restaurantDetail.taxApplicable,
          status:this.restaurantDetail.status,
          splitPayment:this.restaurantDetail.splitPayment,
          createDate:this.restaurantDetail.createDate,
          stateName:this.restaurantDetail.stateName,
          countryName:this.restaurantDetail.countryName,
        });
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });

  }

 getCountry() {
    this.contentService.getAllStates(231).subscribe((response) => {
      if (response.statusCode) {
        this.statesLists = response.data;
        var stateListData = this.statesLists?.find((y: { stateName: any; }) => y.stateName == this.form.value.stateName);
        this.form.patchValue({
          stateId: stateListData?.stateId,
        })
      }
    });
  }
 submit(): void {
    debugger
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  
    const payload = {
      
      email: this.form.value.email,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      deviceType: this.form.value.deviceType,
      gender: this.form.value.gender,
      dialCode: this.form.value.dialCode,
      password: this.form.value.password,
      postalCode: this.form.value.postalCode,
      city: this.form.value.city,
      name: this.form.value.name,
      phoneNumber: this.form.value.phoneNumber,
      openingTime: this.form.value.openingTime,
      closingTime: this.form.value.closingTime,
      stateId: this.form.value.stateId,
      countryId: this.form.value.countryId,
      streetAddress: this.form.value.streetAddress,
      landmark: this.form.value.landmark,
      tipOption: this.form.value.tipOption,
      taxApplicable: this.form.value.taxApplicable,
      splitPayment: this.form.value.splitPayment
    };
  
    this.restaurantService.addRestaurant(payload).subscribe(response => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
      
      } else {
      
      }
    });
  }
  
}
