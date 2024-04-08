import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/shared/service/product.service';
import { CategoryService } from 'src/app/shared/service/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  form!: FormGroup;
  imageFile!: { link: any; file: any; name: any; type: any };
  urls: string[] = [];
  submitted: boolean = false;
  basePrice!: number;
  discount: number = 0;
  sellingPrice!: number;
  restaurantId!: string | null;
  categoryList: any;
  subcategoryList: any;
  foodId: any;
  editImages: any;
  constructor(
    private _location: Location,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.restaurantId = localStorage.getItem('restaurantId');
    this.productForm();
    this.getMainCategory();
  }

  productForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      discription: ['', [Validators.required]],
      basePrice: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      sellingPrice: ['', [Validators.required]],
      mainCategoryId: ['', [Validators.required]],
      subCategoryId: ['', [Validators.required]],
      status: [true],
    });
  }

  get f() {
    return this.form['controls'];
  }

  backClicked() {
    this._location.back();
  }

  calculateSellingPrice() {
    const discountAmount = (this.basePrice * this.discount) / 100;
    this.sellingPrice = this.basePrice - discountAmount;
  }

  /** Main Category List */

  getMainCategory() {
    this.categoryService
      .getcategory(this.restaurantId)
      .subscribe((response) => {
        if (response.isSuccess == true) {
          this.categoryList = response.data;
        } else {
        }
      });
  }

  getsubCategory(data: any) {
    let paylaod = {
      restaurantId: this.restaurantId,
      mainCategoryId: data,
    };
    this.categoryService.getsubcategory(paylaod).subscribe((response) => {
      if (response.isSuccess == true) {
        this.subcategoryList = response.data;
      } else {
      }
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      debugger;
      this.toasterService.error(
        'Form Incomplete: Please fill in all the required fields correctly'
      );
      return;
    }
    const payload = {
      restaurantId: this.restaurantId,
      name: this.form.value.name,
      description: this.form.value.description,
      basePrice: this.form.value.basePrice,
      discount: this.form.value.discount,
      sellingPrice: this.form.value.sellingPrice,
      mainCategoryId: this.form.value.mainCategoryId,
      subCategoryId: this.form.value.subCategoryId,
      status: this.form.value.status,
    };

    this.productService.addMenu(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.foodId = response.data.foodId;
        this.fileChangeEvent();
        this.toasterService.success(response.messages);
        this.router.navigateByUrl('/product-list');
      } else {
        this.toasterService.error(response.messages);
      }
    });
  }

  onselect(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name,
          type: event.srcElement.files[0].type,
        };
      };
      // this.name = this.imageFile.link
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fileChangeEvent() {
    let formData = new FormData();
    formData.append('image', this.imageFile?.file);
    formData.append('foodId', this.foodId);
    this.productService.uploadImage(formData).subscribe((response) => {});
  }
}
