import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/shared/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-category-add',
  templateUrl: './main-category-add.component.html',
  styleUrls: ['./main-category-add.component.css']
})
export class MainCategoryAddComponent implements OnInit {
  form!: FormGroup;
  detail: any;
  rootUrl: any;
  editImages: any;
  submitted: boolean = false;
  imageFile!: { link: any; file: any; name: any; type: any; };
  id: any;
  mainId: any;
  userRole = localStorage.getItem('user');
  urls: string[] = [];
  restaurantId!: any;
  mainCategoryId: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.restaurantId = localStorage.getItem('restaurantId');
    this.categoryForm();
  }
  backClicked() {
    this._location.back();
  }
  get f() {
    return this.form.controls;
  }
  categoryForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }




  postCategory() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let payload = {
      mainCategoryId: 0,
      restaurantId: parseInt(this.restaurantId),
      name: this.form.value.name,
      description: this.form.value.description,
    }
    this.categoryService.addCategory(payload).subscribe(response => {
      // this.mainId = response.data?.mainProductCategoryId;
      this.mainCategoryId = response.data?.mainCategoryId;
      console.log(this.mainCategoryId)
      this.fileChangeEvent();
      this.afterResponses(response);
    });
  }

  afterResponses(response: any) {
    debugger
    if (response.isSuccess == true) {
      debugger
      // this.router.navigate(['/main-category'])
      //   .then(() => {
      //     window.location.reload();
      //   });
      this.toasterService.success(response.messages);
    }
    else {
      this.toasterService.error(response.messages);
    }

  }
  onselect(event: any) {
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
      // this.name = this.imageFile.link
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fileChangeEvent() {
    debugger
    const formData = new FormData();
    formData.append("image", this.imageFile?.file); 
    formData.append("restaurantId", this.restaurantId);
    formData.append("mainCategoryId", this.mainCategoryId);
    this.categoryService.categoryImage(formData).subscribe(response => {
      // Handle response as needed
    });
  }

}

