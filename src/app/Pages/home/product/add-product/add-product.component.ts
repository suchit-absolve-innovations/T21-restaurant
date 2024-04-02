import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  imageFile!: { link: any; file: any; name: any; type: any };
  urls: string[] = [];
  constructor(
    private _location: Location,
  ) { }

  ngOnInit(): void {
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
}

