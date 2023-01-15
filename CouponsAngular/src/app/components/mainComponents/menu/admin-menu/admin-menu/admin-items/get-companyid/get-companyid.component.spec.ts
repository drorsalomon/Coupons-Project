import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCompanyidComponent } from './get-companyid.component';

describe('GetCompanyidComponent', () => {
  let component: GetCompanyidComponent;
  let fixture: ComponentFixture<GetCompanyidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCompanyidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCompanyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
