import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListeBesoinComponent } from './application-liste-besoin.component';

describe('ApplicationListeBesoinComponent', () => {
  let component: ApplicationListeBesoinComponent;
  let fixture: ComponentFixture<ApplicationListeBesoinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationListeBesoinComponent]
    });
    fixture = TestBed.createComponent(ApplicationListeBesoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
