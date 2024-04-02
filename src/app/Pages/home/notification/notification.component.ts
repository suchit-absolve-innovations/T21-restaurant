import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/service/content.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationList: any;
  value: any;
  selectControl: any;
  form: any;
  notificationId: any;
  public searchText: any = '';
  search: any;
  itemToDelete: any;
  constructor(private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,) { }

  
  ngOnInit(): void {
    this.notification();
  }

  
  notification() {
    this.form = this.formBuilder.group({
      data: ['', [Validators.required]],
    });
  }

  performSearch() {
    // Your existing search logic...
    // Clear query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge'
    });
  }


  // getBroadList() {
  //   let payload = {
  //     pageNumber: 1,
  //     pageSize: 1000
  //   }
  //   this.spinner.show()
  //   this.content.getBroadNotification(payload).subscribe(response => {
  //     if (response.isSuccess) {
  //       this.notificationList = response.data.dataList;
  //       this.toasterService.success(response.messages);
  //       this.spinner.hide();
  //     } else {
  //       this.spinner.hide();
  //       this.toasterService.error(response.messages);
  //     }
  //   });
  // }

  backClickedreload() {
    this.router.navigateByUrl('/super-notification-list')
      .then(() => {
        window.location.reload();
      });
  }

  // delete notification 
  // delet(data: any) {
  //   this.itemToDelete = data;
  //   $('#list-cross-mess').modal('show');
  // }

  // deleteNotification() {
  //   this.spinner.show();
  //   if (this.itemToDelete) {
  //     const itemId = this.itemToDelete.notificationId;
  //   this.content.deleteNotification(itemId).subscribe(response => {
  //     if (response.isSuccess) {
  //       this.spinner.hide();
  //       // Remove the deleted item from the local list
  //       this.notificationList = this.notificationList.filter((item: { notificationId: any; }) => item.notificationId !== itemId);
  //       // Close the modal
  //       $('#list-cross-mess').modal('hide');
  //       this.toasterService.success(response.messages);
  //     } else {
  //       this.spinner.hide();
  //       this.toasterService.error(response.messages);
  //     }   
  //   });
  // }
  // }


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

