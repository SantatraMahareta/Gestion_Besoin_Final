import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSvtfaComponent } from './application-svtfa.component';

describe('ApplicationSvtfaComponent', () => {
  let component: ApplicationSvtfaComponent;
  let fixture: ComponentFixture<ApplicationSvtfaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationSvtfaComponent]
    });
    fixture = TestBed.createComponent(ApplicationSvtfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
