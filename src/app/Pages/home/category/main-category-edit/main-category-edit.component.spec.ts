import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCategoryEditComponent } from './main-category-edit.component';

describe('MainCategoryEditComponent', () => {
  let component: MainCategoryEditComponent;
  let fixture: ComponentFixture<MainCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCategoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
