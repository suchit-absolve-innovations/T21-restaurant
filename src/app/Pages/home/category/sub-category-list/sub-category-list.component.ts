import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})
export class SubCategoryListComponent implements OnInit {

  constructor(    private _location: Location,
    ) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }
}
