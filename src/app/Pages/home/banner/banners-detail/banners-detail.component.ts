import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-banners-detail',
  templateUrl: './banners-detail.component.html',
  styleUrls: ['./banners-detail.component.css']
})
export class BannersDetailComponent implements OnInit {
  bannerdetail: any;
  bannerId: any;
  rootUrl: any;

  constructor(private spinner: NgxSpinnerService,
    private content: ContentService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private _location: Location,) { }

  ngOnInit(): void {
    this.bannerId = this.route.snapshot.paramMap.get('id');
    this.rootUrl = environment.rootPathUrl;
    // this.getBannerDetail();
  }

  backClicked() {
    this._location.back();
  }

  // getBannerDetail() {
  //  this.spinner.show();
  //   this.content.bannerDetail(this.bannerId).subscribe(response => {
  //     if (response.isSuccess) {
  //       this.spinner.hide();
  //       this.bannerdetail = response.data;
  //     }
  //   });
  // }

}

