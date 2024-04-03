import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MainCategoryListComponent } from './category/main-category-list/main-category-list.component';
import { SubCategoryListComponent } from './category/sub-category-list/sub-category-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { OrderListComponent } from './order-list/order-list/order-list.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { RestaurantListComponent } from './restaurant/restaurant-list/restaurant-list.component';
import { RestaurantDetailsComponent } from './restaurant/restaurant-details/restaurant-details.component';
import { AdminProfileComponent } from './profile/admin-profile/admin-profile.component';
import { NotificationComponent } from './notification/notification.component';
import { OrderDetailsComponent } from './order-list/order-details/order-details.component';
import { BannersListComponent } from './banner/banners-list/banners-list.component';
import { BannersAddComponent } from './banner/banners-add/banners-add.component';
import { BannersDetailComponent } from './banner/banners-detail/banners-detail.component';
import { BannerEditComponent } from './banner/banner-edit/banner-edit.component';
import { MainCategoryAddComponent } from './category/main-category-add/main-category-add.component';
import { MainCategoryEditComponent } from './category/main-category-edit/main-category-edit.component';
import { SubCategoryAddComponent } from './category/sub-category-add/sub-category-add.component';
import { SubCategoryEditComponent } from './category/sub-category-edit/sub-category-edit.component';
import { RestaurantProfileComponent } from './profile/restaurant-profile/restaurant-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    DashboardComponent,
    TermsConditionComponent,
    PrivacyPolicyComponent,
    MainCategoryListComponent,
    SubCategoryListComponent,
    ProductListComponent,
    ProductDetailComponent,
    AddProductComponent,
    EditProductComponent,
    OrderListComponent,
    RestaurantListComponent,
    RestaurantDetailsComponent,
    AdminProfileComponent,
    NotificationComponent,
    OrderDetailsComponent,
    BannersListComponent,
    BannersAddComponent,
    BannersDetailComponent,
    BannerEditComponent,
    MainCategoryAddComponent,
    MainCategoryEditComponent,
    SubCategoryAddComponent,
    SubCategoryEditComponent,
    RestaurantProfileComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    AngularEditorModule,
    CanvasJSAngularChartsModule,
    NgxPaginationModule,
  ]
})
export class HomeModule { }
