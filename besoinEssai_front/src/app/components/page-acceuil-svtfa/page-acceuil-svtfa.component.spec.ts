import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAcceuilSvtfaComponent } from './page-acceuil-svtfa.component';

describe('PageAcceuilSvtfaComponent', () => {
  let component: PageAcceuilSvtfaComponent;
  let fixture: ComponentFixture<PageAcceuilSvtfaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAcceuilSvtfaComponent]
    });
    fixture = TestBed.createComponent(PageAcceuilSvtfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
