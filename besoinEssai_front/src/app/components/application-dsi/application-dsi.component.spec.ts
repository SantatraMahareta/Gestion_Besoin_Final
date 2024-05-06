import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDsiComponent } from './application-dsi.component';

describe('ApplicationDsiComponent', () => {
  let component: ApplicationDsiComponent;
  let fixture: ComponentFixture<ApplicationDsiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationDsiComponent]
    });
    fixture = TestBed.createComponent(ApplicationDsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
