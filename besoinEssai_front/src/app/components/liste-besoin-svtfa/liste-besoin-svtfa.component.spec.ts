import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBesoinSvtfaComponent } from './liste-besoin-svtfa.component';

describe('ListeBesoinSvtfaComponent', () => {
  let component: ListeBesoinSvtfaComponent;
  let fixture: ComponentFixture<ListeBesoinSvtfaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeBesoinSvtfaComponent]
    });
    fixture = TestBed.createComponent(ListeBesoinSvtfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
