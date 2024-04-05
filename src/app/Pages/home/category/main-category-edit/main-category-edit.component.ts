import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/shared/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-category-edit',
  templateUrl: './main-category-edit.component.html',
  styleUrls: ['./main-category-edit.component.css']
})
export class MainCategoryEditComponent implements OnInit {

  form!: FormGroup;
  detail: any;
  rootUrl: any;
  editImages: any;
  submitted: boolean = false;
  imageFile!: { link: any; file: any; name: any; type: any; };
  id: any;
  mainId: any;
  userRole= localStorage.getItem('user');
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
    this.mainCategoryId = this.route.snapshot.params;
    this.categoryForm();
    this.getCategoryDetail();

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

  onselect(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        this.urls.push(imageDataUrl);
      };
    }
  }
  
  postCategory() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
 
      let payload = {
        mainCategoryId : this.mainCategoryId.id,
        restaurantId : parseInt(this.restaurantId),
        name: this.form.value.name,
        description: this.form.value.description,
      }
      this.categoryService.editCategory(payload).subscribe(response => {
        this.mainId = response.data?.mainProductCategoryId;
        this.afterResponses(response);
      });
    }
  
    afterResponses(response: any) {
      debugger
        if (response.isSuccess == true) {
debugger
            this.router.navigate(['/main-category'])
            .then(() => {
             window.location.reload();
           });
            this.toasterService.success(response.messages);
        }
       else {
          this.toasterService.error(response.messages);
        }
      
    }


    getCategoryDetail() {
      debugger
      this.categoryService.maincategoryDetail(this.mainCategoryId.id).subscribe(response => {
        if (response.isSuccess) {
          this.detail = response.data;
          this.id = this.detail.mainProductCategoryId
          this.editImages = this.rootUrl + this.detail?.categoryImage;
          this.form.patchValue({
            name: this.detail.name,
            description: this.detail.description,
          });
        }
      });
    }


}
