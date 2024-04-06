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
    this.getCountry();
  }
  backClicked() {
    this._location.back();
  }
  restaurantForm(): void {
    this.form = this.formBuilder.group({
      personalProfile: this.formBuilder.group({
        email: [''],
        firstName: [''],
        lastName: [''],
        gender: [''],
        dialCode: ['+1'],
        deviceType: ['web'],
        password: [''],
        phoneNumber: [''],
        countryId: [231],
        stateId: [],
        city: [''],
        postalCode: [''],
        streetAddress:['']
      }),
      restaurant: this.formBuilder.group({
        name: [''],
        openingTime: [''],
        closingTime: [''],
        stateId: [],
        countryId: [231],
        streetAddress: [''],
        landmark: [''],
        locationLat: [''], 
        locationLong: [''],
        phoneNumber: [''],
        tipOption: [false],
        taxApplicable: [false],
        splitPayment: [false],
        postalCode: [''],
      })
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
        debugger
        this.getCountry();
        this.form.patchValue({
          personalProfile: {
            firstName: this.userDetail.firstName,
            lastName: this.userDetail.lastName,
            gender: this.userDetail.gender,
            dialCode: this.userDetail.dialCode,
            phoneNumber: this.userDetail.phoneNumber,
            countryId: this.userDetail.countryName,
            stateId: this.userDetail.stateId,
            email: this.userDetail.email,
            password: this.userDetail.password,
            postalCode: this.userDetail.postalCode,
            streetAddress:this.userDetail.streetAddress
          },
          restaurant: {
            name: this.restaurantDetail.name,
            openingTime: this.removeAMPM(this.restaurantDetail.openingTime),
            closingTime: this.removeAMPM(this.restaurantDetail.closingTime),
            stateId: this.restaurantDetail.stateId,
            countryId: this.restaurantDetail.countryName,
            streetAddress: this.restaurantDetail.streetAddress,
            landmark: this.restaurantDetail.landmark,
            locationLat: this.restaurantDetail.locationLat,
            locationLong: this.restaurantDetail.locationLong,
            phoneNumber: this.restaurantDetail.phoneNumber,
            tipOption: this.restaurantDetail.tipOption,
            taxApplicable: this.restaurantDetail.taxApplicable,
            splitPayment: this.restaurantDetail.splitPayment,
            postalCode: this.userDetail.postalCode,
          }
        });
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });

  }

// Function to remove "AM" or "PM" from the time
removeAMPM(time: string): string {
  return time.replace(/\s*([AaPp][Mm])\s*$/, '');
}

  // Function to convert time to AM/PM format with leading zeros
convertToAMPM(time: string): string {
  const [hours, minutes] = time.split(':');
  let hourValue = parseInt(hours, 10);
  let period = 'AM';

  if (hourValue >= 12) {
    period = 'PM';
    if (hourValue > 12) {
      hourValue -= 12;
    }
  }

  // Pad single-digit hours with leading zero
  const formattedHours = hourValue.toString().padStart(2, '0');

  return `${formattedHours}:${minutes} ${period}`;
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
  
     // Convert opening and closing time to AM/PM format
const openingTimeAMPM = this.convertToAMPM(this.form.value.restaurant.openingTime);
const closingTimeAMPM = this.convertToAMPM(this.form.value.restaurant.closingTime);
    const payload = {
      userId: this.userId,
      personalProfile: {
        email: this.form.value.personalProfile.email,
        firstName: this.form.value.personalProfile.firstName,
        lastName: this.form.value.personalProfile.lastName,
        gender: this.form.value.personalProfile.gender,
        deviceType: this.form.value.personalProfile.deviceType,
        dialCode: this.form.value.personalProfile.dialCode,
        password: this.form.value.personalProfile.password,
        postalCode: this.form.value.personalProfile.postalCode,
        city: this.form.value.personalProfile.city,
        phoneNumber: this.form.value.personalProfile.phoneNumber,
        countryId: 231,
        stateId: this.form.value.personalProfile.stateId,
        streetAddress : this.form.value.personalProfile.streetAddress

      },
      restaurant: {
        name: this.form.value.restaurant.name,
        openingTime: openingTimeAMPM, // Use the converted opening time
        closingTime: closingTimeAMPM, // Use the converted closing time
        stateId: this.form.value.restaurant.stateId,
        countryId: 231,
        streetAddress: this.form.value.restaurant.streetAddress,
        landmark: this.form.value.restaurant.landmark,
        locationLat: '', 
        locationLong: '',
        phoneNumber: this.form.value.restaurant.phoneNumber,
        tipOption: this.form.value.restaurant.tipOption,
        taxApplicable: this.form.value.restaurant.taxApplicable,
        splitPayment: this.form.value.restaurant.splitPayment,
        postalCode: this.form.value.restaurant.postalCode,
      }
    };
  
  debugger
    this.restaurantService.addRestaurant(payload).subscribe(response => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
      
      } else {
      
      }
    });
  }
  
}
