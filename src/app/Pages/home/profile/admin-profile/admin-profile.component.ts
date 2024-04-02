import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  form!: FormGroup;
  countriesList: any;
  statesLists: any;
  superAdminDetailPatch: any;
  bankDetailPatch: any;
  upiDetailPatch: any;
  editImages: any;
  rootUrl: any;
  // image upload
  imageFile!: { link: any, file: any, name: any, type: any };
  isActive!: boolean;
  superAdminId: any;
  urls: string[] = [];
  
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.superAdminProfileForm();

  }


  /** Vendor Form **/
  superAdminProfileForm() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      dialCode: ['+1', [Validators.required]],
      countryId: [231],
      stateId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],

    
    });
  }


  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get gender() {
    return this.form.get('gender');
  }

  get dialCode() {
    return this.form.get('dialCode');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get countryId() {
    return this.form.get('countryId');
  }

  get stateId() {
    return this.form.get('stateId');
  }

  get email() {
    return this.form.get('email');
  }

  get f() {
    return this.form['controls'];
  }





  /** Disable Input cut Copy Paste  **/


 
  // Detail  





  /*** Profile Pic Upload ***/
  // image upload 
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
  

  // postSuperAdmimProfile() {
  
  //   if (this.superAdminDetailPatch) {
  //     let payload = {
  //       id: this.superAdminId,
  //       email: this.form.value.email,
  //       firstName: this.form.value.firstName,
  //       lastName: this.form.value.lastName,
  //       gender: this.form.value.gender,
  //       dialCode: this.form.value.dialCode,
  //       phoneNumber: this.form.value.phoneNumber,
  //       countryId: this.form.value.countryId,
  //       stateId: this.form.value.stateId,
      

  //     }
  //     this.contentService.updateSuperAdmimProfile(payload).subscribe(response => {
  //       if (response.isSuccess) {
    
  //         // this.fileChangeEvent();
         
  //         this.toasterService.success(response.messages);
  //         // this.router.navigateByUrl('/vendor-product-list')
  //       } else {
  //         this.spinner.hide();
  //         this.toasterService.error(response.messages);
  //       }
  //     });
  //   }
  // }

  cancel() {
    this.router.navigateByUrl('/dashboard/dashboard')
      .then(() => {
        window.location.reload();
      });
  }

}
