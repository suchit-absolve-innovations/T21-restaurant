import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersAddComponent } from './banners-add.component';

describe('BannersAddComponent', () => {
  let component: BannersAddComponent;
  let fixture: ComponentFixture<BannersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannersAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
