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
  editImages: any;
  imageFile!: { link: any, file: any, name: any, type: any };
  imageId: any;
  urls1: any = [];
  imageUrl: any;
  image1: any;
  errorMessage:any;
  restaurantId: any;
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
          this.restaurantId = response.data.restaurant.restaurantId; 
        console.log(this.restaurantId)
        this.imageId = response.data.user.id;
        this.editImages = this.rootUrl + this.userDetail?.profilePic;
        this.imageUrl = this.rootUrl + this.restaurantDetail?.image;
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
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fileChangeEvent() {
    let formData = new FormData();
    formData.append("profilePic", this.imageFile?.file);
    formData.append("Id", this.imageId);
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
        this.fileChangeEvent();
        this.fileChangeEvents();
        this.toaster.success(response.messages);
      
      } else {
      
      }
    });
  }
  
}
