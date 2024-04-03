import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/service/content.service';
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
  constructor(
    private spinner: NgxSpinnerService,
    private content: ContentService,
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

  }

  backClicked() {
    this._location.back();
  }

  /** Add Category Form **/
  categoryForm() {
    this.form = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      categoryDescription: [''],
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
  
}
