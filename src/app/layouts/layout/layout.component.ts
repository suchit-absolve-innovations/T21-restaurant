import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleRoutes } from 'src/app/shared/route';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  show: boolean = false;
  routes: Array<any> = [];
  permissions: Array<any> = [];
  user: any;
  classActives: any;
  userRole!: any;
  login = localStorage.getItem('user');
  planType: any;
  // showSubRoutes: boolean = false;
  showSubRoutes: boolean;
  dairyStatus!: any;
  constructor(
    private spinner: NgxSpinnerService,
  ) { 
    this.showSubRoutes = false;
  }

  ngOnInit(): void {
    this.getSubAdminPermissions();
    this.setRouts();
    const toggleState = localStorage.getItem('toggleState');
    if (toggleState) {
      this.showSubRoutes = JSON.parse(toggleState);
    }
    this.userRole = localStorage.getItem('role');
    this.routes = this.routes.map(item => {
      item['isSelected'] = false;
      return item
    });
  }

   /******** Toggle side nav *********/
   sideNavDisplay(event:any) {
    this.show = event;
  }


  toggleSubRoutes() {
    this.showSubRoutes = !this.showSubRoutes;
    // Store the toggle state in the persistent storage
    localStorage.setItem('toggleState', JSON.stringify(this.showSubRoutes));
  }

  setRouts() {
    this.userRole = localStorage.getItem('role');
    if (this.userRole == 'SuperAdmin') {
      this.userRole = 'superAdmin'
    }
    if (this.userRole == 'Admin') {
      this.userRole = 'admin'
    } if (this.userRole == 'Vendor') {
      this.userRole = 'vendor'
    }
    if (this.userRole == 'Distributor') {
      this.userRole = 'distributor'
    }

    switch (this.userRole) {
      case 'superAdmin':
        this.routes = RoleRoutes['SuperAdmin'];
        break;
      case 'admin':
        this.routes = RoleRoutes['Admin'];
        break;
      case 'vendor':
        this.routes = RoleRoutes['Vendor'];
        break;
      case 'distributor':
        this.routes = RoleRoutes['Distributor'];
        break;
    }
  }

  private getSubAdminPermissions() {
    this.userRole = localStorage.getItem('role');
  }

  private getPermissionStatus(section: any) {

    if (section.sub && section.sub.length) {
      let model = this.permissions.find(item => item.model.resource == section.value);

      // return model && model.permissions.find((element: any) => element.action == 'BROWSE') ? true : false
      return model ? true : false;
    } else {
      let model = this.permissions.find(item => item.model.resource == section.value);
      // return model && model.permissions.find((element: any) => element.action == 'BROWSE') ? true : false
      return model ? true : false;
    }
  }


  public openSection(selectedRoute: any) {
    this.routes = this.routes.map(item => {
      item.name == selectedRoute.name ? item['isSelected'] = !item['isSelected'] : item['isSelected'] = false
      return item;
    });
  }

  classActive(data: any) {
    this.classActives = data;
  }


}
