import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSrsbdComponent } from './application-srsbd.component';

describe('ApplicationSrsbdComponent', () => {
  let component: ApplicationSrsbdComponent;
  let fixture: ComponentFixture<ApplicationSrsbdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationSrsbdComponent]
    });
    fixture = TestBed.createComponent(ApplicationSrsbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
