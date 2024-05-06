import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAcceuilSrsbdComponent } from './page-acceuil-srsbd.component';

describe('PageAcceuilSrsbdComponent', () => {
  let component: PageAcceuilSrsbdComponent;
  let fixture: ComponentFixture<PageAcceuilSrsbdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAcceuilSrsbdComponent]
    });
    fixture = TestBed.createComponent(PageAcceuilSrsbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
