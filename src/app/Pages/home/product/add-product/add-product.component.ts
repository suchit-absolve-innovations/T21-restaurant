import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form!: FormGroup;
  imageFile!: { link: any; file: any; name: any; type: any };
  urls: string[] = [];
  submitted: boolean = false;
  basePrice!: number ;
  discount: number = 0;
  sellingPrice!: number ;
  constructor(
    private _location: Location,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,        
    private productService: ProductService,        
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.productForm();
  }

  productForm(){
    this.form = this.formBuilder.group({
    name:  ['', [Validators.required]],
    discription:  ['', [Validators.required]],
    basePrice: ['', [Validators.required]],
    discount: ['', [Validators.required]],
    sellingPrice: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form['controls'];
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
  
  backClicked() {
    this._location.back();
  }

  calculateSellingPrice() {
    const discountAmount = (this.basePrice * this.discount) / 100;
    this.sellingPrice = this.basePrice - discountAmount;
  }
  


  submit(){

    this.submitted = true;
    if (this.form.invalid) {
       this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
      return;
    }
  }

}

