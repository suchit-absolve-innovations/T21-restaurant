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
  userId: any;
  editImages: any;
  imageId: any;
  urls1: any = [];
  imageUrl: any;
  image1: any;
  errorMessage: any;
  restaurantId: any;
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
        phoneNumber: [''],
        countryId: [231],
        stateId: [],
        city: [''],
        postalCode: [''],
        streetAddress: ['']
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

  onselect(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name,
          type: event.srcElement.files[0].type
        };
      };
      // this.name = this.imageFile.link
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fileChangeEvent() {
    let formData = new FormData();
    formData.append("profilePic", this.imageFile?.file);
    formData.append("Id", this.userId);
    this.restaurantService.uploadImage(formData).subscribe(response => {
    });
  }


  ///Restaurant logo//
  handleFileInput(event: any) {
    const fileType = event.target.files[0].type;
    if ((fileType === 'image/jpeg' || fileType === 'image/png') && fileType !== 'image/jfif') {
      const files = event.target.files;
      for (let e = 0; e < files.length; e++) {
        const file = files[e];
        this.image1 = file
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const imageDataUrl1 = reader.result as string;
          this.imageUrl = imageDataUrl1;
          this.urls1.push(imageDataUrl1);
        };
      }
    }
    else {
      this.errorMessage = 'Please select a valid JPEG or PNG image.';
    }
  }


  fileChangeEvents() {
    debugger
    const formData = new FormData();
    for (let e = 0; e < this.urls1.length; e++) {
      const imageDataUrl1 = this.urls1[e];
      const blob = this.dataURItoBlob1(imageDataUrl1);
      formData.append('image', blob, `image_${e}.png`);
    }
    // formData.append("SalonImage", this.imageFiles?.file);
    formData.append("restaurantId", this.restaurantId);
    this.restaurantService.restaurantlogoImage(formData).subscribe(response => {
    });
  }
  private dataURItoBlob1(dataURI: string): Blob {

    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let e = 0; e < byteString.length; e++) {
      ia[e] = byteString.charCodeAt(e);
    }
    return new Blob([ab], { type: mimeString });
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
        postalCode: this.form.value.personalProfile.postalCode,
        city: this.form.value.personalProfile.city,
        phoneNumber: this.form.value.personalProfile.phoneNumber,
        countryId: this.form.value.personalProfile.countryId,
        stateId: this.form.value.personalProfile.stateId,
        streetAddress: this.form.value.personalProfile.streetAddress


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
        splitPayment: this.form.value.restaurant.splitPayment,
        postalCode: this.form.value.personalProfile.postalCode,
      }
    };

    this.restaurantService.addRestaurant(payload).subscribe(response => {
      if (response.isSuccess) {
        this.userId = response.data.user.id;
        this.restaurantId = response.data.restaurant.restaurantId;
        this.fileChangeEvent();
        this.fileChangeEvents();
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


