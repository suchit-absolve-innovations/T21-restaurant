import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/service/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-sub-category-add',
  templateUrl: './sub-category-add.component.html',
  styleUrls: ['./sub-category-add.component.css']
})
export class SubCategoryAddComponent implements OnInit {
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
  restaurantId: any;
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
    this.restaurantId = localStorage.getItem('restaurantId');
    this.mainCategoryId = this.route.snapshot.params;
    this.rootUrl = environment.rootPathUrl;
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
        restaurantId : parseInt(this.restaurantId),
        name: this.form.value.name,
        description: this.form.value.description,
      }
      this.categoryService.addCategory(payload).subscribe(response => {
        this.mainId = response.data?.mainProductCategoryId;
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

}


