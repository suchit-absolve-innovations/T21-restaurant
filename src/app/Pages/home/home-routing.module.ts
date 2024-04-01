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
      { path: '', component: DashboardComponent },
      { path: 'privacy-policy', component : PrivacyPolicyComponent},
      { path: 'terms-condition', component : TermsConditionComponent},
      { path: 'main-category', component: MainCategoryListComponent},
      { path: 'main-category/sub-category', component: SubCategoryListComponent},
      { path: 'product-list', component: ProductListComponent},
      { path: 'product-list/detail', component: ProductDetailComponent},
      { path: 'product-list/add', component: AddProductComponent},
      { path: 'product-list/edit', component: EditProductComponent},
    ]   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }