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
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    AngularEditorModule
  ]
})
export class HomeModule { }
