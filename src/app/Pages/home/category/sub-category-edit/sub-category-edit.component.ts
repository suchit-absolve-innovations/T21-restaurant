import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/service/category.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sub-category-edit',
  templateUrl: './sub-category-edit.component.html',
  styleUrls: ['./sub-category-edit.component.css']
})
export class SubCategoryEditComponent implements OnInit {
  Id: any;
  form!: FormGroup;
  detail: any;
  editImages: any;
  submitted: boolean = false;
  imageFile!: { link: any; file: any; name: any; type: any; };
  id: any;
  rootUrl!: string;
  Id2: any;
  subId: any;
  urls: string[] = [];
  restaurantId: any;
  mainCategoryId: any;
  constructor(
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private _location: Location,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.Id = this.route.snapshot.paramMap.get('id');
    this.Id2 = this.route.snapshot.paramMap.get('id2');
    this.categoryForm();
    this.restaurantId = localStorage.getItem('restaurantId');
    this.mainCategoryId = this.route.snapshot.params;
    this.getCategoryDetail();
  }

  backClicked() {
    this._location.back();
  }

  /** Add Category Form **/
  categoryForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }


  
  /*** for validation ***/
  get f() {
    return this.form.controls;
  }


  ok() {
    this.router.navigate(['/category-list'])
      .then(() => {
        window.location.reload();
      });

  }


  /*** Image Upload ***/
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
 debugger
      let payload = {
        mainCategoryId : this.mainCategoryId.id,
        subCategoryId : this.mainCategoryId.id2,
        restaurantId : parseInt(this.restaurantId),
        name: this.form.value.name,
        description: this.form.value.description,
      }
      this.categoryService.editCategory(payload).subscribe(response => {
       
        this.afterResponses(response);
      });
    }
  
    afterResponses(response: any) {
      debugger
        if (response.isSuccess == true) {
debugger
            this.router.navigate(['/main-category/sub-category/' + this.mainCategoryId.id])
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
 let payload = {
 mainCategoryId :this.mainCategoryId.id,
 subCategoryId : this.mainCategoryId.id2
 }
      this.categoryService.subcategoryDetail(payload).subscribe(response => {
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
