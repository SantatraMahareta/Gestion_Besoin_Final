import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BesoinSrsgbdComponent } from './besoin-srsgbd.component';

describe('BesoinSrsgbdComponent', () => {
  let component: BesoinSrsgbdComponent;
  let fixture: ComponentFixture<BesoinSrsgbdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BesoinSrsgbdComponent]
    });
    fixture = TestBed.createComponent(BesoinSrsgbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
