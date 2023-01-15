import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllcouponsComponent } from './get-allcoupons.component';

describe('GetAllcouponsComponent', () => {
  let component: GetAllcouponsComponent;
  let fixture: ComponentFixture<GetAllcouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAllcouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllcouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
