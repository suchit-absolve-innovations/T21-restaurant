import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RestaurantService } from '../restaurant.service';
import { ContentService } from 'src/app/shared/service/content.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  imageFile!: { link: any; file: any; name: any; type: any };
  urls: string[] = [];
  form!: FormGroup;
  submitted = false;
  statesLists: any[] = [];
  countriesList: any;
  userId:any;

  constructor(
    private _location: Location,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit(): void {
    this.getCountry();
    this.getCountriesList();
    this.restaurantForm();

    
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
        postalCode: ['']
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
        splitPayment: [false]
      })
    });



  }

  onselect(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        this.urls.push(imageDataUrl);
      };
    }
  }
  get f() {
    return this.form['controls'];
  }
  get countryId() {
    return this.form.get('countryId');
  }

  get stateId() {
    return this.form.get('stateId');
  }

  backClicked() {
    this._location.back();
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
      userId: "",
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
        countryId: this.form.value.personalProfile.countryId,
        stateId: this.form.value.personalProfile.stateId
      },
      restaurant: {
        name: this.form.value.restaurant.name,
        openingTime: openingTimeAMPM, // Use the converted opening time
        closingTime: closingTimeAMPM, // Use the converted closing time
        stateId: this.form.value.restaurant.stateId,
        countryId: this.form.value.restaurant.countryId,
        streetAddress: this.form.value.restaurant.streetAddress,
        landmark: this.form.value.restaurant.landmark,
        locationLat: '', 
        locationLong: '',
        phoneNumber: this.form.value.restaurant.phoneNumber,
        tipOption: this.form.value.restaurant.tipOption,
        taxApplicable: this.form.value.restaurant.taxApplicable,
        splitPayment: this.form.value.restaurant.splitPayment
      }
    };
  
    this.restaurantService.addRestaurant(payload).subscribe(response => {
      if (response.isSuccess) {
        this.userId = response.data.userId;
        this.toaster.success(response.messages);
      } else {
      this.toaster.error(response.messages)
      }
    });
  }

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
  
  getCountriesList() {
    this.contentService.getAllCountries().subscribe((response) => {
      if (response.statusCode) {
        this.countriesList = response.data;
      }
    });
  }
  getCountry() {
    debugger
    this.contentService.getAllStates(231).subscribe((response) => {
      if (response.statusCode) {
        this.statesLists = response.data;
        // var stateListData = this.statesLists?.find((y: { stateName: any; }) => y.stateName == this.form.value.stateName);
        // this.form.patchValue({
        //   stateId: stateListData?.stateId,
        // })
      }
    });
  }
}


