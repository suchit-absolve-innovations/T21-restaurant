import { Component, NgZone, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
  

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean | null = null;
  imageFile!: { link: any; file: any; name: any; type: any; };
  editImages: any;
  detail: any;
  id: any;
  rootUrl!: string;
  bannerId: any;
  bannerType: any;
  constructor(private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private _location: Location,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    //  this.bannerForm();
  
  }
  
  backClicked() {
    this._location.back();
  }

  imagesUpload(event: any) {
  
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

}
