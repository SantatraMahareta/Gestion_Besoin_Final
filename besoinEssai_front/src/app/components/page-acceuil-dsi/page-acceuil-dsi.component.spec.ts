import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAcceuilDsiComponent } from './page-acceuil-dsi.component';

describe('PageAcceuilDsiComponent', () => {
  let component: PageAcceuilDsiComponent;
  let fixture: ComponentFixture<PageAcceuilDsiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAcceuilDsiComponent]
    });
    fixture = TestBed.createComponent(PageAcceuilDsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
