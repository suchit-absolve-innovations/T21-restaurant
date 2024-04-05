import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layouts/layout/layout.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { MainCategoryListComponent } from './category/main-category-list/main-category-list.component';
import { SubCategoryListComponent } from './category/sub-category-list/sub-category-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { OrderListComponent } from './order-list/order-list/order-list.component';
import { RestaurantListComponent } from './restaurant/restaurant-list/restaurant-list.component';
import { RestaurantDetailsComponent } from './restaurant/restaurant-details/restaurant-details.component';
import { AdminProfileComponent } from './profile/admin-profile/admin-profile.component';
import { NotificationComponent } from './notification/notification.component';
import { OrderDetailsComponent } from './order-list/order-details/order-details.component';
import { MainCategoryAddComponent } from './category/main-category-add/main-category-add.component';
import { MainCategoryEditComponent } from './category/main-category-edit/main-category-edit.component';
import { SubCategoryAddComponent } from './category/sub-category-add/sub-category-add.component';
import { SubCategoryEditComponent } from './category/sub-category-edit/sub-category-edit.component';
import { RestaurantProfileComponent } from './profile/restaurant-profile/restaurant-profile.component';
import { BannersListComponent } from './banner/banners-list/banners-list.component';
import { BannersAddComponent } from './banner/banners-add/banners-add.component';
import { BannersDetailComponent } from './banner/banners-detail/banners-detail.component';
import { BannerEditComponent } from './banner/banner-edit/banner-edit.component';
import { AddRestaurantComponent } from './restaurant/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './restaurant/edit-restaurant/edit-restaurant.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      ///Admin ////
      { path: '', component: DashboardComponent },
      { path: 'restaurant-list', component: RestaurantListComponent },
      { path: 'restaurant-list/restaurant-details/:id', component: RestaurantDetailsComponent },
      { path: 'restaurant-list/add-restaurant', component: AddRestaurantComponent },
      { path: 'restaurant-list/edit-restaurant/:id', component: EditRestaurantComponent },
      { path: 'restaurant-list/restaurant-details/product-list', component: ProductListComponent},
      { path: 'restaurant-list/restaurant-details/product-list/product-detail', component: ProductDetailComponent},
      { path: 'admin-profile', component: AdminProfileComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'privacy-policy', component : PrivacyPolicyComponent},
      { path: 'terms-condition', component : TermsConditionComponent},
    
      ///Restaurant///
      { path: 'order-list', component: OrderListComponent},
      { path: 'order-list/order-details', component: OrderDetailsComponent},   
      { path: 'product-list', component: ProductListComponent},
      { path: 'product-list/add', component: AddProductComponent},
      { path: 'product-list/detail', component: ProductDetailComponent},
      { path: 'product-list/edit', component: EditProductComponent},
      { path: 'main-category', component: MainCategoryListComponent},
      { path: 'main-category/main-category-add', component: MainCategoryAddComponent},
      { path: 'main-category/main-category-edit/:id', component: MainCategoryEditComponent},
      { path: 'main-category/sub-category/:id', component: SubCategoryListComponent},
      { path: 'main-category/sub-category/sub-category-add/:id', component: SubCategoryAddComponent},
      { path: 'main-category/sub-category/sub-category-edit/:id/:id2', component: SubCategoryEditComponent},
      { path: 'banner-list', component: BannersListComponent},
      { path: 'banner-list/banner-add', component: BannersAddComponent},
      { path: 'banner-list/banner-details', component: BannersDetailComponent},
      { path: 'banner-list/banner-edit', component: BannerEditComponent},
      { path: 'notification', component: NotificationComponent },
      { path: 'Restaurant-profile', component: RestaurantProfileComponent},

    ]   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }