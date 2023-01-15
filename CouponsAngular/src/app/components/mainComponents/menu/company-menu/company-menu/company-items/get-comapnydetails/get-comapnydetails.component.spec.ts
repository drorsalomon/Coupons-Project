import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetComapnydetailsComponent } from './get-comapnydetails.component';

describe('GetComapnydetailsComponent', () => {
  let component: GetComapnydetailsComponent;
  let fixture: ComponentFixture<GetComapnydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetComapnydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetComapnydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
