import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BesoinDsiComponent } from './besoin-dsi.component';

describe('BesoinDsiComponent', () => {
  let component: BesoinDsiComponent;
  let fixture: ComponentFixture<BesoinDsiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BesoinDsiComponent]
    });
    fixture = TestBed.createComponent(BesoinDsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
