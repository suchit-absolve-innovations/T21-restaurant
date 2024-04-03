import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersDetailComponent } from './banners-detail.component';

describe('BannersDetailComponent', () => {
  let component: BannersDetailComponent;
  let fixture: ComponentFixture<BannersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannersDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
