import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationBesoinComponent } from './modification-besoin.component';

describe('ModificationBesoinComponent', () => {
  let component: ModificationBesoinComponent;
  let fixture: ComponentFixture<ModificationBesoinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationBesoinComponent]
    });
    fixture = TestBed.createComponent(ModificationBesoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
