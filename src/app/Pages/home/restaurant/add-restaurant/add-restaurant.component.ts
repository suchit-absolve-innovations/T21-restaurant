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
  
    const payload = {
      userId: "",
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
        this.userId = response.data.userId;
        this.toaster.success(response.messages);
      
      } else {
      
      }
    });
  }
  
  getCountriesList() {
    this.contentService.getAllCountries().subscribe((response) => {
      if (response.statusCode) {
        this.countriesList = response.data;
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
}


