import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BesoinSvtfaComponent } from './besoin-svtfa.component';

describe('BesoinSvtfaComponent', () => {
  let component: BesoinSvtfaComponent;
  let fixture: ComponentFixture<BesoinSvtfaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BesoinSvtfaComponent]
    });
    fixture = TestBed.createComponent(BesoinSvtfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
