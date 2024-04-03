import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banners-list',
  templateUrl: './banners-list.component.html',
  styleUrls: ['./banners-list.component.css']
})
export class BannersListComponent implements OnInit {
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  rootUrl: any;
  bannerList: any;
  bannerId: any;
  search: any;
  itemToDelete: any;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    // this.getBannerList();
  }
  // getBannerList() {
  //   let payload = {
  //     pageNumber: 1,
  //     pageSize: 1000,
  //   }
  //   this.spinner.show();
  //   this.content.getBanner(payload).subscribe(response => {
  //     if (response.isSuccess) {
  //       this.bannerList = response.data;

  //       this.spinner.hide();
  //     }
  //   });
  // }

  edit(data: any) {
    this.router.navigate(['/banner-list/add-edit-banner'],
      {
        queryParams: {
          id: data.bannerId
        }
      });
  }


  onSearch(searchTerm: string): void {
    // Update query parameters for search
    this.router.navigate([], {
      queryParams: { search: searchTerm, page: 1 }, // Reset to the first page when searching
      queryParamsHandling: 'merge',
    });
  }

  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
    }

}
