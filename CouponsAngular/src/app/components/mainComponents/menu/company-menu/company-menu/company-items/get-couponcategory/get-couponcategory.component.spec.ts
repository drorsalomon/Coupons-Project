import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCouponcategoryComponent } from './get-couponcategory.component';

describe('GetCouponcategoryComponent', () => {
  let component: GetCouponcategoryComponent;
  let fixture: ComponentFixture<GetCouponcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCouponcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCouponcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
